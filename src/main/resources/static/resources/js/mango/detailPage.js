"use strict";
import md from "../../../../templates/wishListModal.html";

$(()=>{
    new detailPage();
})
export class detailPage{
    constructor() {

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
    }

    modalEvent(){
        $('#modal').on('click',(e)=>{
            console.log('위시리스트')
            this.modalshow();
        })
    }

    modalshow(){
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

    }

    favoriteStore(list){
        $('.favoriteStore').on("click",(e)=>{
            let name = $('.name').text();
            let roadName = $('.roadName').text();
            let src = $(".card-img-top>.wishimg").attr("src");
            console.log(name);
            console.log(roadName);
            console.log(src);
            let Object = {
                "placename" : name,
                "roadname" : roadName
            }
            axios({
                method:"post",
                url:'/wishStore',
                params : Object
            }).then((result)=>{
                console.log(Object);
                console.log(result.data);
            })

            axios.post("data/wishSelect", {}).then((result)=>{
                $('.wish-list').append(result);
                console.log(result.data);


                let data = result.data;
                _.forEach(data,(e)=>{

                    let placename = e.placename;
                    let roadname = e.roadname;

                    var html = [
                        '<li>'+placename+'</li>',
                        '<li>'+roadname+'</li>'
                    ].join('');
                    $('.wish-list').append(html);
                });

            })
        })
    }

}




