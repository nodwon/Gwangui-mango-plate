"use strict";
$(()=>{
    new Login();
})

export class Login{

    constructor() {

        console.log("로그인페이지");
        this.event();

    }

    event(){
        Kakao.init('1c7dbcce4a9a8dcce06171f411ab8aaf');
        $("#kakao-login-btn").on("click", function(){
            //1. 로그인 시도
            Kakao.Auth.login({
                success: function(authObj) {

                    //2. 로그인 성공시, API 호출
                    Kakao.API.request({
                        url: '/v2/user/me',
                        success: function(res) {
                            console.log(res);
                            // alert(JSON.stringify(authObj));
                            // alert(JSON.stringify(res));
                            // alert(res.kakao_account['email']);
                            // alert(res.properties['nickname']);
                            console.log(authObj.access_token);
                            $(function(){
                                let requestEmail = JSON.stringify(res.kakao_account['email']);
                                $('#email').val(requestEmail);
                                let value = $('input[name=email]').val();
                                // alert(value);
                                console.log(value);
                            });

                            $(function(){
                                let requestNick = JSON.stringify(res.properties['nickname']);
                                $('#nickname').val(requestNick);
                                let value = $('input[name=nickname]').val();
                                // alert(value);
                                console.log(value);
                            });
                            let email = $('input[name=email]').val();
                            let nickname = $('input[name=nickname]').val();
                            // scope : 'profile_nickname, account_email';
                            location.href="/kakaoJoin?nickname="+nickname+"&email="+email;
                        }
                    })
                    console.log(authObj);
                    let token = authObj.access_token;
                },
                fail: function(err) {
                    alert(JSON.stringify(err));
                }
            });
        })

    }

//
}