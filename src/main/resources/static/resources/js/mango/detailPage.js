"use strict";
import {axios} from "../../vendors/axios.min";

$(()=>{
    new detailPage();

})

export class detailPage{
    constructor() {
        $(function () { // 리뷰 추가
            let userName = document.createElement("h3"); // 이름
            let input = document.getElementById('review').value; // 입력창
            let title = document.createElement("h6"); // 제목
            let status = document.createElement("p"); // 상태
            let reply = document.createElement("ul"); // 답글버튼
            let deleteButton = document.createElement("li"); // 삭제 버튼
            let like = document.createElement("li"); // 좋아요 버튼
            let replyList = document.createElement("li"); // 답글 리스트
            document.querySelector("#addComments").addEventListener("click",function(e) {
                console.log("asdfa");
                like.innerHTML = "Like";
                replyList.innerHTML = "댓글";
                title.innerHTML = "userName";

                let textnode = document.createTextNode(input);
                status.appendChild(textnode);
                status.prepend(title);
                status.prepend(reply);
                reply.appendChild(like);
                reply.appendChild(replyList);
                reply.appendChild(deleteButton);
                document.getElementById('addTask').appendChild(status);
                status.classList.add("statusBox");
                like.classList.add("like");
                replyList.classList.add("reply");
                let statusBox = document.createElement("div");
                //creates a button to delete status
                let removeTask = document.createElement('input');
                // adds type of which it is a button
                removeTask.setAttribute('type', 'button');
                removeTask.classList.add("removeButton");
                // sets the buttons value
                removeTask.setAttribute("value", "delete");
                // sets the button next to the status text
                deleteButton.appendChild(removeTask);
                //sets the button to remove status
                removeTask.addEventListener('click', function () {
                    status.parentNode.removeChild(status);
                }, false);
                like.addEventListener('click', function () {
                    this.classList.add("likeClicked");
                }, false);
                replyList.addEventListener('click', function () {
                    this.classList.add("likeClicked");
                    let luke = document.getElementById('addTask');
                    let skywalker = document.createElement("textarea");
                    let replied = document.createElement("p");
                    let leia = document.createElement("input");
                    leia.setAttribute('type', 'button');
                    leia.setAttribute("value", "reply");
                    leia.setAttribute("class", "removeButton");
                    skywalker.setAttribute("id", "pushReply");
                    skywalker.setAttribute("placeholder", "Reply to this comment");
                    luke.appendChild(skywalker);
                    luke.appendChild(leia);
                    luke.appendChild(replied);
                    leia.addEventListener('click', function () {
                        let replyInput = document.getElementById('pushReply').value;
                        let replyNode = document.createTextNode(replyInput);
                        replied.appendChild(replyNode);
                        if (replyInput === "") {
                            replied.classList.remove("statusBox");
                            skywalker.parentNode.removeChild(skywalker);
                            this.parentNode.removeChild(this);
                        } else {
                            let replyName = document.createElement("h6");
                            let deleteComment = document.createElement("p");
                            deleteComment.innerHTML = "Delete";
                            deleteComment.classList.add("deleteComment");
                            replyName.innerHTML = `${vo.emailName} says:`;
                            replied.prepend(replyName);
                            replied.prepend(deleteComment);
                            replied.classList.add("statusBox");
                            skywalker.parentNode.removeChild(skywalker);
                            this.parentNode.removeChild(this);
                            deleteComment.addEventListener('click', function () {
                                replied.parentNode.removeChild(replied);
                            }, false);
                        }
                    }, false);
                }, false);
            })
        });

        $(function () { // 리뷰 지우기
            document.querySelector("#removeComments").addEventListener("click",function(e){
                console.log("sdafdfas");
                document.getElementById("inputStatus").value = "";
            })
        });

        $(function () { // 답글
            $(document).one('click', '.reply', function (e) {

            });
        });
        $(function () { // 좋아요
            $(document).one('click', '.like-review', function (e) {
                $(this).children(`.fa-heart`).addClass('animate-like');
            });
        });
        document.querySelector("aside.card").innerHTML = "";

        this.modalEvent();
        this.favoriteStore();
        this.head=require("@/mango/head.html")
        this.bottom= require("@/mango/bottom.html")
        /*$("#Nav").append(this.head);*/
        $("#bottom").append(this.bottom);

        console.log("detailpage");

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

                console.log("위도"+latitude);
                console.log( longitude)
            })
        });


        this.DetailEvent();
    }

    modalEvent(){
        $('#modal').on('click',(e)=>{
            console.log('위시리스트')
            this.modalshow($(e.currentTarget).data());
        })
    }

    modalshow(key){
        let md = require("../../../../templates/wishListModal.html")
        let call = {'key' : $('#wsModal').val()};

        axios.post('/data/wish', call).then((result)=>{
            console.log(result)

            $('.wishList').append(md(result));
            $('.wishList').removeClass('hidden');
        })
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
        $(".btn_reset").click(function(){
            return document.getElementById("mTxtArea").value='';
        })
        $("#detailTitle").click(function(){
            return "/";

        })

    }


    favoriteStore(){
        $('.favoriteStore').on("click",(e)=>{
            let name = $('.name').text();
            let roadName = $('.roadName').text();
            let src = $(".card-img-top>img").attr("src");
            console.log(name);
            console.log(roadName);
            console.log(src);
            let Object = {
                "name" : name,
                "roadName" : roadName,
                "src" : src
            }

            axios({
                method:"post",
                url:'/wishStore',
                params : Object
            }).then((result)=>{
                console.log(result.data);
            })


            /*
            axios({
                method : "post",
                url : "wishst",
                params : object

            }).then((response)=>{
                location.href ="mango/wishListModal";

                $(".wish_middle_list").append(response.data);
                location.href="/mango/wishListModal?name="+name+"&roadName="+roadName+"&src="+src;
                location.href="redirect:/detailPage";
            })

            console.log("선택된 가게 이름 :" ,name);
            console.log("선택된 가게 도로명 : ",roadName);
            console.log("선택된 가게 사진 : ",src);
            location.href="wishListModal?name="+name+"&roadName="+roadName+"&src="+src;*/
        })
    }


}




