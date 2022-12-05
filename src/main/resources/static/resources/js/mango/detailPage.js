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



        this.modalEvent();
        this.wishListEvent();
        this.favoriteStore();
        this.reviewEvent();
        /*$("#Nav").append(this.head);*/


        console.log("detailpage");

        let name = $(".name").text();
        let search = {"name": name}


        axios.post("data/map", search).then((result) => {
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

                naver.maps.Event.addListener(marker, "click", function (e) {
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

    clearEvent() {
        $(".navbar-brand").on("click", (e) => {
            sessionStorage.clear();
            location.href="/";
        })
    }

    modalEvent() {
        $('#modal').on('click', (e) => {
            console.log('위시리스트')
            $('.wish-list').empty();
            this.wishListShowEvent();
            this.modalShow();
            this.currentMove();
        })
    }

    //최근본 페이지 클릭시 중복적용되는 부분 방지
    currentMove(){
        $('.currentMove').on("click",(e)=>{
           /* axios.post("/data/duplicate", {}).then(()=> {

            });*/
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
            $('.reset').hide();
        })
        $('.current-place').on("click",(e)=>{
            $('.wish-body').addClass("hidden");
            $('.current-body').removeClass("hidden");
            if($('.reset').hide()){
                $('.reset').show();
            }
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
    }
    //위시리스트 db에 저장하기
    favoriteStore(){
        $('.favoriteStore').on("click",()=>{
            let name = $('.name').text();
            let roadName = $('.roadName').text();
            let src = $(".card-img-top>.wishimg").attr("src");
            // console.log(name);
            // console.log(roadName);
            // console.log(src);
            let email = $('.email').text();
            if(email == null || email == ""){
                Swal.fire({
                    icon: 'success',
                    title: '로그인이 필요합니다'
                })
            }else{
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
            }

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
                    '<form class="wishForm" style="border: 1px solid saddlebrown; width: 400px; margin-left: 10px; margin-bottom: 14px" >',

                    '<button type="reset" class="btn btn-danger deleteWish" style="float: right; margin-top: 30px; margin-right: 10px">'+'삭제'+'</button>',

                        '<div class="wishForm_name" style="width: 200px; float: right; padding-top: 25px; color:#584647 ">' +
                     '<b><a></a><span class="placename" style="font-size: larger">'+placename+'</span></b>',

                        '<br>',
                        '<span class="placeRoadName">'+roadname+'</span>' +
                        '</div>',


                        '<img style="width: 100px;height: 100px" src='+mainimg+'>',
                        // '<button type="reset" class="btn btn-danger deleteWish">'+'삭제'+'</button>',
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
                let placeName = $(e.currentTarget).parent($('.wishForm')).find($('.placename')).text()
                console.log(placeName);

                axios.post("data/wishDelete",{"placeName" : placeName}).then((result)=>{
                    $(e.currentTarget).parent($('.wishForm')).remove();
                   console.log(result);
                })
        })
    }
    reviewEvent() {
        const commentContainer = document.getElementById('allComments');
        document.getElementById('addComments').addEventListener('click', function (ev) {
            addComment(ev);
        });
        function addComment(ev) {
            let useremail = $("#user").text(); // 중복
            let title = $("#title").text(); // 중복
            let rating = document.querySelector('input[name ="rating"]:checked').val(); // 중복
            let commentText, wrapDiv; // 입력창과 div감싸기
            const textBox = document.createElement('div'); //  입력 창 div 만들기
            const likeButton = document.createElement('button'); //버튼 만들기
            const updateButton = document.createElement('button') // 수정 버튼
            const deleteButton = document.createElement('button'); // 삭제 버튼
            const ratingshow = document.createElement("a") // star 만들기
            const idli = document.createElement("a"); //id li 만들기
            const titleshow = document.createElement("a"); // title li 만들기
            const img = document.createElement("img"); // img 추가 버튼 만들기
            const updateDate = document.createElement('span');
            // updateDate.innerHTML = getTime();
            updateDate.className = "inserttime";
            updateButton.innerHTML = "수정";
            updateButton.className = "updateComment";
            likeButton.innerHTML = 'Like';
            likeButton.className = 'likeComment';
            deleteButton.innerHTML = 'Delete';
            deleteButton.className = 'deleteComment';
            idli.innerHTML = useremail;
            idli.className = "showId";
            ratingshow.innerHTML = rating;
            ratingshow.className = "showRating";
            titleshow.innerHTML = title;
            titleshow.className = "showTitle";
            img.innerHTML = "사진";
            img.className = "showImg";

            if (hasClass(ev.target.parentElement, 'container')) {
                const wrapDiv = document.createElement('li');
                wrapDiv.className = 'wrapper';
                commentText = document.getElementById('comment').value;
                //document.getElementById('comment').value = '';
                textBox.innerHTML = commentText;
                wrapDiv.append(textBox, idli, ratingshow, titleshow, updateButton, likeButton, deleteButton);
                commentContainer.appendChild(wrapDiv);
            } else {
                wrapDiv = ev.target.parentElement;
                commentText = ev.target.parentElement.firstElementChild.value;
                textBox.innerHTML = commentText;
                wrapDiv.innerHTML = '';
                wrapDiv.append(textBox, idli, ratingshow, titleshow, updateButton, likeButton, deleteButton);
            }

        }

        function setOnLocalStorage() { // 모든 댓글
            localStorage.setItem('template', document.getElementById('allComments').innerHTML);

        }

        function hasClass(elem, className) { //삭제
            return elem.className.split(' ').indexOf(className) > -1;
        }

        document.getElementById('allComments').addEventListener('click', function (e) {
            if (hasClass(e.target, 'showTitle') != title) { /// 제목이랑 같을때 만 보여주고 나머지는 hidden
                e.target.hidden;
            }
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
                let reviewcontents = $("#comment").val();
                let useremail = $("#user").text();
                let title = $("#title").text();
                let rating = document.querySelector('input[name ="rating"]:checked').value;
                let object = {
                    "email": useremail,
                    "placename": title,
                    "rating": rating
                }
                //
                axios.post({
                    method: "post",
                    url: "data/deleteReply",
                    params: object
                }).then((result) => {
                    console.log(object);
                    console.log(result.data);
                })

                e.target.parentElement.remove();
            }
        });

        function getTime() {
            let datetime = new Date();
            let year = datetime.getFullYear();
            let month = datetime.getMonth();
            let day = datetime.getDate();
            let hour = datetime.getHours();
            let minute = datetime.getMinutes();
            let scecond = datetime.getSeconds();
            // let fullupdatetime = document.write(year+"년"+(month+1)+"월"+day+"일"+hour+"시"+minute+"분"+scecond+"초");
            return year + "년" + (month + 1) + "월" + day + "일" + hour + "시" + minute + "분" + scecond + "초";

        }

        //리뷰 삭제 클릭시 이벤트
        // replyDeleteEvent()
        // {
        //     $('.deleteReply').on("click", (e) => {
        //         let useremail = $("#user").text();
        //         let title = $("#title").text();
        //         /*let rating = $('input[name ="rating"]:checked').val();*/
        //         let object = {
        //             "email": useremail,
        //             "title": title
        //         }
        //         console.log(object);
        //         if (useremail != null) {
        //             axios({
        //                 method: 'post',
        //                 url: 'data/deleteReply',
        //                 params: object
        //             })
        //             $(e.currentTarget).parent('.wrapper').remove();
        //         }
        //     })
        //
        // }

        //////////////////////////////////
        //작성하기 버튼 클릭시
        $("#addComments").on("click", () => {
            let reviewcontents = $("#comment").val();
            let useremail = $("#user").text();
            let title = $("#title").text();
            let rating = document.querySelector('input[name ="rating"]:checked').value;
            let reviewdate = $("#allComments > li:nth-child(28) > span").text();
            //let rating = $('input[name ="rating"]:checked').val();

            if (useremail === "") {
                alert("로그인 후 이용해주세요");
                return;
            } else if (reviewcontents == null) {
                alert("내용을 입력해주세요");
                return;
            } else if (rating == null) {
                alert("별점을 매겨주세요");
                return;
            }
            //const comment = {email: useremail, title: title, grade: rating, review: reviewcontents, updateDate: reviewdate};
            const comment = {
                "email": useremail,
                "title": title,
                "grade": rating,
                "review": reviewcontents
            };

            let start = "";
            for (var i = 1; i <= rating; i++) {
                start += '<i class="fa-solid fa-star"></i>'
            }


            // 리뷰 쓴 데이터 append 시키기
            // let html1 = [
            //     '<li class="wrapper">',
            //     '<p>' + reviewcontents + '</p>',
            //     '<p class="showId">' + useremail + '</p>',
            //     '<p class="showRating">' + rating + ' </p>',
            //     start,
            //     '<br>',
            //     '<button class="updateComment">수정</button>',
            //     '<button class="likeComment">like</button>',
            //     '<button class="deleteComment deleteReply">delete</button>',
            //
            //
            //     '  </li>'].join('');
            $('#allComments').append(setOnLocalStorage());

        //    this.replyDeleteEvent();
            //리뷰데이터를 저장
            axios({
                method: "post",
                url: '/saveReview',
                params: comment
            })

        });

        //리뷰 수정 버튼 눌렀을 시 수정 버튼은 숨기고 수정 완료버튼 보여주기
        let mf = false;
        $("#updateComment").on("click", function (e) {
            e.preventDefault();
            if (mf === true) {
                alert("이미 수정중인 리뷰가 있습니다");
                return;
            }
            mf = true;
            $("").attr("readonly", false);
            $(this).hide();
            $(this).next().show();
            $.ajax({
                type: "POST",
                url: "/saveReview",
                data: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (callback) {
                        callback(result);
                    }
                },
                error: function (err) {
                    alert("리뷰를 삭제하지 못했습니다. 다시 시도해 주세요.");
                }
            })
        })

//수정 완료 버튼
        $("#updateComment").on("click", function (e) {
            e.preventDefault();
            mf == false;
            let reviewcontents = $(".inlinereview").val();
            let reviewnum = $(this).attr('href');
            buyService.modify(
                {reviewcontents: reviewcontents, reviewnum: reviewnum},
                function (result) {
                    if (result === "success") {
                        alert("리뷰를 수정 하였습니다.");
                        $(".inlinereview").attr("readonly", true);
                        $(this).show();
                        $(this).prev().hide();
                        location.reload();
                    }
                }
            )
            $.ajax({
                type: "PUT",
                url: "",
                data: JSON.stringify(review),
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (callback) {
                        callback(result);
                    }
                },
                error: function (err) {
                    alert("리뷰 수정 실패. 다시 시도해주세요~");
                }
            })
        })


    }
}




