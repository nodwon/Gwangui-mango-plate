package com.smart.project.web.login.Naver;

import com.smart.project.web.login.Naver.dto.SearchImageReq;
import com.smart.project.web.login.Naver.dto.SearchImageRes;
import com.smart.project.web.login.Naver.dto.SearchLocalReq;
import com.smart.project.web.login.Naver.dto.SearchLocalRes;
import lombok.var;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.ParameterizedType;

@Component // 개발자가 직접 작성한 Class를 Bean에 직접 등록하기 위해 사용
public class NaverClient {
    @Value("${naver.cilent.id")
    private String naverClientID; //naverClientID
    @Value("${naver.cilent.secret")
    private String naverClientSecret;
    @Value("${naver.cilent.local") // 네이버 요청 주소
    private String naverLocalSearchUrl;
    @Value("${naver.cilent.image") // 네이버 이미지 주소
    private String naverImageSearchUrl;

    public SearchLocalRes searchLocal(SearchLocalReq searchLocalReq){
        // uriComponentsBuilder 인터넷 상의 존재 모든 자원은  url를 이용하여 그위치를 나타냄
        // 웹 어플리 케이션 개발할때 어떤 데이터를 리턴해주기 위해서 내부적으로 url를 이용해 요청을 전송하게됨 fromUriString (String) 대응하는  객체생성
        var uri = UriComponentsBuilder.fromUriString(naverLocalSearchUrl)
                .queryParams(searchLocalReq.toMultiValueMap())// query 파라미터를
                .build() // 빌드
                .encode() // 인코드
                .toUri(); // url 가져오기
        var header = new HttpHeaders();
        header.set("X-Naver-Client-Id", naverClientID); // 애플리케이션 등록시 발급 받는 client id값
        header.set("X-Naver-Client-Secret", naverClientSecret); // 애플리케이션 등록시 발급 받는 client 비밀번호값
        header.setContentType(MediaType.APPLICATION_JSON); //  HTTP GET 방식을 이용하여 바디에다가 넣어준다.

        var httpEntity = new HttpEntity<>(header);
        var responseType = new ParameterizedTypeReference<SearchLocalRes>(){}; // generic 타입을 응답받을 수 있다. superType 새ㅏ두
        var responseEntity = new RestTemplate().exchange( // Rest방식 api를 호출할수 있는 내장 클라스  api호출
                uri,
                HttpMethod.GET,
                httpEntity,
                responseType
        );
        return responseEntity.getBody(); // 반환받은 실제 데이터 정보
    }
    public SearchImageRes searchImage(SearchLocalReq searchImageReq){ // 이미지
        var uri = UriComponentsBuilder.fromUriString(naverImageSearchUrl)
                .queryParams(searchImageReq.toMultiValueMap())
                .build()
                .encode()
                .toUri();

        var headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", naverClientID);
        headers.set("X-Naver-Client-Secret", naverClientSecret);
        headers.setContentType(MediaType.APPLICATION_JSON);

        var httpEntity = new HttpEntity<>(headers);
        var responseType = new ParameterizedTypeReference<SearchImageRes>(){};


        var responseEntity = new RestTemplate().exchange(
                uri,
                HttpMethod.GET,
                httpEntity,
                responseType
        );

        return responseEntity.getBody();
    }


}
