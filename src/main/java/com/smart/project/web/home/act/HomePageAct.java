package com.smart.project.web.home.act;

import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.KakaoMemberVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Controller
public class HomePageAct {

    final private Test test;

    @RequestMapping("/kakaoJoin")
    public String kakaoJoin(@ModelAttribute KakaoMemberVO vo) {
        System.out.println("이동");
        System.out.println(vo);
        test.kakaoJoin(vo);
        return "redirect:/mango";
    }

}
