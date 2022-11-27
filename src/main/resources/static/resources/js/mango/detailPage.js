"use strict";
import {axios} from "../../vendors/axios.min";

$(()=>{
    new detailPage();
})
const commentContainer = document.getElementById('allComments')
document.getElementById('addComments').addEventListener('click',
    function (ev){
        addComment(ev);
    });

function addComment(ev) {
    let commentText;
    const textBox = document.createElement('div');
    const replyButton = document.createElement('button');
    replyButton.className = 'reply';
    replyButton.innerHTML = '답글';
    const deleteButton = document.createElement('button');
    deleteButton.className = 'Delete';
    deleteButton.innerHTML = '삭제';
    if(hasClass(ev.currentTarget.parentElement, 'container')) {
        const wrapDiv = document.createElement('div');
        wrapDiv.className = 'wrapper'
        wrapDiv.style.marginLeft = 0;
        commentText = document.getElementById('review').value;
        document.getElementById('review').value = ' ';
        wrapDiv.append(textBox, replyButton, deleteButton);
        commentContanier.append(wrapDiv);
    }else{

    }
}
function hasClass(elem, className){
    return elem.className.split(' ').indexOf(className) >-1;
}
document.getElementById('allComments').addEventListener('click', function (e){
    if (hasClass(e.currentTarget, 'reply')) {
        const parentDiv = e.currentTarget.parentElement;
        const wrapDiv = document.createElement('div');
        wrapDiv.style.marginLeft =
            (Number.parseInt(parentDiv.style.marginLeft) + 15).toString() + 'px';
        wrapDiv.className = 'wrapper';
        const textArea = document.createElement('textarea');
        textArea.style.marginRight = '20px';
        const addButton = document.createElement('textarea');
        addButton.className = 'addReply';
        addButton.innerHTML = '답글';
        const cancelButton = document.createElement('button');
        cancelButton.innerHTML = '취소'
        cancelButton.className = 'cancelReply';
        wrapDiv.append(textArea, addButton, cancelButton);
        parentDiv.appendChild(wrapDiv);
    }else if(hasClass(e.currentTarget, 'cancelReply')) {
        e.currentTarget.parentElement.innerHTML = ' ';
    }else if (hasClass(e.currentTarget, 'deleteComment')){
        e.currentTarget.parentElement.remove();
    }
});

export class detailPage{
    constructor() {



        this.head=require("@/mango/head.html")
        this.bottom= require("@/mango/bottom.html")
        $("#Nav").append(this.head);
        $("#bottom").append(this.bottom);

        console.log("s123123dsfsdfdfsddfgdfgsdsdfsdfsdfsaf");

        let search = {"name":$(".tg-f2a8").text()}
        axios.post("data/map",search).then((result)=>{
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


        this.DetailEvent();
    }

    DetailEvent(){
        $("#modal").on("click",(e)=>{
            $(".normal_pop_wrap").removeClass("hidden")
            this.ModalEvent();
        });

        //map를 표시
        $("#mapShow").append()

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
       $("#btn_review").on("click",(e)=>{
            if($(e.currentTarget)) {
                this.saveReview();
            }
        })
        $(".btn_reset").click(function(){
            return document.getElementById("mTxtArea").value='';
        })
        $("#detailTitle").click(function(){
            return "/";

        })

    }
}




