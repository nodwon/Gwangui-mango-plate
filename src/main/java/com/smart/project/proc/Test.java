package com.smart.project.proc;

import com.smart.project.annotation.Master;

//import com.smart.project.web.home.vo.KakaoMemberVO;
import com.smart.project.web.home.vo.*;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Master
@Component
public interface Test {
	/**********************************************************************************************
	 * @Method 설명 : Test_Mapper.xml에 있는 쿼리를 사용 할 경우
	 * @작성일 : 2021-02-15
	 * @작성자 : 김남현
	 * @변경이력 :
	 **********************************************************************************************/
	void kakaoJoin(KakaoMemberVO vo);

	List<MangoVO> selectMango2(String search);

	List<MangoVO> selectMango2All();

    List<MangoVO> selectName(String name);

    void insertMember(CommonMemberVO vo);

    int idCount(String userId);

	/*CommonMemberVO selectOneMem(CommonMemberVO vo);*/
	@Select("select * from table_join where userID=#{userId} and userPw=#{userPw}")
	CommonMemberVO selectOneMem(@Param("userId") String userId, @Param("userPw") String userPw);

	/*List<MangoVO> searchAll(String search);*/
	List<MangoVO> searchAll(Criteria criteria);

	void saveReview(ReviewDTO reviewDTO);
//	List<ImgFileDTO> getImeges(@Param("reviewId") String reviewId);
//	void saveFile(
//			@Param("fileId") String fildId,
//			@Param("reviewId") String reviewId,
//			@Param("fileName") String fileName,
//			@Param("fileSize") long fileSize,
//			@Param("contentType") String contentType
//	);
	//void deleteFiles(@Param("fileIds") List<String> fileIds);
}
