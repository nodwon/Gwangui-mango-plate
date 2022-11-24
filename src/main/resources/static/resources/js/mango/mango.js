"use strict";

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


        this.head=require("@/mango/head.html")
        this.bottom= require("@/mango/bottom.html")
        this.foodList = require("@/mango/foodList.html");
        this.modalList = require("@/mango/modalList.html");



/*        axios.post("/data/head",{}).then((result)=>{
            $("#Nav").append(result.data);

        })*/
       /* $("#Nav").append(this.head);*/
        $("#bottom").append(this.bottom);

  /*      var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(latitude, longitude),
            map: map
        });*/
//123123//
 /*       axios.post("data/mango2All",{}).then((result)=>{
            $("#start").empty();
            $("#start").append(this.foodList(result));
/!*            $(".pop_region_content.region_content_kr").empty();
            $(".pop_region_content.region_content_kr").append(this.modalList(result));*!/
            this.eventBind();
        });*/


        this.eventBind();



    }


    modalShow(){



        this.eventModal()



    }




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
    eventBind(){

        console.log("gddgㅇㄴㅁㄹㅇ213123123ㄴ")
        $("#search").on("click",(e)=>{
            console.log("버튼이벤트")

            //눌러지면 검색 상세창으로 이동
            /*$(".example.py-5").removeAttr("onsubmit")*/
            /*location.href='/test1';*/
        })

        //상단 검색창


        //검색한 맛집 마커로 표시하기
        //git이름변경
      /*  $("input[name=search]").on("focusout",(e)=>{*/
        $("#search").on("click",(e)=>{
            let object = {"menu":$("input[name=search]").val()}
            if(!($("input[name=search]").val()===""))
            {//
                $(".py-5.map").removeClass("hidden");
                axios.post("data/mango2",object).then((result)=>{
                    let data = result.data;   //data = List<locationVO>
                    var mapOptions = {
                        center: new naver.maps.LatLng(data[0].latitude, data[0].longitude),
                        zoom: 17
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
                        console.log(latitude);
                        console.log(longitude);

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

                        console.log("DSFDSFD"+latitude);
                        console.log( longitude)
                    })
                });
            }
            let search = {"search":$("input[name=search]").val()}
            axios.post("data/searchAll",search).then((result)=>{

                console.log(result)
                $("#start").empty();
                $("#start").append(this.foodList(result));
                /*            $(".pop_region_content.region_content_kr").empty();
                            $(".pop_region_content.region_content_kr").append(this.modalList(result));*/

            });

        });

        $(".btn btn-outline-dark mt-auto").on("click",(e)=>{

        });

        $("#modal").on("click",(e)=>{
            $(".normal_pop_wrap").removeClass("hidden")
            this.modalShow();

        });
        //한식 ,중식, 일식 눌렀을때 이벤트
        $(".foodType").on("click",(e)=>{
            let search = {"search":$(e.currentTarget).find('.fw-bolder').text()};
            axios.post("data/searchAll",search).then((result)=>{

                console.log(result)
                $("#start").empty();
                $("#start").append(this.foodList(result));
                /*            $(".pop_region_content.region_content_kr").empty();
                            $(".pop_region_content.region_content_kr").append(this.modalList(result));*/

            });

        });



/*        $("#cardList").on("click",(e)=>{
            let name = $(e.currentTarget).find('.name').text();
            let roadName =  $(e.currentTarget).find('.roadName').text();
            let src =  $(e.currentTarget).find('.card-img-top').attr("src");
            let storeName =$(e.currentTarget).find('.name').text();
            let object = {
                "name": name,
                "roadName":roadName,
                "src":src
            }
            axios({
                method : "post",
                url : "/test2",
                params : object

            }).then((response)=>{
                /!*location.href ="test2";*!/

                $(".pop_region_content.region_content_kr").append(response.data);
               /!* location.href="/test1?name="+name+"&roadName="+roadName+"&src="+src;*!/
                /!*location.href="/detailPage";*!/
            })

            console.log("선택된 가게 이름 :" ,name);
            console.log("선택된 가게 도로명 : ",roadName);
            console.log("선택된 가게 사진 : ",src);
            /!*location.href="/test1?name="+name+"&roadName="+roadName+"&src="+src;*!/

        });*/

    }



}




