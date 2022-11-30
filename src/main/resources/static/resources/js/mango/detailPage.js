"use strict";
import md from "../../../../templates/wishListModal.html";

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
        this.wishListEvent();
        this.favoriteStore();
        /*$("#Nav").append(this.head);*/


        console.log("detailpage");

        let name =$(".name").text();
        let search = {"name":name}


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
                let img1 = e.img1;


                let url = e.url;

                var marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(latitude, longitude),
                    map: map
                });
                var contentString = [
                    '<div class="iw_inner">',
                    '   <h3>'+name+'</h3>',
                    '   <p>'+mainmenu+'<br>',
                    '       <img src="'+img1+'" width="55" height="55" alt="나중에 해당 사진 넣어주세요" class="thumb" /><br>',
                    '       '+roadname+'<br>',
                    '       <a href="'+url+'" target="_blank">'+url+'/</a>',
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
        this.clearEvent();

    }

    clearEvent()
    {
        $(".navbar-brand").on("click",(e)=>{
            sessionStorage.clear();
            location.href="/";
        })
    }

    modalEvent(){
        $('#modal').on('click',(e)=>{
            console.log('위시리스트')
            $('.wish-list').empty();
            this.wishListShowEvent();
            this.modalShow();
        })
    }

    modalShow(){
        $(".btn.btn-primary.reset").on('click',(e)=>{
            axios.post("/clearpost", {}).then(()=> {

                $(".current").empty();
            });
        });

    }
    //위시리스트로 화면 전환
    wishListEvent(){
        $('.wishlist-place').on("click",(e)=>{
            $('.current-body').addClass("hidden");
            $('.wish-body').removeClass("hidden");
        })
        $('.current-place').on("click",(e)=>{
            $('.wish-body').addClass("hidden");
            $('.current-body').removeClass("hidden");
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
        $('.favoriteStore').on("click",()=>{
            let name = $('.name').text();
            let roadName = $('.roadName').text();
            let src = $(".card-img-top>.wishimg").attr("src");
            // console.log(name);
            // console.log(roadName);
            // console.log(src);
            let Object = {
                "placename" : name,
                "roadname" : roadName,
                "mainimg" : src
            }
            axios({
                method:"post",
                url:'/wishStore',
                params : Object
            }).then((result)=>{
                console.log(Object);
                console.log(result.data);
            })

        })
    }
    //위시리스트 띄워주는 이벤트
    wishListShowEvent(){
        axios.post("data/wishSelect", {}).then((result)=>{
            console.log(result);

            let data = result.data;
            _.forEach(data,(e)=>{
                let mainimg = e.mainimg;
                let placename = e.placename;
                let roadname = e.roadname;
                console.log(mainimg);
                console.log(placename);

                var html = [
                    '<form class="wishForm">',
                        '<li class="placename">'+placename+'</li>',
                        '<li>'+roadname+'</li>',
                        '<img style="width: 80px;height: 80px" src='+mainimg+'>',
                        '<button type="reset" class="btn btn-danger deleteWish">'+'삭제'+'</button>',
                    '</form>'
                ].join('');
                $('.wish-list').append(html);

            });
            this.wishListDeleteOne();
        })

    }
    //위시리스트중 삭제버튼 클릭시 해당게시물 삭제이벤트
    wishListDeleteOne(){
        $('.deleteWish').on("click",(e)=>{
                let placeName = $(e.currentTarget).prev().prev().prev().text();
                console.log(placeName);

                axios.post("data/wishDelete",{"placeName" : placeName}).then((result)=>{
                    $(e.currentTarget).parent($('.wishForm')).remove();
                   console.log(result);
                })
        })
    }



}




