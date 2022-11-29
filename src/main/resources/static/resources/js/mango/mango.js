"use strict";

import md from "../../../../templates/wishListModal.html";

$(()=>{
    new mango();
})
//



export class mango{
    constructor() {
        /*       axios({
                   method : "post",
                   url : "/getHtml",

               }).then((response)=>{
                   /!*location.href ="test2";*!/

                   $("#Nav").append(response.data);


               })*/

        this.searchKeyword = "";
        this.foodList = require("@/mango/foodList.html");
        this.modalList = require("@/mango/modalList.html");
        this.pageList = require("@/mango/pagingNumber.html");


/*        axios.post("/data/head",{}).then((result)=>{
            $("#Nav").append(result.data);

        })*/



        this.eventBind();
        $("#pagination").addClass("hidden");


        this.modalEvent();
        this.wishListEvent();s

    }
    cashing ={
        $search :$("input[name=search]"),
        $start :  $("#start")
    }
    //위시 리스트 클릭시 모달창 팝업
    wishListEvent(){
        console.log();
    }

    modalshow(){
        let md = require("../../../../templates/wishListModal.html")
       /* let call = {'key' : $('#wsModal').val()};*/

        axios.post('/data/wish', {}).then((result)=>{
            console.log(result)

            $('.wishList').append(md(result));
            $('.wishList').removeClass('hidden');
        })
    }





    pageEvnet()
    {
        $(".page-item.x").on("click",(e)=>{
            $("#pagination").removeClass("hidden");
            let pageNum = $(e.currentTarget).text();
            let search = {"search":this.searchKeyword, "pageNum":pageNum};
           this.foodPageList(search);

        });
    }
    //지도 foodlist 와 page 처리하는 이벤트
    foodPageList(search) {
        $(".py-5.map").removeClass("hidden");
        axios.post("data/searchAll", search).then((result) => {
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
                var contentString = [
                    '<div class="iw_inner">',
                    '   <h3>' + name + '</h3>',
                    '   <p>' + mainmenu + '<br>',
                    '       <img src=' + img1 + ' width="55" height="55" alt="나중에 해당 사진 넣어주세요" class="thumb" /><br>',
                    '       ' + roadname + '<br>',
                    '       <a href="' + url + '" target="_blank">' + url + '/</a>',
                    '   </p>',
                    '</div>'
                ].join('');

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
                console.log("엔드페이지는 ", endPage)
                let paging = ''
                if (prev) {
                    paging = '<li class="page-item"><a class="page-link" href="javascript:void(0);">Previous</a></li>';
                }

                for (var i = startPage; i <= endPage; i++) {
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
        });
    }
    //위시 리스트 클릭시 모달창 팝업
    modalEvent(){
        $('#modal').on('click',()=>{
            console.log('위시리스트')
            // this.modalshow();
        })
        // const myModal = document.getElementById('myModal')
        // const myInput = document.getElementById('myInput')
        //
        // myModal.addEventListener('shown.bs.modal', () => {
        //     myInput.focus()
        // })
    }



    eventBind(){
        $("#search").on("click",(e)=>{
            $("#pagination").removeClass("hidden");
            this.searchKeyword = this.cashing.$search.val();
            if(!(this.searchKeyword ===""))
            {
                let search = {"search": this.searchKeyword, "pageNum" : 1}
                this.foodPageList(search);
            }
        });


        //한식 ,중식, 일식 눌렀을때 이벤트
        $(".foodType").on("click",(e)=>{
            $(".py-5.map").removeClass("hidden");
            $("#pagination").removeClass("hidden");
            let search = {"search":$(e.currentTarget).find('.fw-bolder').text(),"pageNum":1};
            this.searchKeyword =$(e.currentTarget).find('.fw-bolder').text();

            if(!($(e.currentTarget).find('.fw-bolder').text()===""))
            {
                this.foodPageList(search);
            }
        });

    }


}




