"use strict";

$(()=>{
    new detailPage();
})
export class detailPage{
    constructor() {


        this.reviewAppendList = require("@/mango/reviewAppend.html");
        this.wishListShow = require("@/mango/wishListShow.html");
        this.reviewShowAll = require("@/mango/reviewAll.html");
        this.showReview();

        this.modalEvent();
        this.wishListEvent();
        this.favoriteStore();
        this.reviewEvent();
        this.haveWishStarEvent();


        this.addMap();


        this.clearEvent();
        this.replyDeleteEvent();
        this.imageEvent();
        this.replyupdatelike();

    }

    showReview(){
        let title = $("#title").text();


        axios({
            url: "showReview",
            method : "post",
            params : { "title": title}

        }).then((data)=>{
            console.log(data.title);

            $("#allComments").empty().append(this.reviewShowAll(data))
            this.replyDeleteEvent();
            this.replyupdatelike();
        })
    }

    addMap() {

        let name = $(".name").text();
        let search = {"name": name}


        axios.post("data/map", search).then((result) => {
            let data = result.data;   //data = List<locationVO>

            var mapOptions = {
                center: new naver.maps.LatLng(data[0].latitude, data[0].longitude),
                zoom: 17
            };

            var map = new naver.maps.Map('map', mapOptions);

            _.forEach(data, (e) => {
                let latitude = e.latitude;
                let longitude = e.longitude;
                let name = e.name;
                let roadname = e.roadname;
                let mainmenu = e.mainmenu;
                let img1 = e.img1;
                let url = e.url;

                var marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(latitude, longitude),
                    map: map
                });
                var contentString =
                    `<div class="iw_inner">
                      <h3>${name}</h3>
                      <p>${mainmenu}<br>
                        <img src="${img1}" width="55" height="55" alt="나중에 해당 사진 넣어주세요" class="thumb" /><br>
                      ${roadname}<br>
                        <a href="${url}" target="_blank">${url}</a>
                     </p>
                    </div>`

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

            })
        });

    }



    clearEvent() {
        $(".navbar-brand").on("click", (e) => {
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
    //최근 본 페이지 초기화 처리
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




    //위시리스트 db에 저장하기
    favoriteStore(){
        $('.favoriteStore').on("click",()=>{
            let name = $('.name').text();
            let roadName = $('.roadName').text();
            let src = $(".card-img-top>.wishimg").attr("src");
            let email = $('.email').text();
            if(email == null || email == ""){
                Swal.fire({
                    icon: 'success',
                    title: '로그인이 필요합니다'
                })
            }else{
                if($('#alertStart').css("color") == 'rgb(0, 0, 0)') {
                    $('#alertStart').css("color", "yellow");
                    let Object = {
                        "placename": name,
                        "roadname": roadName,
                        "mainimg": src
                    }
                    axios({
                        method: "post",
                        url: '/wishStore',
                        params: Object
                    }).then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: '위시리스트에 담았습니다!'
                        })
                    })
                }else {
                    $('#alertStart').css("color", "black");
                    let placeName = $('.name').text();
                    console.log(placeName);
                    axios.post("data/wishDelete",{"placeName" : placeName}).then(()=>{
                        Swal.fire({
                            icon: 'success',
                            title: '위시리스트에 삭제 하였습니다!'
                        })
                    })

                }
            }

        })
    }
    //위시리스트에 저장이 되어 있으면 찜(별)색 유지하는 이벤트
    haveWishStarEvent(){
        let placename = $('.name').text();
        axios.post("data/haveWish",{"placeName" : placename}).then((result)=>{
            if(result.data.useremail!=null){
                $('#alertStart').css("color", "yellow");
            }
        })
    }

    //위시리스트 띄워주는 이벤트
    wishListShowEvent(){
        axios.post("data/wishSelect", {}).then((result)=>{

            $('.wish-list').append(this.wishListShow(result));
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
                    $('#alertStart').css("color", "black");
                })
        })
    }

    //리뷰 삭제 클릭시 이벤트
    replyDeleteEvent(){
        $('.deleteReply').on("click",(e)=>{
            let useremail = $("#user").text();
            let title = $("#title").text();
            /*let rating = $('input[name ="rating"]:checked').val();*/
            let object = {
                "email" : useremail,
                "title" : title
            }
            console.log(object);
            if(useremail!=null){
            axios({
                method : 'post',
                url : 'data/deleteReply',
                params : object
            }).then((email)=>{
                console.log(email);
                $(e.currentTarget).parent('.wrapper').remove();
            });

            }
            Swal.fire({
                icon: 'success',
                title: '리뷰가 삭제되었습니다.'
            })
        })

    }

    replyupdatelike() {

        $(".likebtn").on("click", (e)=> {
            $(e.currentTarget).html('<i class="fa fa-heart" aria-hidden="true"></i> You liked this');
        })

        //리뷰 수정 버튼 눌렀을 시 수정 버튼은 숨기고 수정 완료버튼 보여주기
        $(".updatebtn").on("click", (e) => {
            $(e.currentTarget).prev().css({'display': 'block'})
            $(e.currentTarget).parent().find('button.likeComment').addClass("hidden");
            $(e.currentTarget).parent().find('button.deleteComment').addClass("hidden");
            $(e.currentTarget).parent().find('button.updateComment').addClass("hidden");
            $(e.currentTarget).parent().find('p').addClass("hidden");
            $(e.currentTarget).parent().find('i').addClass("hidden");
            $(e.currentTarget).parent().find('ul').addClass("hidden");
            $(e.currentTarget).parent().find('h4').addClass("hidden");
            $(e.currentTarget).parent().find('h3').addClass("hidden");
            $(e.currentTarget).parent().find('a').addClass("hidden");


        })

        //수정 완료 버튼
        $(".updatesucess").on("click", (e)=> {

            let updatereview = $(e.currentTarget).prev().val();
            let useremail = $("#user").text();
            let title = $("#title").text();
            let updateRating = $('input[name ="rating2"]:checked').val();
            let updatenum = $(e.currentTarget).next().text();
            debugger;

            const comment = { //중복
                "title": title,
                "grade": updateRating,
                "email": useremail,
                "review": updatereview,
                "num": updatenum
            };
            axios({
                method: "put",
                url: 'updateReview',
                params: comment
            })

            location.reload();


        });
    }

    //이미지 이벤트
    imageEvent(){
        function readURL(input) {
            let formData = new FormData();
            if (input.files && input.files[0]) {
                let reader = new FileReader();

                reader.onload = function(e) {
                    $('#imgArea').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        $(":input[name='file']").change(function() {
            if( $(":input[name='file']").val() == '' ) {
                $('#imgArea').attr('src' , '');
            }
            $('#imgViewArea').css
            ({ 'display' : '' });
            readURL(this);
        });



    }

    //작성하기 버튼 클릭시
    reviewEvent() {
        $("#addComments").on("click", (e)=> {
            let formData = new FormData();
            let reviewcontents = $("#comment").val();
            let useremail = $("#user").text();
            let title = $("#title").text();
            let rating = $('input[name ="rating"]:checked').val();
            if($("#fileInput")[0].files[0]!=null){
            formData.append("file", $("#fileInput")[0].files[0]);
            }
            formData.append("email", useremail);
            formData.append("title", title);
            formData.append("grade", rating);
            formData.append("review", reviewcontents);
            if (useremail === "") {
                Swal.fire({
                    icon: 'success',
                    title: '로그인이 필요합니다'
                })
                return;
            } else if (reviewcontents === "") {
                Swal.fire({
                    icon: 'success',
                    title: '내용을 입력해주세요'
                })
                return;
            } else if (!rating) {
                Swal.fire({
                    icon: 'success',
                    title: '별점을  눌러주세요'
                })
                return;
            } else if ($(e.currentTarget)) {
                Swal.fire({
                    icon: 'success',
                    title: '리뷰가추가되었습니다.'
                })
            }

            //리뷰데이터를 저장
            axios({
                method : "post",
                url : '/saveReview',
                data : formData,
                headers:{
                    'Content-Type' : 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                }
            }).then((data) => {
                $('#allComments').append(this.reviewAppendList(data));
                this.replyDeleteEvent();
                this.replyupdatelike();
            });
        });
    }
}