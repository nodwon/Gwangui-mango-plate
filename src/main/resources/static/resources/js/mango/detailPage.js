"use strict";
$(()=>{
    new detailPage();
})
export class detailPage{
    constructor() {
        this.head=require("@/mango/head.html")
        this.bottom= require("@/mango/bottom.html")
        $("#Nav").append(this.head);
        $("#bottom").append(this.bottom);

        console.log("s123123dsfsdfdfsddfgdfgsdsdfsdfsdfsaf");


        this.DetailEvent();
    }

    DetailEvent(){
        $("#modal").on("click",(e)=>{
            $(".normal_pop_wrap").removeClass("hidden")
            this.ModalEvent();
        });

    }
    ModalEvent() {
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

    }
}




