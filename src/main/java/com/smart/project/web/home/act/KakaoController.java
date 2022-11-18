package com.smart.project.web.home.act;

import com.smart.project.web.home.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;

@Controller
public class KakaoController {
    @Autowired
    private KakaoService kakaoService;

    @RequestMapping("/mango")
    public String home(@RequestParam(value = "code", required = false) String code) throws Exception{
        System.out.println("#########" + code);
        String access_Token = kakaoService.getAccessToken(code);
        HashMap<String, Object> userInfo = kakaoService.getUserInfo(access_Token);
        System.out.println("###access_Token#### : " + access_Token);
        System.out.println("###userInfo#### : " + userInfo.get("email"));
        System.out.println("###nickname#### : " + userInfo.get("nickname"));
        System.out.println("###profile_image#### : " + userInfo.get("profile_image"));
        return "mango";
    }

}
