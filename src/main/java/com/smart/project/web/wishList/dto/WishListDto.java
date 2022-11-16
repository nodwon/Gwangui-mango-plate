package com.smart.project.web.wishList.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WishListDto {
    private Integer index;
    private String title; // 음식명
    private String category; // 카테고리
    private String address;// 주소
    private String readAddress;// 도로명
    private String homePageLink;// 홈페이지 주소
    private String imageLink; // 음식, 가게 이미지 주소
    private int visitCount; // 방문이력
    private int shopRating; // 가계평점
    private LocalDateTime lastVisitDate; // 마지막 방문일자
}
