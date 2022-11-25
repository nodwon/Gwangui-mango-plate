package com.smart.project.web.home.controller;

import com.smart.project.web.home.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeAct {
	/*final private Test test;*/


	@RequestMapping("/")
	public String home(Model model, Criteria cri, HttpServletRequest request) {


		return "mango";
	}


	@RequestMapping("/admin")
	public String admin(){
		return "admin";
	}
	@RequestMapping("/mango")
	public String main(){ return "mango"; }

@RequestMapping("/login")
	public String login(){
		return "Member/login/login";
}


	@RequestMapping("/detailPage")
	public String datailPage(@ModelAttribute ModalVO modal){
		log.error("12231321{}",modal);
		return"detailPage";
	}

	@RequestMapping("/join")
	public String mJoin() {

		return "Member/join/mJoin";
	}

	@RequestMapping("/findIdPw")
	public String findIdPw() {
		return "Member/login/password";
	}


}
