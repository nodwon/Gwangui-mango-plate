package com.smart.project.web.home.vo;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Data
public class ReviewDTO {

    private Date updateDate;
    private String email;
    private String title;
    private Integer grade;
    private int num;
    private String review;
    private List<String> fileIds;
    private String reviewUpDateStr;
    private List<String> reviewIds;
    private byte[] img;
}