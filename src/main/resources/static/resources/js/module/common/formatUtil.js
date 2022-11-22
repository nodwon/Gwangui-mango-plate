/**********************************************************************************************
 * @FileName  : formatUtil.js
 * @Date      : 2018. 6. 13. 
 * @작성자      : 신희원
 * @설명       : string format
 **********************************************************************************************/
export class FormatUtil {

	/**********************************************************************************************
	 * @Method 설명 : 01035127882 -> 010-3512-7882 & 0235127882 -> 02-3512-7882
	 * @작성일   : 2018. 6. 13.
	 * @작성자   : 신희원
	 * @변경이력  :
	 * 			0503도입에 따라 분기 추가 (2018.07.17 김성훈)
	 **********************************************************************************************/
	static phone(num){
		num = String(num);
		if(num.length < 1) {
			return "";
		}
		let formatNum = '';
		if(num.length === 12) {
			formatNum = num.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
		} else if (num.length === 11) {
			if(num.startsWith("0503")) {
                formatNum = num.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
			} else {
                formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            }
		} else if (num.length === 8) {
			formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
		} else {
			if (num.indexOf('02') === 0) {
				if(num.length === 9) {
					// 02 국번에 가운데가 3글자인경우
					formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
				} else {
					formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
				}
			} else {
				formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
			}
		}
		return formatNum;
	}

	static check(type, data){
		return this.pattern(type).test(data);
	}

	static search(type, data){
		return this.pattern(type).test(data);
	}

	static pattern(kind) {
		let pattern = {};
		pattern.userid = /^[a-zA-Z0-9]+$/;	// 아이디
		pattern.email = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;	// 이메일
		pattern.float = /^[0-9,.]+$/;	// 실수
		pattern.number = /[0-9]/g;	// 숫자

		pattern.tel = /^(0(303|60|70|2|31|32|33|41|42|43|51|52|53|54|55|61|62|63|64))-?(\d{3,4})-?(\d{4})$/;	// 전화번호
		pattern.hp = /^(01(0|1|6|7|8|9))-?([0-9]{3,4})-?([0-9]{4})$/;	// 휴대폰번호
        pattern.hpNoDash = /^(01(0|1|6|7|8|9))?([0-9]{3,4})?([0-9]{4})$/;	// 휴대폰번호 (- 없는)
		pattern.phone = /^(0(303|60|70|2|31|32|33|41|42|43|51|52|53|54|55|61|62|63|64|10|11|16|17|18|19))-?(\d{3,4})-?(\d{4})$/;	//전화+휴대
		pattern.jumin = /^([0-9]{6})-?([1-4][0-9]{6}$)/;	// 주민번호
		pattern.bizno = /^([0-9]{3})-?([0-9]{2})-?([0-9]{5}$)/;	// 사업자번호
		pattern.signed = /(^[+-]?\d+)/;	// 숫자 +-포함
		pattern.comma = /(^[+-]?\d+)(\d{3})/;	// 천단위 콤마
		pattern.date = /^([0-9]{4})-?(0[1-9]|1[012])-?(0[1-9]|[12][0-9]|3[0-1])$/;  //날짜
		pattern.kr = /^[가-힣]+$/; // 한국어
		pattern.en = /[a-z]/ig; // 영어
		pattern.special = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi; // 특수문자
		pattern.password = /^[A-Za-z0-9]{4,12}$/;


		return pattern[kind];
	};


    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static onlyNumber(x) {
        return x.replace(/[^0-9]/g,"");
    }

    static userLocation(target) {
    	let rtnData;
    	switch (target) {
			case "i" : rtnData = "서울"; break;
            case "i" : rtnData = "서울"; break;
            case "b" : rtnData = "경기"; break;
            case "k" : rtnData = "인천"; break;
            case "g" : rtnData = "대전"; break;
            case "f" : rtnData = "대구"; break;
            case "h" : rtnData = "부산"; break;
            case "e" : rtnData = "광주"; break;
            case "z" : rtnData = "세종"; break;
            case "j" : rtnData = "울산"; break;
            case "p" : rtnData = "충북"; break;
            case "o" : rtnData = "충남"; break;
            case "n" : rtnData = "전북"; break;
            case "l" : rtnData = "전남"; break;
            case "d" : rtnData = "경북"; break;
            case "c" : rtnData = "경남"; break;
            case "a" : rtnData = "강원"; break;
            case "m" : rtnData = "제주"; break;
            case "y" : rtnData = "북한"; break;
            case "q" : rtnData = "해외"; break;
			default : rtnData = target; break;
		}

		return rtnData;
	}
}