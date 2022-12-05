"use strict";

import md from "../../../../templates/wishListModal.html";

$(()=>{
    new mango();
})

export class mango{
    constructor() {



        this.searchKeyword = "";
        this.foodList = require("@/mango/foodList.html");
        this.modalList = require("@/mango/modalList.html");
        this.pageList = require("@/mango/pagingNumber.html");


        this.eventBind();

        this.cashing.$pagination.addClass("hidden");

        if(sessionStorage.getItem("search")!=null)
        {
            this.cashing.$pagination.removeClass("hidden");
            console.log()
            let search = JSON.parse(sessionStorage.getItem("search"));
            this.foodPageList(search);


        }
        this.modalEvent();
        this.wishListEvent();
        this.clearEvent();

    }
    cashing ={
        $search :$("input[name=search]"),
        $start :  $("#start"),
        $pagination : $("#pagination")
    }
    clearEvent()
    {
        $(".navbar-brand").on("click",(e)=>{
            sessionStorage.clear();
            location.href="/";
        })
    }


    pageEvnet()
    {
        $(".page-item.x").on("click",(e)=>{
            $("#pagination").removeClass("hidden");
            let pageNum = $(e.currentTarget).text();
            if(sessionStorage.getItem("search")!=null)
            {
                let s = JSON.parse(sessionStorage.getItem("search"));
                this.searchKeyword = s["search"];

            }
            let search = {"search":this.searchKeyword, "pageNum":pageNum};

            sessionStorage.setItem("search",JSON.stringify(search))

            this.foodPageList(search);


        });
    }
    //지도 foodlist 와 page 처리하는 이벤트




