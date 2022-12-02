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
//    private Date updateDate;
    String id; // private rno;
    String title; // private Long bno;
    private String user; //  user
    Integer grade;
    String review;
    List<MultipartFile> files;
    List<String> fileIds;
    String reviewUpDateStr;
    List<String> reviewIds;

}