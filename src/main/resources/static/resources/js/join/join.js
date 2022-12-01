"use strict";

import {FormatUtil} from "../module/common/formatUtil.js";

$(()=>{
	new Join();
})

export class Join
{

	constructor() {
		this.joinEvent();
	}

	// 회원가입
	joinEvent(){

		// 아이디 중복 검사
		$('.btn_id').on('click', (e)=> {
			$('.btn_id').addClass('active');
			let userId = $('.form-control:eq(0)').val();
			if(userId !== "") {
				axios.post("/idCheck",{"userId": userId}).then((res)=>{
						//console.log(res);
						if(res.data >= 1){
							$('.join_txt.confirm').hide();
							$('.join_txt.error:eq(0)').show();
						} else if (res.data === 0){
							$('.join_txt.error:eq(0)').hide();
							$('.join_txt.confirm').show();
						}
				}).catch((e)=>{
						console.log(e);
				});
			}
		});

		// 제출 방지(아이디 중복확인 안했을 경우, 미입력인 경우, 비밀번호와 비밀번호 확인이 불일치인 경우)
		$('.frm').on('submit', function (e) {
			if(!$('.btn_id').hasClass('active')) {
				alert("아이디 중복 확인을 해주세요");
				$('.join_txt.error').hide();
				e.preventDefault();
			}
			if($('#inputEmail').val() === '') {
				$('.join_txt.error').hide();
				$('.join_txt.error:eq(1)').show();
				e.preventDefault();
			}
			if($('#inputPassword').val() !== $('#inputPasswordConfirm').val()) {
				$('.join_txt.error').hide();
				$('.join_txt.error:eq(2)').show();
				e.preventDefault();
			}
			if($('#inputName').val() === '') {
				$('.join_txt.error').hide();
				$('.join_txt.error:eq(4)').show();
				e.preventDefault();
			}
			if($('#inputPhoneNumber').val() === '') {
				$('.join_txt.error').hide();
				$('.join_txt.error:eq(5)').show();
				e.preventDefault();
			}
		});


		// 비밀번호 4 ~ 12자 영어,숫자만 입력 가능
		$('.form-control:eq(2)').on("keyup",(e)=>{
			let pattern = FormatUtil.pattern('password');
			if (!pattern.test($('.form-control:eq(2)').val())) {
				$('.join_txt.error').hide();
				$('.join_txt.error:eq(3)').show();
			} else {
				$('.join_txt.error').hide();
			}
		});
		this.findEvent();
		this.updateEvent();
	}

	findEvent() {

		// 아이디 찾기 입력칸 미입력 시 제출 방지
		$('.frm_id').on('submit', function (e) {
			if($('#inputEmail_id').val() === '') {
				$('.find_txt.error').hide();
				$('.find_txt.error:eq(0)').show();
				e.preventDefault();
			}
			if($('#inputName_id').val() === '') {
				$('.find_txt.error').hide();
				$('.find_txt.error:eq(1)').show();
				e.preventDefault();
			}
		});

		// 비밀번호 찾기 입력칸 미입력 시 제출 방지
		$('.frm_pw').on('submit', function (e) {
			if($('#inputEmail_pw').val() === '') {
				$('.find_txt.error').hide();
				$('.find_txt.error:eq(2)').show();
				e.preventDefault();
			}
			if($('#inputName_pw').val() === '') {
				$('.find_txt.error').hide();
				$('.find_txt.error:eq(3)').show();
				e.preventDefault();
			}
			if($('#inputPhoneNum_pw').val() === '') {
				$('.find_txt.error').hide();
				$('.find_txt.error:eq(4)').show();
				e.preventDefault();
			}
		});
	}

	updateEvent() {

		// 비밀번호 변경하기 입력칸 미입력 시 제출 방지
		$('.frm_up').on('submit', function (e) {
			if($('#inputPw_up').val() !== $('#inputPwCk_up').val()) {
				$('.ch_txt.error').hide();
				$('.ch_txt.error:eq(0)').show();
				e.preventDefault();
			}
		});

		// 비밀번호 변경란 4 ~ 12자 영어,숫자만 입력 가능
		$('#inputPw_up').on("keyup",(e)=>{
			let pattern = FormatUtil.pattern('password');
			if (!pattern.test($('#inputPw_up').val())) {
				$('.ch_txt.error').hide();
				$('.ch_txt.error:eq(1)').show();
			} else {
				$('.ch_txt.error').hide();
			}
		});
	}


}