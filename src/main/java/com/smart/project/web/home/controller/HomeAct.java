package com.smart.project.web.home.controller;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.util.*;
import java.util.List;
import javax.servlet.http.HttpSession;


@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeAct {
	final private Test test;
	ArrayList list = new ArrayList();

	@RequestMapping("/clearpost")
	public String clearpost(@RequestBody Map param, HttpSession session) {
		list.clear();
		session.removeAttribute("list");

		return "mango";
	}

	@RequestMapping("/")
	public String home(Model model, Criteria cri, HttpServletRequest request, HttpSession session) {
//		String email = (String) session.getAttribute("email");
//		if(email!=null){
//
//		}
		return "mango";
	}
	@RequestMapping("/foodTypeListPage")
	public String foodTypeListPage(Model model, Criteria cri, HttpServletRequest request) {
	/*	List<MangoVO> list = test.searchAll("한");
		model.addAttribute("list",list);*/

		return "foodTypeListPage";
	}

	@RequestMapping("/admin")
	public String admin(){
		return "admin/admin";
	}

	@RequestMapping("/login")
	public String login(){
		return "Member/login/login";
}

	@RequestMapping("/detailPage")
	public String datailPage(@ModelAttribute MangoVO vo, HttpSession session, Model model){
		String placename = vo.getName();
		MangoVO mangoVO1 = test.selectCurrent(placename);
		// 최근 클릭한 가게
		if(mangoVO1.getName()==placename) {
			StringBuffer str = new StringBuffer(vo.getImg1());
			str.insert(str.indexOf(",") + 1, "&src=");
			vo.setImg1(str.toString());
			log.error("가져온 src => {}", vo.getImg1());
		}
		list.add(mangoVO1);
		log.error("list 값 =>{}", list);
		HashSet<String> duplicateData = new HashSet<>(list);
		session.setAttribute("list",duplicateData);
		log.error("중복방지처리 =>{}", duplicateData);

		test.reviewAvg(placename);
		test.reviewCount(placename);

		MangoVO mangoVO = test.getMangoVO(placename);
		model.addAttribute("mango",mangoVO);

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
