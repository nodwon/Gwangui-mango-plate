package com.smart.project.web.home.act;

import com.smart.project.common.vo.InternCookie;
import com.smart.project.component.CommonCodeComponent;
import com.smart.project.component.data.CodeObject;
import com.smart.project.proc.Test;
import com.smart.project.security.StudyCookieService;
import com.smart.project.web.home.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.mapping.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeAct {

	final private
	CommonCodeComponent commonCodeComponent;

	/*final private Test test;*/


	@RequestMapping("/")
	public String home(Model model, Criteria cri, InternCookie cookie, HttpServletRequest request){





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


	@RequestMapping("/admin")
	public String admin(){
		return "index";
	}
	@RequestMapping("/mango")
	public String main(){ return "mango"; }
//
//@RequestMapping("/")
//public String home(@RequestParam(value = "code", required = false) String code) throws Exception{
//	System.out.println("#########" + code);
//	return "dddd/login";
//}
@RequestMapping("/login")
	public String login(){
		return "dddd/login";
}


	@RequestMapping("/detailPage")
	public String datailPage(@ModelAttribute modalVO modal){
		log.error("12231321{}",modal);
		return"detailPage";
	}

	@RequestMapping("/join")
	public String mJoin() {

		return "mJoin";
	}


}
