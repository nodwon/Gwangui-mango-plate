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
        this.head=require("@/mango/head.html")
        this.bottom= require("@/mango/bottom.html")
        this.foodList = require("@/mango/foodList.html");
        this.modalList = require("@/mango/modalList.html");
        this.pageList = require("@/mango/pagingNumber.html");



/*        axios.post("/data/head",{}).then((result)=>{
            $("#Nav").append(result.data);

        })*/
       /* $("#Nav").append(this.head);*/
        $("#bottom").append(this.bottom);

  /*      var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(latitude, longitude),
            map: map
        });*/

 /*       axios.post("data/mango2All",{}).then((result)=>{
            $("#start").empty();
            $("#start").append(this.foodList(result));
/!*            $(".pop_region_content.region_content_kr").empty();
            $(".pop_region_content.region_content_kr").append(this.modalList(result));*!/
            this.eventBind();
        });*/


        this.eventBind();
        $("#pagination").addClass("hidden");


        this.modalEvent();
        this.insertModal();
    }
    cashing ={
        $search :$("input[name=search]"),
        $start :  $("#start")
    }




    /*modalshow(){
        let md = require("../../../../templates/wishListModal.html")
        let call = {'key' : $('#wsModal').val()};

        axios.post('/data/wish', call).then((result)=>{
            console.log(result)

            $('.wishList').append(md(result));
            $('.wishList').removeClass('hidden');
        })
    }*/



    eventModal()
    {
        /*//모달 x
        $(".btn_cls").on("click",(e)=>{
            $(".normal_pop_wrap").addClass("hidden")
        });

        //모달 최근본 이미지 클릭시 이벤트
        $(".slct_food").on("click",(e)=>{
            if(!$(e.currentTarget).hasClass("active"))
            {
                $(e.currentTarget).addClass("active");
                $(".slct_want").removeClass("active");
                $(".pop_region_content.region_content_kr").removeClass("hidden");

            }
        });
        //모달 가고싶은곳
        $(".slct_want").on("click",(e)=>{
            if(!$(e.currentTarget).hasClass("active"))
            {
                $(e.currentTarget).addClass("active");
                $(".slct_food").removeClass("active");
                $(".pop_region_content.region_content_kr").addClass("hidden");
            }
        });
*/

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
    foodPageList(search){
        $(".py-5.map").removeClass("hidden");
        axios.post("data/searchAll",search).then((result)=>{
            //지도처리
            let data = result.data.food;   //data = List<locationVO>
            var mapOptions = {
                center: new naver.maps.LatLng(data[0].latitude, data[0].longitude),
                zoom: 11
            };

            var map = new naver.maps.Map('map', mapOptions);

            _.forEach(data,(e)=>{
                let latitude  = e.latitude;
                let longitude = e.longitude;
                let name = e.name;
                let foodtype = e.foodtype;
                let roadname = e.roadname;
                let mainmenu = e.mainmenu;
                let url = "url이 필요해요";


                var marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(latitude, longitude),
                    map: map
                });
                var contentString = [
                    '<div class="iw_inner">',
                    '   <h3>'+name+'</h3>',
                    '   <p>'+mainmenu+'<br>',
                    '       <img src="https://mp-seoul-image-production-s3.mangoplate.com/added_restaurants/179982_1490328588168726.jpg?fit=around|362:362&crop=362:362;*,*&output-format=jpg&output-quality=80" width="55" height="55" alt="나중에 해당 사진 넣어주세요" class="thumb" /><br>',
                    '       '+roadname+'<br>',
                    '       <a href="http://www.seoul.go.kr" target="_blank">'+url+'/</a>',
                    '   </p>',
                    '</div>'
                ].join('');

                var infowindow = new naver.maps.InfoWindow({
                    content: contentString
                });

                naver.maps.Event.addListener(marker, "click", function(e) {
                    if (infowindow.getMap()) {
                        infowindow.close();
                    } else {
                        infowindow.open(map, marker);
                    }
                });


            });

            //페이징처리
            if(!(result.data.page==null))
            {
                let pageMaker = result.data.page
                let startPage = pageMaker.startPage
                let endPage =pageMaker.endPage
                let prev = pageMaker.prev;
                let next = pageMaker.next;
                console.log("엔드페이지는 ",endPage)
                let paging =''
                if(prev){
                     paging = '<li class="page-item"><a class="page-link" href="javascript:void(0);">Previous</a></li>';
                }

                for ( var i = startPage;i<=endPage;i++)
                {
                    let page=' <li class="page-item x"><a class="page-link"  >'+i+'</a></li>';
                    paging= paging+page
                }
                if(next)
                {
                    paging = paging+ '<li class="page-item"><a class="page-link" href="javascript:void(0);">Next</a></li>'
                }

                console.log(result)
                $(".pagination.justify-content-center").empty().append(paging)
                this.pageEvnet();
            }
            this.cashing.$start.empty();
            this.cashing.$start.append(this.foodList(result));
            this.startModal();
        });
    }


    startModal() {
        $('.cardList').on('click', (e) => {
            let name = $(e.currentTarget).find('.name').text();
            let roadName = $(e.currentTarget).find('.roadName').text();
            let src = $(e.currentTarget).find('.card-img-top').attr('src');
            console.log(name);
            console.log(roadName);
            console.log(src);
            let object ={
                "name" :name,
                "roadName" : roadName,
                "src" : src
            }
            axios({
                method: "post",
                url: "/data/modal",
                params: object
            }).then((response) => {
                $(".wishList").append(response.data);
                console.log(response)
                location.href="/detailPage";
            })
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

    insertModal(){
        $('.cardList').on('click',(e)=>{
            let name = $(e.currentTarget).find('.name');
            console.log(name);
        })


        /*        $(document).ready(function(){
                    $('.card-img-top').on('show.bs.modal',function (e){
                        let name = $(e.currentTarget).find('.name');
                        let roadName = $(e.currentTarget).find('.roadName');
                        let src = $(e.currentTarget).find('.src');
                        let obj = {}
                        console.log(name);
                    });
                });*/
    }


}




