"use strict";

import {FormatUtil} from "../module/common/formatUtil.js";

$(()=>{
	new Join();
})

export class Join
{

	constructor() {
		console.log('join')
		this.eventBindgin();
	}

	locEvent(key){
		console.log(key)
		let locTmpl = require("@/join/want.html")
		let callObj = {'key' : $('#locWantKey').val()};

		axios.post('/data/wantLoc', callObj).then((result)=>{
			console.log(result);
			result.data.title = key.key === 'loc' ? '자기지역' : '배우자 희망지역';
			//console.log(locTmpl(result));
			$('.want_loc').append(locTmpl(result));
			$('.want_loc').removeClass('hidden');


		})
	}

	eventBindgin(){
		$('.btn_complete').on('click', (e)=>{
			let selectedKeyArray = new Array();
			$('.hope_list > li').each((idx, obj)=>{
				console.log(idx, obj, $(obj).hasClass());
				if($(obj).children('a').hasClass('active')){
					let wantKey = $(obj).children('a').data('key');
					//console.log(wantKey);
					selectedKeyArray.push(wantKey);
				}
			})
			//console.log(selectedKeyArray);
			//console.log(_.join(selectedKeyArray, ','));
			$('#locWantKey').val(_.join(selectedKeyArray, ','));
			$('.want_loc').empty().addClass('hidden');
		})

		$('.btn_reset').on('click', (e)=>{
			$('.hope_list > li').each((idx, obj)=>{
				let $obj = $(obj).children('a');
				if($obj.hasClass('active')){
					$obj.removeClass('active');
				}
			})
		})

		$('.hope_list > li > a').on('click', (e)=>{
			console.log(e, e.currentTarget, $(e.currentTarget))
			if($(e.currentTarget).hasClass('active')){
				$(e.currentTarget).removeClass('active');
			}else{
				$(e.currentTarget).addClass('active');
			}
		})

		$('.pop_cls').on('click', (e)=>{
			$('.want_loc').empty().addClass('hidden');
		})

		$('.slct_man').on('click', ()=>{
			bridge.startWin('/');
		});

		$('.btn_slct_area').on('click', (e)=>{
			console.log('aaaaaa')
			this.locEvent($(e.currentTarget).data());
		})

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


	}

}