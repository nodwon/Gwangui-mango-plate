package com.smart.project.web.home.act;

import com.smart.project.common.vo.InternCookie;
import com.smart.project.component.CommonCodeComponent;
import com.smart.project.proc.Test;
import com.smart.project.security.StudyCookieService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeAct {

	final private
	CommonCodeComponent commonCodeComponent;

	final private Test test;
	///


	@RequestMapping("/")
	public String home(Model model, InternCookie cookie, HttpServletRequest request){

	/*	model.addAttribute("data", commonCodeComponent.getCodeList("style_f"));
		model.addAttribute("data2", commonCodeComponent.getCodeList("character_f"));

		Map<String, CodeObject> data = commonCodeComponent.getAll();
		log.error("***************************************");
		List<TestVO> list = test.sqlMenu2("");
		log.error("list===>{}", data);
		for(TestVO dt : list){
			log.error("{}//{}", dt.getUserId(), dt.getUserName());
		}
		//log.error("{}", list);
		log.error("***************************************");

		Iterator<String> keys = data.keySet().iterator();
		while( keys.hasNext() ){
			String key = keys.next();
			//log.error("key==>{}, list==>{}", key, data.get(key));
			model.addAttribute(key, data.get(key).getCodeList());
		}*/

		//log.error("{}",data);
		return "mango";
	}

	@RequestMapping("/cookie/add2")
	public String cookieAdd(HttpServletResponse response) throws java.io.UnsupportedEncodingException {
		StudyCookieService.createCookie(response, "USER_ID", "mygod76");
		StudyCookieService.createCookie(response, "NAME", URLEncoder.encode("김남현", "EUC-KR"));
		StudyCookieService.createCookie(response, "EMP_NO", URLEncoder.encode("emp_no=1234", "UTF-8"));
		return "cookie";
	}

	@GetMapping(value = "cookie3")
	public void cookieAdd2(HttpServletResponse response, Model model){
		model.addAttribute("aaa", "aaa");
		log.error("aaaaaa");
	}

	@RequestMapping("/join")
	public String join(){
		log.error("{}",commonCodeComponent.getCodeList("style_f"));
		return "dddd/join";
	}

	@RequestMapping("/data")
	@ResponseBody
	public String homeData(){
		return "index";
	}
}
