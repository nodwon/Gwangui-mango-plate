package com.smart.project.web.home.vo;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Data
public class ReviewDTO {

//
//    private String reply;
//    private String replyer;
//    private Date replyDate;
    private Date updateDate;
    private String email; // private rno;
    private String title; // private Long bno;
    private Integer grade;
    private String review;
    private List<MultipartFile> files;
    private List<String> fileIds;
    private String reviewUpDateStr;
    private List<String> reviewIds;
    private byte[] img;
}