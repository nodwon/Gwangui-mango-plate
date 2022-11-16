"use strict";

$(()=>{
    new mango();
})

export class mango{
    constructor() {
        this.eventBind();
        //
    }

    eventBind(){

        console.log("gddgㅇㄴㅁㄹㅇ213123123ㄴ")
        $("#search").on("click",(e)=>{
            console.log("버튼이벤트")
            alert("상세페이지로 이동하고싶으면 form 의 action과 form의 onsubmit를 지워주세요")
            //눌러지면 검색 상세창으로 이동
            /*$(".example.py-5").removeAttr("onsubmit")*/

        })




        $("input[name=search]").on("focusout",(e)=>{
            console.log("1232ㄴㅇㄹㄴㅇㅁ123123ㄹ2")

        });



    }



}