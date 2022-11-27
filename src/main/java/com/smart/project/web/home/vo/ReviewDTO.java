package com.smart.project.web.home.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ReviewDTO {
    private String id;
    private String title;
    private Integer grade;
    private String review;
}