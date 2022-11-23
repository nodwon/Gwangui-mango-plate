package com.smart.project.web.home.act;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.KakaoMemberVO;
import com.smart.project.web.home.vo.TestVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.smart.project.web.home.vo.modalVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomePageAct {

    final private Test test;

//    @PostMapping("/commonLogin")
//    public String commonLogin(TestVO vo, HttpSession session){
//        TestVO cvo =
//
//
//        if (vo.getUserEmail()!=null){
//            session.setAttribute("email",vo.getUserEmail());
//        }
//        return "redirect:/mango";
//    }

    @PostMapping("/register")
    public String createMember(TestVO vo) {

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


    @RequestMapping("/test1")
    public String join12(Model model, @RequestParam("name") String name,@RequestParam("roadName") String roadName,@RequestParam("src") String src){
      /*  list<vo> store = model.getAttribute("stores");
        store.add(new vo());
        model.addAttribute("stores",store);*/
        log.error("name => {}",name);
        log.error("name => {}",roadName);
        log.error("name => {}",src);
        model.addAttribute("name",name);
        model.addAttribute("roadName",roadName);
        model.addAttribute("src",src);
        return "test";
    }
    @RequestMapping("/data/select")//해외
    public String userDB(Model model , @ModelAttribute modalVO param){



        //String keyData = String.valueOf(param);  //우리가 post (key,object)
        log.error("user 정보 확인 : {}", param);
        //받은 MAP 데이터 {'KEY' : 값형태} 형태
        log.error("user 정보 확인 : {}", param.getName());

        //log.error("{}",isData);
        List<modalVO> modalVO = new ArrayList<>();
        modalVO.add(param);
        log.error("{}",modalVO);
        model.addAttribute("modalList",modalVO);


        //add한 codeVOList를 데이터베이스에 넣기
        //test.userInsert(modalVO);

        return "test2";
    }

    // 왜 @ModelAttribute는 modal 매핑이되지않을까요?

    @RequestMapping("/test2")
    public String getData(Model model ,@ModelAttribute modalVO modal){
      /*  list<vo> store = model.getAttribute("stores");
        store.add(new vo());
        model.addAttribute("stores",store);*/
        log.error("name => {}",modal.toString());

        model.addAttribute("name",modal.getName());
        model.addAttribute("roadName",modal.getRoadName());
        model.addAttribute("src",modal.getSrc());

        return "test2";


    }

    @RequestMapping("/getModal")
    public String getModal(Model model, @ModelAttribute modalVO modal){
      /*  list<vo> store = model.getAttribute("stores");
        store.add(new vo());
        model.addAttribute("stores",store);*/

        //리스트를 생성하는 부분은

        log.error("name => {}",modal.getName());
        log.error("name => {}",modal.getRoadName());
        log.error("name => {}",modal.getSrc());
        return "test";

    }
    @RequestMapping("/getHtml")
    public String getHtml(){

        return "topNav";


    }


}
