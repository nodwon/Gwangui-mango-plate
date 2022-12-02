package com.smart.project.web.home.controller;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.CommonMemberVO;
import com.smart.project.web.home.vo.KakaoMemberVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.smart.project.web.home.vo.ModalVO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomePageAct {

    final private Test test;
    final private BCryptPasswordEncoder encoder;

    //일반 회원 로그인
    @PostMapping("/commonLogin")
    public String commonLogin(CommonMemberVO vo, HttpSession session, HttpServletRequest request, HttpServletResponse response){
        log.error("{}",vo);
        String userId = vo.getUserId();
        String userPw = request.getParameter("userPw");
        CommonMemberVO result  = test.selectOneMem(userId);
        String userEmail = result.getUserEmail();
        log.error("user=>{}",result );

        if(result!=null && encoder.matches(userPw, result.getUserPw())){
            System.out.println("로그인 성공");
            //로그인시 쿠키 생성
            Cookie cookieId = new Cookie("email", userEmail);
            // 쿠키 유지시간 설정(60초*1)
            cookieId.setMaxAge(60*1);
            response.addCookie(cookieId);
            session.setAttribute("email",result.getUserEmail());
        }else{
            System.out.println("로그인 실패");
            return "Member/login/login";
        }
        return "redirect:/mango";
    }

    //가입
    @PostMapping("/register")
    public String createMember(CommonMemberVO vo) {
        String securityPw = encoder.encode(vo.getUserPw());
        vo.setUserPw(securityPw);

        test.insertMember(vo);
        log.info(vo.toString());
        return "redirect:/mango";
    }
    
    //카카오 로그인 데이터 저장
    @RequestMapping("/kakaoJoin")
    public String kakaoJoin(@ModelAttribute KakaoMemberVO vo, HttpSession session, HttpServletResponse response) {
        log.error("vo값=>{}",vo);
        String email = vo.getEmail();
        Cookie cookieEmail = new Cookie("email", email);
        cookieEmail.setMaxAge(60*1);
        response.addCookie(cookieEmail);

        if(!(vo.getEmail().equals(""))){
            session.setAttribute("email",vo.getEmail());
            System.out.println(vo.getEmail());
        }
        test.kakaoJoin(vo);
        System.out.println(vo);
        return "redirect:/mango";
    }
    //로그아웃
    @RequestMapping("/logout")
    public String logoutMainGET(HttpServletRequest request) throws Exception{
        HttpSession session = request.getSession();
        session.invalidate();
        request.getSession(true);
        return "redirect:/mango";
    }

    @PostMapping("/FindId")
    public String FindId(CommonMemberVO vo, HttpServletResponse response) throws Exception {

        response.setContentType("text/html; charset=utf-8");
        PrintWriter out = response.getWriter();

        log.error("id{}",vo);
        String userEmail = vo.getUserEmail();
        String userName = vo.getUserName();

        CommonMemberVO result = test.findMemberId(userEmail, userName);

        if(result != null) {
            System.out.println("아이디 찾기 성공");
            out.println("<script>alert('아이디는 "+result.getUserId()+" 입니다');</script>");
        }
        else {
            System.out.println("아이디 찾기 실패");
            out.println("<script>alert('가입된 아이디가 없습니다');</script>");

        }
        return "Member/login/password";
    }

    @PostMapping("/FindPw")
    public String FindPw(CommonMemberVO vo, HttpServletResponse response,HttpSession session) throws Exception {

        response.setContentType("text/html; charset=utf-8");
        PrintWriter out = response.getWriter();

        log.error("pw{}",vo);
        String userEmail = vo.getUserEmail();
        String userName = vo.getUserName();
        String userPhoneNum = vo.getUserPhoneNum();
        CommonMemberVO result = test.findMemberPw(userEmail, userName, userPhoneNum);

        if(result != null) {
            System.out.println("비밀번호 찾기 성공");
            session.setAttribute("userEmail",userEmail);
            out.println("<script>alert('비밀번호를 변경해주세요.');</script>");
            return "Member/login/updatePw";
        }
        else {
            System.out.println("비밀번호 찾기 실패");
            out.println("<script>alert('가입된 비밀번호가 없습니다');</script>");
            return "Member/login/password";
        }
    }

    @PostMapping("/updatePw")
    public String updatePw(CommonMemberVO vo, HttpSession session) {

        String userEmail = (String) session.getAttribute("userEmail");
        String userPw = vo.getUserPw();
        System.out.println(userEmail);

        String securityPw = encoder.encode(userPw);
        test.updateMemberPw(userEmail, securityPw);

        return "Member/login/login";

    }



/*    @RequestMapping("/data/select")//해외
    public String userDB(Model model , @ModelAttribute ModalVO param){
        //String keyData = String.valueOf(param);  //우리가 post (key,object)
        log.error("user 정보 확인 : {}", param);
        //받은 MAP 데이터 {'KEY' : 값형태} 형태
        log.error("user 정보 확인 : {}", param.getName());

        //log.error("{}",isData);
        List<ModalVO> modalVO = new ArrayList<>();
        modalVO.add(param);
        log.error("{}",modalVO);
        model.addAttribute("modalList",modalVO);


        //add한 codeVOList를 데이터베이스에 넣기
        //test.userInsert(modalVO);

        return "test2";
    }*/






/*
    @RequestMapping("/getModal")
    public String getModal(Model model, @ModelAttribute ModalVO modal){
      *//*  list<vo> store = model.getAttribute("stores");
        store.add(new vo());
        model.addAttribute("stores",store);*//*

        //리스트를 생성하는 부분은

        log.error("name => {}",modal.getName());
        log.error("name => {}",modal.getRoadName());
        log.error("name => {}",modal.getSrc());
        return "test";

    }*/
/*    @RequestMapping("/getHtml")
    public String getHtml(){

        return "topNav";


    }*/
    @PostMapping("/data/modal")
    public String getModal(Model model, ModalVO modal){
        model.addAttribute("name", modal.getName());
        model.addAttribute("roadName", modal.getRoadName());
        model.addAttribute("src", modal.getSrc());
        log.error("name => {}",modal.getName());
        log.error("roadname => {}",modal.getRoadName());
        log.error("src => {}",modal.getSrc());
        return "detailPage";
    }


}
