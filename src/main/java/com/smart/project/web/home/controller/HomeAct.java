package com.smart.project.web.home.controller;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.servlet.http.HttpSession;


@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeAct {
	final private Test test;

	ArrayList list = new ArrayList();


	@RequestMapping("/")
	public String home(Model model, Criteria cri, HttpServletRequest request) {
	 List<MangoVO> list = test.searchAll(cri) ;
		model.addAttribute("list",list);


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
	@RequestMapping("/mango")
	public String main(){
		return "mango";
	}

	@RequestMapping("/login")
	public String login(){
		return "Member/login/login";
}

	@RequestMapping("/detailPage")
	public String datailPage(@ModelAttribute ModalVO modal, HttpSession session, Model model){
		/*HttpSession sessionEmail = request.getParameter();*/
//		String loginEmail = (String) session.getAttribute("email");
		// 최근 클릭한 가게
		log.error("src 값 =>{}", modal.getSrc());
		log.error("list 값 =>{}", list);
		StringBuffer str = new StringBuffer(modal.getSrc());
		str.insert(str.indexOf(",")+1,"&src=");
		modal.setSrc(str.toString());

		list.add(modal);
		HashSet<String> duplicateData = new HashSet<>(list);
		model.addAttribute("name", modal.getName());
		model.addAttribute("roadName", modal.getRoadName());
		model.addAttribute("src", str.toString());

		/*model.addAttribute("src", modal.getSrc());*/
		log.error("주소=>{}",str.toString());
		session.setAttribute("list", duplicateData);
//		log.error("가져온 세션 이메일 => {}", loginEmail);
		log.error("중복결과제거 => {}", duplicateData);
		String name = modal.getName();
		MangoVO mangoVO = test.getMangoVO(name);
		model.addAttribute("mango",mangoVO);



		return"detailPage";
	}

	@RequestMapping("/join")
	public String mJoin() {
		return "Member/join/mJoin";
	}


}
