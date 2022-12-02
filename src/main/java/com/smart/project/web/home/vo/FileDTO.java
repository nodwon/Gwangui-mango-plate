package com.smart.project.web.home.vo;

import lombok.Data;

@Data
public class FileDTO {
    String fileId;
    String reviewId;
    Long fileSize;
    String fileName;
    String ContentType;
    String fileUpDateStr;

}
