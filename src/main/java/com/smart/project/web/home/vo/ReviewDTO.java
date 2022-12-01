package com.smart.project.web.home.vo;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Data
public class ReviewDTO {
    private Long rno;
    private Long bno;

    private String reply;
    private String replyer;
    private Date replyDate;
    private Date updateDate;

}