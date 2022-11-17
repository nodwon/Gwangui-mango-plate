"use strict";

$(()=>{
    new mango();
})

export class mango{
    constructor() {

        this.eventBind();
        var mapOptions = {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 10
        };
        var map = new naver.maps.Map('map', mapOptions);

//123123

        axios.post("data/mango",{}).then((result)=>{
            console.log(result)
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




        $("input[name=search]").on("focusout",(e)=>{
            console.log("1232ㄴㅇㄹㄴㅇㅁ123123ㄹ2")

        });



    }



}