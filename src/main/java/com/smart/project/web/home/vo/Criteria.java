package com.smart.project.web.home.vo;

import lombok.Data;

@Data
public class Criteria {
    // 페이징처리를 위한 vo클래스입니다.
    //기준이 되는 값들을 저장하기위해 선언된 변수
    private String search;
    private int page; // 현재 페이지 번호
    private int perPageNum;// 한 페이지에 보여줄 게시글에 수
    public Criteria() {
        this.page = 1;
        this.perPageNum = 5;
    }
    //현제 페이지의 게시글의 시작번호
    //1 페이지는 0게시물번호 부터 시작한다.  0~9
    //2페이지는 10   10~19
    public int getPageStart() {
        return (page-1)*perPageNum;
    }



}
