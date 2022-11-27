package com.smart.project.web.home.vo;

import lombok.Data;

@Data
public class PageMaker {
    //페이징처리하기위한 클래스

    // 현재 페이지와 한페이지당 몇개씩 볼 것인가를 가지고있어야된다.
    private Criteria cri; // page . perPageNum
    private int totalCount; // 총 게시물 개수
    private int displayPageNum =8; //하단에 출력되는 페이지 개수
    private int startPage; // 시작페이지 번호 3,10일떄 1    11 -> 2
    private int endPage; // 끝페이지 번호 (총게시물 수에따라 조정이필요하다)
    private boolean prev ;  // 이전버튼(true,false)
    private boolean next; //다음버튼 (true , false)
    // 전체 게시글의 수를 저장하는 메서드
    //select count(*) from reply;
    public void setTotalCount(int totalCount) {
        this.totalCount =totalCount;
        pageMaker();
    }

    //페이징 처리에 필요한 계산 메서드(가장중요)
    public void pageMaker() {
        //계산을 하기전에 총게시물 수가 필요하다.
        //순서 중요합니다.
        //1. 화면에 보여질 마지막 페이지 번호(계산수식)
        //나중에 조정해야됩니다.
        endPage=(int)(Math.ceil(cri.getPage()/(double)displayPageNum)*displayPageNum);
        //2. 화면에 보여줄 시작페이지
        startPage = (endPage-displayPageNum)+1;
        if (startPage<=0) {startPage=1;}
        //3.전체 마지막 페이지 계산
        //end 페이지를 조정하기위해서 계산
        int tempEndPage=(int)(Math.ceil(totalCount/(double)cri.getPerPageNum()));
        //4. 화면에 보여줄 마지막 페이지의 유효성검사.
        if(tempEndPage<endPage)
            endPage= tempEndPage;
        //5. 이전페이지 버튼 존재 여부
        prev=(startPage==1) ? false:true;
        //6. 다음페이지 버튼존재 여부
        next=(endPage<tempEndPage)?true:false;
        //질문 next=(endPage>cri.getPage())?false:true;

    }

}