    foodPageList(search) {
        $(".py-5.map").removeClass("hidden");
        axios.post("data/searchAll", search).then((result) => {
            console.log(search)

            //지도처리
            let data = result.data.food;   //data = List<locationVO>
            var mapOptions = {
                center: new naver.maps.LatLng(data[0].latitude, data[0].longitude),
                zoom: 11
            };

            var map = new naver.maps.Map('map', mapOptions);

            _.forEach(data, (e) => {
                let latitude = e.latitude;
                let longitude = e.longitude;
                let name = e.name;
                let foodtype = e.foodtype;
                let roadname = e.roadname;
                let mainmenu = e.mainmenu;
                let img1 = e.img1;
                let url = e.url;


                var marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(latitude, longitude),
                    map: map
                });
                var contentString =
                    `<div class="iw_inner">
                      <h3>${name}</h3>
                      <p>${mainmenu}<br>
                        <img src="${img1}" width="55" height="55" alt="나중에 해당 사진 넣어주세요" class="thumb" /><br>
                      ${roadname}<br>
                        <a href="${url}" target="_blank">${url}</a>
                     </p>
                    </div>`




                var infowindow = new naver.maps.InfoWindow({
                    content: contentString
                });

                naver.maps.Event.addListener(marker, "click", function (e) {
                    if (infowindow.getMap()) {
                        infowindow.close();
                    } else {
                        infowindow.open(map, marker);
                    }
                });


            });

            //페이징처리
            if (!(result.data.page == null)) {
                let pageMaker = result.data.page
                let startPage = pageMaker.startPage
                let endPage = pageMaker.endPage
                let prev = pageMaker.prev;
                let next = pageMaker.next;
                let paging = ''
                if (prev) {
                    paging = '<li class="page-item"><a class="page-link" href="javascript:void(0);">Previous</a></li>';
                }

                for (let i = startPage; i <= endPage; i++) {
                    let page = ' <li class="page-item x"><a class="page-link"  >' + i + '</a></li>';
                    paging = paging + page
                }
                if (next) {
                    paging = paging + '<li class="page-item"><a class="page-link" href="javascript:void(0);">Next</a></li>'
                }

                console.log(result)
                $(".pagination.justify-content-center").empty().append(paging)
                this.pageEvnet();
            }

            this.cashing.$start.empty();
            this.cashing.$start.append(this.foodList(result));
            this.favoriteStore();

        })/*.catch(()=>{
            $(".py-5.map").addClass("hidden");
            Swal.fire({
                icon: 'success',
                title: '해당 데이터가 없습니다.'
            });


        });
*/
    }
    //위시리스트 클릭 후 초기화
    modalEvent(){
        $('#modal').on('click',(e)=>{
            console.log('위시리스트')
            $('.wish-list').empty();
            this.wishListShowEvent();
            this.modalShow();
        })
    }
    //위시리스트 db에 저장하기
    favoriteStore(){
        $('.favoriteStore').on("click",(e)=>{
            let name = $(e.currentTarget).parents('.h-100').children().find($('.b')).text();
            let roadName = $(e.currentTarget).parents('.h-100').children().find($('.c')).text();
            let src = $(e.currentTarget).parents('.h-100').children().find($('.mainimg')).attr("src");
            console.log(name);
            console.log(roadName);
            console.log(src);
            let email = $('.email').text();
            console.log(email)
            if(email == null || email == ""){
                Swal.fire({
                    icon: 'success',
                    title: '로그인이 필요합니다'
                })
            }else{
                let Object = {
                    "placename" : name,
                    "roadname" : roadName,
                    "mainimg" : src
                }
                axios({
                    method:"post",
                    url:'/wishStore',
                    params : Object
                }).then((result)=>{
                    console.log(Object);
                    console.log(result.data);
                })
            }

        })
    }
    //위시리스트 띄워주는 이벤트
    wishListShowEvent(){
        axios.post("data/wishSelect", {}).then((result)=>{
            console.log(result);

            let data = result.data;
            _.forEach(data,(e)=>{
                let mainimg = e.mainimg;
                let placename = e.placename;
                let roadname = e.roadname;
                console.log(mainimg);
                console.log(placename);

                var html =
                    `<form class="wishForm" style="border: 1px solid saddlebrown; width: 400px; margin-left: 10px; margin-bottom: 14px" >
                    <button type="reset" class="btn btn-danger deleteWish" style="float: right; margin-top: 30px; margin-right: 10px">삭제</button>
                      <a href="/detailPage?roadname=${roadname}&name=${placename}&img1=${mainimg}">
                    <div class="wishForm_name" style="width: 200px; float: right; padding-top: 25px; color:#584647 ">
                    <b><span class="placename" style="font-size: larger">${placename}</span></b>
                    <br>
                    <span class="placeRoadName">${roadname}</span>
                    </div>
                    <img style="width: 100px;height: 100px" src="${mainimg}"></a>
                    </form>`

                $('.wish-list').append(html);

            });
            this.wishListDeleteOne();
        })

    }
    //위시리스트중 삭제버튼 클릭시 해당게시물 삭제이벤트
    wishListDeleteOne(){
        $('.deleteWish').on("click",(e)=>{
            let placeName = $(e.currentTarget).prev().prev().prev().text();
            console.log(placeName);

            axios.post("data/wishDelete",{"placeName" : placeName}).then((result)=>{
                $(e.currentTarget).parent($('.wishForm')).remove();
                console.log(result);
            })
        })
    }

    modalShow(){
        $(".btn.btn-primary.reset").on('click',(e)=>{
            axios.post("/clearpost", {}).then(()=> {

                $(".current").empty();
            });
        });
    }

    //위시리스트로 화면 전환
    wishListEvent(){
        $('.wishlist-place').on("click",(e)=>{
            $('.current-body').addClass("hidden");
            $('.wish-body').removeClass("hidden");
            $('.reset').hide();
        })
        $('.current-place').on("click",(e)=>{
            $('.wish-body').addClass("hidden");
            $('.current-body').removeClass("hidden");
            if($('.reset').hide()){
                $('.reset').show();
            }
        })
    }




    eventBind(){
        $("#search").on("click",(e)=>{
            $("#pagination").removeClass("hidden");
            this.searchKeyword = this.cashing.$search.val();
            if(!(this.searchKeyword ===""))
            {
                let search = {"search": this.searchKeyword, "pageNum" : 1}
                sessionStorage.setItem("search",JSON.stringify(search))

                this.foodPageList(search);
            }
        });


        //한식 ,중식, 일식 눌렀을때 이벤트
        $(".foodType").on("click",(e)=>{
            $(".py-5.map").removeClass("hidden");
            $("#pagination").removeClass("hidden");
            let search = {"search":$(e.currentTarget).find('.fw-bolder').text(),"pageNum":1};
            this.searchKeyword =$(e.currentTarget).find('.fw-bolder').text();

            sessionStorage.setItem("search",JSON.stringify(search))
            if(!($(e.currentTarget).find('.fw-bolder').text()===""))
            {
                this.foodPageList(search);
            }
        });

    }


}




