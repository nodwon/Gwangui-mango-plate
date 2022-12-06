"use strict";
import md from "../../../../templates/wishListModal.html";

$(()=>{
    new detailPage();
})
export class detailPage {
    constructor() {

        this.reviewAppendList = require("@/mango/reviewAppend.html");

        this.modalEvent();
        this.wishListEvent();
        this.favoriteStore();
        this.reviewEvent();
        this.addMap();


        this.DetailEvent();
        this.clearEvent();
        this.replyDeleteEvent();
        this.replyupdatelike();
        this.imgupload();
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
            location.href = "/";
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
    currentMove() {
        $('.currentMove').on("click", (e) => {
            /* axios.post("/data/duplicate", {}).then(()=> {

             });*/
        })
    }

    modalShow() {
        $(".btn.btn-primary.reset").on('click', (e) => {
            axios.post("/clearpost", {}).then(() => {

                $(".current").empty();
            });
        });
    }

    //위시리스트로 화면 전환
    wishListEvent() {
        $('.wishlist-place').on("click", (e) => {
            $('.current-body').addClass("hidden");
            $('.wish-body').removeClass("hidden");
            $('.reset').hide();
        })
        $('.current-place').on("click", (e) => {
            $('.wish-body').addClass("hidden");
            $('.current-body').removeClass("hidden");
            if ($('.reset').hide()) {
                $('.reset').show();
            }
        })
    }

    DetailEvent() {
        $("#modal").on("click", (e) => {
            $(".normal_pop_wrap").removeClass("hidden")
            this.ModalEvent();
        });

        //map를 표시
        $("#mapShow").append()

    }

    ModalEvent() {
        $(".btn_cls").on("click", (e) => {
            $(".normal_pop_wrap").addClass("hidden")
        });

        //모달 최근본 이미지 클릭시 이벤트
        $(".slct_food").on("click", (e) => {
            if (!$(e.currentTarget).hasClass("active")) {
                $(e.currentTarget).addClass("active");
                $(".slct_want").removeClass("active");
                $(".pop_region_content.region_content_kr").removeClass("hidden");

            }
        });
        //모달 가고싶은곳
        $(".slct_want").on("click", (e) => {
            if (!$(e.currentTarget).hasClass("active")) {
                $(e.currentTarget).addClass("active");
                $(".slct_food").removeClass("active");
                $(".pop_region_content.region_content_kr").addClass("hidden");
            }
        });
    }

    //위시리스트 db에 저장하기
    favoriteStore() {
        $('.favoriteStore').on("click", () => {
            let name = $('.name').text();
            let roadName = $('.roadName').text();
            let src = $(".card-img-top>.wishimg").attr("src");
            let email = $('.email').text();
            if (email == null || email == "") {
                Swal.fire({
                    icon: 'success',
                    title: '로그인이 필요합니다'
                })
            } else {
                if ($('#alertStart').css("color") == 'rgb(0, 0, 0)') {
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
                } else {
                    $('#alertStart').css("color", "black");
                    let placeName = $('.name').text();
                    console.log(placeName);
                    axios.post("data/wishDelete", {"placeName": placeName}).then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: '위시리스트에 삭제 하였습니다!'
                        })
                    })

                }
            }

        })
    }

    //위시리스트 띄워주는 이벤트
    wishListShowEvent() {
        axios.post("data/wishSelect", {}).then((result) => {
            console.log(result);

            let data = result.data;
            _.forEach(data, (e) => {
                let mainimg = e.mainimg;
                let placename = e.placename;
                let roadname = e.roadname;
                console.log(mainimg);
                console.log(placename);

                var html =
                    `<form class="wishForm" style="border: 1px solid saddlebrown; width: 400px; margin-left: 10px; margin-bottom: 14px" >
                    <button type="reset" class="btn btn-danger deleteWish" style="float: right; margin-top: 30px; margin-right: 10px">삭제</button>
                      <a href="/detailPage?roadname=${roadname}&name=${placename}&img1=${mainimg}">
                    <div class="wishForm_name" style="width: 200px; float: right; padding-top: 25px; color:#584647 ">
                    <b><span class="placename" style="font-size: larger">${placename}</span></b>
                    <br>
                    <span class="placeRoadName">${roadname}</span>
                    </div>
                    <img style="width: 100px;height: 100px" src="${mainimg}"></a>
                    </form>`

                $('.wish-list').append(html);
            });
            this.wishListDeleteOne();
        })

    }

    //위시리스트중 삭제버튼 클릭시 해당게시물 삭제이벤트
    wishListDeleteOne() {
        $('.deleteWish').on("click", (e) => {
            let placeName = $(e.currentTarget).parent($('.wishForm')).find($('.placename')).text()
            console.log(placeName);
            axios.post("data/wishDelete", {"placeName": placeName}).then((result) => {
                $(e.currentTarget).parent($('.wishForm')).remove();
                console.log(result);
            })
        })
    }

    //리뷰 삭제 클릭시 이벤트
    replyDeleteEvent() {
        $('.deleteReply').on("click", (e) => {
            let useremail = $("#user").text();
            let title = $("#title").text();
            /*let rating = $('input[name ="rating"]:checked').val();*/
            let object = {
                "email": useremail,
                "title": title
            }
            console.log(object);
            if (useremail != null) {
                axios({
                    method: 'post',
                    url: 'data/deleteReply',
                    params: object
                }).then((email) => {
                    console.log(email);
                    $(e.currentTarget).parent('.wrapper').remove();
                });

            }
        })

    }

    replyupdatelike() {

        $(".likebtn").on("click", (e) => {
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
        $(".updatesucess").on("click", (e) => {

            let updatereview = $(e.currentTarget).prev().val();
            let useremail = $("#user").text();
            let title = $("#title").text();
            let updateRating = $('input[name ="rating2"]:checked').val();
            let updatenum = $(e.currentTarget).next().text();


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

    //////////////////////////////////
    //작성하기 버튼 클릭시
    reviewEvent() {
        $("#addComments").on("click", (e) => {
            let reviewcontents = $("#comment").val();
            let useremail = $("#user").text();
            let title = $("#title").text();
            let rating = $('input[name ="rating"]:checked').val();
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
            const comment = {
                "email": useremail,
                "title": title,
                "grade": rating,
                "review": reviewcontents
            };


            //추가 클릭 시 리뷰 추가
            axios({
                method: "post",
                url: "data/review",
                params: comment

            }).then((data) => {
                $('#allComments').append(this.reviewAppendList(data));
                this.replyDeleteEvent();
                this.replyupdatelike();
            });


            //리뷰데이터를 저장
            axios({
                method: "post",
                url: '/saveReview',
                params: comment
            })

        });

    }
}
//     imgupload() {
//         let DropFileUploader = function(options) {
//             this.extend(this.config, options);
//
//             this.init();
//         };
//
//
//         DropFileUploader.prototype = {
//             // Default options
//             config: {
//                 url: 'index.php',							// The URL to send the files to
//                 method: 'post',								// The request method to use (GET/PUT/POST/DELETE)
//                 limit: 3,									// The limit of files that can be send at once
//                 allowed: ['image/jpeg', 'image/png'],		// The allowed file type, files are checked on MIME-type
//                 data: { },									// Additional data to send to the server
//                 onStart: function() {						// Callback function on start of the upload
//                 },
//                 onProgress: function() {					// Callback function on progress of the upload
//                 },
//                 onComplete: function(data) {				// Callback function on completion of the upload
//                     console.log(data);
//                 },
//                 onError: function() {						// Callback function on error of the upload
//                 }
//             },
//
//             // Elements
//             $dropbox: document.getElementById('dd-dropbox'),
//             $previewer: document.getElementById('dd-previewer'),
//             $fileInputBtn: document.getElementById('dd-fileInputBtn'),
//
//             /** --------------------------------------------------------------------------------------
//              * Initialize, set listeners for the drag and drop events and the file select button
//              */
//             init: function() {
//                 let self = this;
//
//                 // If the dropbox has a 'upload' button, create the hidden form with the file input element to associate the button with
//                 if(self.$fileInputBtn) {
//                     self.createForm();
//                 }
//
//
//
//                 /* EVENTS START --------------------------------------------------------------------------- */
//
//                 // DRAGENTER
//                 self.$dropbox.addEventListener('dragenter', function(e) {
//                     self.cancelEvent(e);
//
//                     self.$dropbox.style.borderColor='#4FB2F0';
//                 });
//
//                 // DRAGEXIT
//                 self.$dropbox.addEventListener('dragexit', function(e) {
//                     self.cancelEvent(e);
//
//                     self.$dropbox.style.borderColor='#dddddd';
//                 });
//
//                 // DRAGOVER
//                 self.$dropbox.addEventListener('dragover', function(e) {
//                     self.cancelEvent(e);
//                 });
//
//                 // DROP
//                 self.$dropbox.addEventListener('drop', function(e) {
//                     self.cancelEvent(e);
//
//                     self.$dropbox.style.borderColor='#dddddd';
//
//                     // Process the files
//                     self.process(e.dataTransfer.files);
//                 });
//
//                 if(self.$fileInputBtn) {
//                     // Upload button click
//                     self.$fileInputBtn.addEventListener('click', function(e) {
//                         // 'Click' the file input element to open up the file dialog
//                         self.$fileInput.click();
//                     });
//
//                     // File input change
//                     self.$fileInput.addEventListener('change', function(e) {
//                         // Process the files
//                         self.process(self.$fileInput.files);
//                     });
//                 }
//
//                 /* EVENTS END ----------------------------------------------------------------------------- */
//             },
//
//             /** --------------------------------------------------------------------------------------
//              * Extend the default settings with the user options
//              */
//             extend: function(target, source) {
//                 let self = this;
//
//                 target = target || {};
//
//                 for (let prop in source) {
//                     if (typeof source[prop] === 'object') {
//                         target[prop] = self.extend(target[prop], source[prop]);
//                     } else {
//                         target[prop] = source[prop];
//                     }
//                 }
//                 return target;
//             },
//
//             /** --------------------------------------------------------------------------------------
//              * Process the files, read each file and set the onload event, next upload the file
//              */
//             process: function(files) {
//                 let self   = this,
//                     length = files.length;
//
//                 // Clear the previews container
//                 if(self.$previewer)
//                     self.$previewer.innerHTML = '';
//
//                 // Check the limit
//                 if(length > self.config.limit) {
//                     console.log('You can only upload ' + self.config.limit + ' files at a time');
//                     return;
//                 }
//
//                 for(let i=0; i<files.length; i++) {
//
//                     (function(file, index) {
//
//                         file['index'] = index;
//
//                         // If the file type allowed?
//                         if(self.config.allowed.length < 0) {
//                             if( ! isAllowed(file.type)) {
//                                 console.log('File type: ' + file.type + ' is not allowed');
//                                 return;
//                             }
//                         }
//
//                         if(self.$previewer) {
//                             let reader = new FileReader();
//
//                             // When the file is loaded (not uploaded!)
//                             reader.onload = function(e) {
//                                 self.preview(file, e.target.result);
//                             }
//
//                             // Read the file
//                             reader.readAsDataURL(file);
//                         }
//
//                         // Upload the file
//                         self.upload(file);
//
//                     })(files[i], i);
//                 }
//             },
//
//             /** --------------------------------------------------------------------------------------
//              * Create a preview image for the file that is being uploaded and set a data attribute for the index of the file
//              */
//             preview: function(file, src) {
//                 let self = this,
//                     img  = document.createElement('img');
//
//                 // Save the index for this file in de data-attribute so the preview <img/> can be found again when the upload is complete
//                 img.setAttribute('data-index', file.index);
//                 img.className = img.className +  ' dd-upload-pending';
//                 img.src = src;
//
//                 self.$previewer.appendChild(img);
//             },
//
//             /** --------------------------------------------------------------------------------------
//              * Upload the file, create a new XHR object and set the event handlers
//              */
//             upload: function(file) {
//                 let self 	 = this,
//                     xhr 	 = new window.XMLHttpRequest(),
//                     formData = new window.FormData();
//
//                 xhr.open(self.config.method, self.config.url);
//
//                 // Start
//                 xhr.upload.onloadstart = function(e) {
//                     // Call the start callback function
//                     if(typeof self.config.onComplete == 'function')
//                         self.config.onStart();
//                 };
//
//                 // Complete
//                 xhr.onreadystatechange = function() {
//                     if(xhr.readyState == 4) {
//                         // Get the image that is uploaded by it's index
//                         if(self.$previewer) {
//                             var img = self.$previewer.querySelector('img[data-index="' + file.index + '"]');
//
//                             img.className = img.className.replace(' dd-upload-pending','') + ' dd-upload-success';
//                         }
//
//                         // Call the complete callback function
//                         if(typeof self.config.onComplete == 'function')
//                             self.config.onComplete(JSON.parse(xhr.responseText));
//                     }
//                 };
//
//                 // Progress
//                 xhr.upload.onprogress = function(e) {
//                     var progress = e.loaded / e.total * 100;
//
//                     // Call the progress callback function
//                     if(typeof self.config.onComplete == 'function')
//                         self.config.onProgress();
//                 };
//
//                 // Error
//                 xhr.upload.onerror = function(e) {
//                     img.className = img.className.replace(' dd-upload-pending','') + ' dd-upload-error';
//
//                     // Call the error callback function
//                     if(typeof self.config.onComplete == 'function')
//                         self.config.onError();
//                 };
//
//                 // Add additional data to the request
//                 if(self.config.data) {
//                     for(let prop in self.config.data) {
//                         formData.append(prop, self.config.data[prop]);
//                     }
//                 }
//
//
//                 // Add file data
//                 formData.append('file', file);
//
//                 // Make the request
//                 xhr.send(formData);
//             },
//
//             /** --------------------------------------------------------------------------------------
//              * Create the form that is used to send the file to the server
//              */
//             createForm: function() {
//                 var self  = this,
//                     input = document.createElement('input');
//
//                 input.setAttribute('id', 'dd-fileInput');
//                 input.setAttribute('type', 'file');
//
//                 document.body.insertBefore(input, self.$dropbox);
//
//                 self.$fileInput = document.getElementById('dd-fileInput');
//
//                 self.$fileInput.style.display = 'none';
//             },
//
//             /** --------------------------------------------------------------------------------------
//              * See if the MIME-type of the file is allowed by checking if it is in the config.allowed array
//              */
//             isAllowed: function(type) {
//                 var self = this;
//
//                 return (new RegExp('(' + self.config.allowed.join('|').replace(/\./g, '\\.') + ')$')).test(type);
//             },
//
//             /** --------------------------------------------------------------------------------------
//              * Stop event bubbling with the drag and drop events
//              */
//             cancelEvent: function(e) {
//                 e.preventDefault();
//                 e.stopPropagation();
//             }
//         };
//
//         (function(window, document, undefined) {
//             // Create a new DropFileUploader
//             var uploader = new DropFileUploader({
//                 url: 'upload.php',
//                 allowed: ['image/jpeg', 'image/png'],
//                 data: { id: 2 },
//                 limit: 3
//             });
//         }(window, document, undefined));
//     }
// }




