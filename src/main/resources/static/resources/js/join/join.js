"use strict";


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

	joinEvent(){
		$('.btn_id').on('click', (e)=> {
			console.log("클릭");
			let userId = $('.form-control:eq(0)').val();
			if(userId !== "") {
				axios.post("/idCheck",{"userId": userId}).then((res)=>{
						console.log(res);
						if(res.data >= 1){
							console.log("중복");
							$('.join_txt.confirm').hide();
							$('.join_txt.error').show();
						} else if (res.data === 0){
							console.log("사용가능");
							$('.join_txt.error').hide();
							$('.join_txt.confirm').show();
						}
				}).catch((e)=>{
						console.log(e);
				});
			}
		});
	}








}