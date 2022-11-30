"use strict";
import {axios} from "../../vendors/axios.min";

$(()=>{
    new detailPage();

})

export class detailPage{

    constructor() {
        window.onload = function setTemplate() {
            document.getElementById('allComments').innerHTML = localStorage.getItem('template');
        };

        const commentContainer = document.getElementById('allComments');
        document.getElementById('addComments').addEventListener('click', function (ev) {
            //commentText를 DB에 넣은 다음에
            addComment(ev);
        });

        function addComment(ev) {
            let commentText, wrapDiv; // 입력창과 div감싸기
            const textBox = document.createElement('div'); //  입력 창 div 만들기
            const likeButton = document.createElement('button'); //버튼 만들기
            likeButton.innerHTML = 'Like';
            likeButton.className = 'likeComment';
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.className = 'deleteComment';
            if (hasClass(ev.target.parentElement, 'container')) {
                const wrapDiv = document.createElement('li');
                wrapDiv.className = 'wrapper';
                commentText = document.getElementById('comment').value;
                document.getElementById('comment').value = '';
                saveReview(commentText);
                if(saveReview(commentText)===true) {
                    textBox.innerHTML = commentText;
                    wrapDiv.append(textBox, likeButton, deleteButton);
                    commentContainer.appendChild(wrapDiv);
                }else{
                    return onn
                }
            } else {
                wrapDiv = ev.target.parentElement;
                commentText = ev.target.parentElement.firstElementChild.value;
                textBox.innerHTML = commentText;
                wrapDiv.innerHTML = '';
                wrapDiv.append(textBox, likeButton, deleteButton);
            }
            setOnLocalStorage();
        }
        // function saveReview(){
        //     process(this, async() =>{
        //         await axios.post('/saveReview',{
        //             id : this.reviewId;
        //             title : this.title;
        //             grade : this.grade;
        //             commentText : this.review;
        //
        //         });
        //         await ok(this, '')
        //     })
        //
        // }

        function setOnLocalStorage() {
            localStorage.setItem('template', document.getElementById('allComments').innerHTML);
        }

        function hasClass(elem, className) {
            return elem.className.split(' ').indexOf(className) > -1;
        }

        document.getElementById('allComments').addEventListener('click', function (e) {
            if (hasClass(e.target, 'addReply')) {
                addComment(e);
            } else if (hasClass(e.target, 'likeComment')) {
                const likeBtnValue = e.target.innerHTML;
                e.target.innerHTML = likeBtnValue !== 'Like' ? Number.parseInt(likeBtnValue) + 1 : 1;
                setOnLocalStorage();
            } else if (hasClass(e.target, 'cancelReply')) {
                e.target.parentElement.innerHTML = '';
                setOnLocalStorage();
            } else if (hasClass(e.target, 'deleteComment')) {
                e.target.parentElement.remove();
            }
        });


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




