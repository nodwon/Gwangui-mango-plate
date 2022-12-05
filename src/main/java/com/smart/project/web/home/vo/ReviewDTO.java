package com.smart.project.web.home.vo;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Data
public class ReviewDTO {


    private  Date updateDate;
    String email;
    String title;
    Integer grade;
    String review;
    List<MultipartFile> files;
    List<String> fileIds;
    String reviewUpDateStr;
    List<String> reviewIds;


}