package com.smart.project.web.Naver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchLocalRes {
    private String lastBuildDate;// 검색 결과를 생성
    private int total;// 검색 결과 문서의 총 개수의 미
    private int start; // 검색 결과  문서중 문서의 시작점을 의미
    private int display; // 검색된 검사 결과의 개수
    private List<SearchLocalItem> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SearchLocalItem {
        private String title; // 검색 결과 업체. 기관명 나타냄
        private String link;  // 검색 결과 업체 상세 정보가 제공되는 네이버페이지 하이퍼 텍스트 link 나타냄
        private String description; // 검색 결과 업체, 기관명에 대한 설명을 제공한다.
        private String category; // 검색결과
        private String telephone; // 빈문자열 반환, 과거에 제공되던 항목이라 하위 혼환을 위해 존재 전화번호
        private String address; // 검색 결과 업체 기관명의 주소를 제공한다.
        private String roadAddress; // 검색 결과 기관명의 도로명 주소를 제공한다.
        private int mapx; // 검색결과 업체, 기관명 위치 정보의 x좌표를 제공한다.
        private int mapy; // 검색결과 업체 기관명 위치 정보의 y좌표를 제공한다.
    }
}
