package com.smart.project.proc;

import com.smart.project.annotation.Master;

import com.smart.project.web.home.vo.*;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.http.HttpStatus;
import org.apache.ibatis.annotations.Update;
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
	@Select("select * from table_join where userID=#{userId}")
	CommonMemberVO selectOneMem(@Param("userId") String userId);

	/*List<MangoVO> searchAll(String search);*/
	List<MangoVO> searchAll(Criteria criteria);

	int totalCount(Criteria criteria);

	MangoVO getMangoVO(String name);

	void insertWish(WishListVO vo);

	List<WishListVO> selectWish(String useremail);

	void wishDelete(WishListVO vo);
	List<Mango2VO> searchAll(String search);

	@Select("select userId from table_join where userEmail=#{userEmail} and userName=#{userName}")
	CommonMemberVO findMemberId(@Param("userEmail") String userEmail,@Param("userName") String userName);

	@Select("select userPw from table_join where userEmail=#{userEmail} and userName=#{userName} and userPhoneNum=#{userPhoneNum}")
	CommonMemberVO findMemberPw(@Param("userEmail")String userEmail, @Param("userName") String userName, @Param("userPhoneNum") String userPhoneNum);

    void viewCount(String name);

	MangoVO selectCurrent(String placename);

	void saveReview(ReviewDTO reviewDTO);

	ReviewDTO getReview(@Param("reviewId") String reviewId);
	List<ReviewDTO> getReviewsByKeySet(@Param("reviewUpdateDate") String reviewUpdateDate,
									   @Param("reviewId") String reviewId);
	List<ReviewDTO> getReviewsForMap();
	void deleteReviews(@Param("reviewIds") List<String> reviewIds);
	List<FileDTO> getImages(@Param("reviewId") String reviewId);
	void saveFile(
			@Param("fileId") String fileId,
			@Param("reviewId") String reviewId,
			@Param("fileName") String fileName,
			@Param("fileSize") long fileSize,
			@Param("contentType") String contentType
	);
	void deleteFiles(@Param("fileIds") List<String> fileIds);

	List<ReviewDTO> currentReview(String placename);

	void deleteReply(String email);
	@Update("update table_join set userPw = #{userPw} where userEmail = #{userEmail}")
	void updateMemberPw(@Param("userEmail")String userEmail, @Param("userPw")String userPw);


	void reviewAvg(String placename);

	void reviewCount(@Param("title")String title, @Param("amount")int amount);

	void rvShow(String placename);
}
