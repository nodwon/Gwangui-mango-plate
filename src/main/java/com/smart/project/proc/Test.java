package com.smart.project.proc;

import com.smart.project.annotation.Master;

//import com.smart.project.web.home.vo.KakaoMemberVO;
import com.smart.project.web.home.vo.*;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.http.HttpStatus;
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

	 boolean insert(ReviewDTO vo);

	List<ReviewDTO> read(Long bno);

	boolean delete(int bno);

	boolean update(ReviewDTO reply);

	 List<ReviewDTO> getListWithPaging(
			@Param("cri") Criteria cri, @Param("bno") Long bno);
	List<ReviewDTO> getCountByBno(Long bno);

	void viewCount(String name);

	int register(ReviewDTO vo);

	Object getList(Criteria cri, Long bno);

	int modify(ReviewDTO reviewDTO);

	int remove(Long rno);

	Object get(Long rno);

	HttpStatus getReviewnum();

}
