package com.smart.project.web.home.controller;

import ch.qos.logback.core.encoder.EchoEncoder;
import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.CommonMemberVO;
import com.smart.project.web.home.vo.KakaoMemberVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.smart.project.web.home.vo.ModalVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sun.util.resources.cldr.rof.CalendarData_rof_TZ;
import sun.util.resources.cldr.rwk.CalendarData_rwk_TZ;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomePageAct {

    final private Test test;

    @PostMapping("/commonLogin")
    public String commonLogin(CommonMemberVO vo, HttpSession session){
        log.error("{}",vo);
        String userId = vo.getUserId();
        String userPw = vo.getUserPw();

        CommonMemberVO result  = test.selectOneMem(userId,userPw);


        log.error("21321321321{}",result );
        if(result!=null){
            System.out.println("로그인 성공");
            session.setAttribute("email",result.getUserEmail());
        }else{
            System.out.println("로그인 실패");

            return "Member/login/login";
        }
        return "redirect:/mango";
    }

    @PostMapping("/register")
    public String createMember(CommonMemberVO vo) {

        test.insertMember(vo);
        log.info(vo.toString());
        return "redirect:/mango";
    }
    
    //카카오 로그인 데이터 저장111
    @RequestMapping("/kakaoJoin")
    public String kakaoJoin(@ModelAttribute KakaoMemberVO vo, HttpSession session) {
        if(vo.getEmail()!=null){
            System.out.println(vo+"vo값");
            session.setAttribute("email",vo.getEmail());
            System.out.println(vo.getEmail());
        }

        test.kakaoJoin(vo);
        System.out.println(vo);
        return "redirect:/mango";
    }
    @RequestMapping("/logout")
    public String logoutMainGET(HttpServletRequest request) throws Exception{
        HttpSession session = request.getSession();
        session.invalidate();
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
    public String FindPw(CommonMemberVO vo, HttpServletResponse response) throws Exception {

        response.setContentType("text/html; charset=utf-8");
        PrintWriter out = response.getWriter();

        log.error("pw{}",vo);
        String userEmail = vo.getUserEmail();
        String userName = vo.getUserName();
        String userPhoneNum = vo.getUserPhoneNum();

        CommonMemberVO result = test.findMemberPw(userEmail, userName, userPhoneNum);

        if(result != null) {
            System.out.println("비밀번호 찾기 성공");
            out.println("<script>alert('비밀번호는 "+result.getUserPw()+" 입니다');</script>");
        }
        else {
            System.out.println("비밀번호 찾기 실패");
            out.println("<script>alert('가입된 비밀번호가 없습니다.');</script>");
        }
        return "Member/login/password";
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
    @RequestMapping("/test2")
    public String getData(Model model ,@ModelAttribute ModalVO modal){
      *//*  list<vo> store = model.getAttribute("stores");
        store.add(new vo());
        model.addAttribute("stores",store);*//*
        log.error("name => {}",modal.toString());

        model.addAttribute("name",modal.getName());
        model.addAttribute("roadName",modal.getRoadName());
        model.addAttribute("src",modal.getSrc());

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


}
