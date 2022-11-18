"use strict";

$(()=>{
    new mango();
})

export class mango{
    constructor() {

        this.foodList = require("@/mango/foodList.html");
        this.eventBind();



  /*      var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(latitude, longitude),
            map: map
        });*/
//123123
        axios.post("data/mango2All",{}).then((result)=>{
            $("#start").empty();
            $("#start").append(this.foodList(result));
        });





    }

    eventBind(){

        console.log("gddgㅇㄴㅁㄹㅇ213123123ㄴ")
        $("#search").on("click",(e)=>{
            console.log("버튼이벤트")
            alert("상세페이지로 이동하고싶으면 form 의 action과 form의 onsubmit를 지워주세요")
            //눌러지면 검색 상세창으로 이동
            /*$(".example.py-5").removeAttr("onsubmit")*/
////////
        })



        //검색한 맛집 마커로 표시하기
        $("input[name=search]").on("focusout",(e)=>{
            let object = {"menu":$("input[name=search]").val()}
            if(!($("input[name=search]").val()===""))
            {
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

        });


    }



}




