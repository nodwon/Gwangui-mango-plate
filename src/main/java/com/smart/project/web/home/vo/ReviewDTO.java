package com.smart.project.web.home.vo;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ReviewDTO {
    private String id;
    private String title;
    private Integer grade;
    private String review;
//    List<MultipartFile> files;
//    List<String> fileIds;
//    private String reviewDateUpDateStr;
//    List<String> reviewIds;
}