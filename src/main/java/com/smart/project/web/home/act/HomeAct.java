package com.smart.project.web.home.act;

import com.smart.project.common.vo.InternCookie;
import com.smart.project.component.CommonCodeComponent;
import com.smart.project.component.data.CodeObject;
import com.smart.project.proc.Test;
import com.smart.project.security.StudyCookieService;
import com.smart.project.web.home.vo.TestVO;
import com.smart.project.web.home.vo.locationVO;
import com.smart.project.web.home.vo.mangoVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeAct {

	final private
	CommonCodeComponent commonCodeComponent;

	//final private Test test;


	@RequestMapping("/")
	public String home(Model model, InternCookie cookie, HttpServletRequest request){
		/*Map<String, mangoVO> data = commonCodeComponent.getmangoAll();
		//db에 바로 넣기
		//
		log.error("{}",data);
*/


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

	@RequestMapping("/detailPage")
	public String datailPage(){
		return"detailPage";
	}


}
