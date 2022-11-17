package com.smart.project.web.Naver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchImageRes { // 출력결과 필드
    private String lastBuildDate; // 검색 결과를 생성
    private int total; // 검색
    private int start;
    private int display;
    private List<SearchImageItem> items;

    public static class SearchImageItem{
        private String title;
        private String link;
        private String thumbnail;
        private String sizeheight;
        private String sizewidth;


    }
}
