package com.smart.project.web.login.Naver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.var;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchImageReq {
    private String query =" "; // 요청변수 검색을 원하는 문자열로서 utf-8로 인코딩한다
    private int display =1; // 검색 결과 출력 건수 지정
    private int start =1;  // 검색 시작위치로 1만 가능
    private String sort ="sim"; // 정렬옵션:
    private String filter = "all"; // 사이즈 필터옵션 - 전체

    public MultiValueMap<String,String> toMultiValueMap(){ // RestTemplate의 exchange 메소드를 이용해 HTTP.GET 호출을 할때면 매번 불편
        //바로 Query string 처리
       // Request Body로 데이터를 전달하는 HTTP.POST의 경우에는 아래와 같이 간단하게 Dto 인스턴스 그대로 데이터를 전달할 수 있습니다.
        // multiValuemap 사용이유는 같은 key를 가진 파라미터 값이 여러개일 경우를 대비히는것
        var map = new LinkedMultiValueMap<String, String>();

        map.add("query", query);
        map.add("display", String.valueOf(display));
        map.add("start", String.valueOf(start));
        map.add("sort", sort);
        map.add("filter", filter);
        return map;

    }
}
