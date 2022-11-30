package com.smart.project.web.home.act;


import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.*;
import com.smart.project.proc.Test;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.context.properties.bind.validation.ValidationErrors;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeDataAct {
	final private Test test;


	@PostMapping("/data/mango2All")
	public Map<String, Object> getMango2DataAll(@RequestBody Map param){
		Map<String, Object> result = new HashMap<>();
		List<MangoVO> data = test.selectMango2All();
		/*List<mango2VO> data=null;*/
		log.error("select 결과 list : {}",data);
		result.put("food",data);

		return result;
	}
	// 검색 입력 or 음식 메뉴 클릭 시 음식점 리스트 띄우기
	@PostMapping("/data/searchAll")
	public Map<String, Object> getSearchAll(@RequestBody Map param, HttpSession session, Criteria cri){
		Map<String, Object> result = new HashMap<>();
		String search = "";
		int pageNum = 1;
		if(param.get("search") != null)
			search = String.valueOf(param.get("search"));
		if(param.get("pageNum") != null )
			pageNum = Integer.parseInt(String.valueOf(param.get("pageNum")));

		cri.setSearch(search); // 검색 창에 입력한 것
		cri.setPage(pageNum); // 페이지 번호  1번누르면 1번 set
		List<MangoVO> data = test.searchAll(cri);

		log.error("데이터 사이즈 {}",data.size());
		int totalCount = test.totalCount(cri);

		if(!(totalCount==0))
		{
			PageMaker pageMaker = new PageMaker();
			pageMaker.setCri(cri);
			pageMaker.setTotalCount(totalCount);

			result.put("page",pageMaker);
		}
		else
		{
			result.put("page",null);
		}

		log.error("select 결과 list : {}",data);
		result.put("food",data);
		return result;
	}

	@PostMapping("/data/map")
	public List<MangoVO>getMapData(@RequestBody Map param){
		String name = String.valueOf(param.get("name"));
		log.error("클릭한 맛집  : {}",name);
		test.viewCount(name);
		List<MangoVO> data = test.selectName(name);
		return data;
	}
	//위시리스트 값 가져와서 저장하기
	@RequestMapping("/wishStore")
	public WishListVO getData(@ModelAttribute WishListVO vo, HttpServletRequest request){
		String useremail = (String) request.getSession().getAttribute("email");
		String placename = vo.getPlacename();
		String roadname = vo.getRoadname();
		String mainimg = vo.getMainimg();
		log.error("세션에서 가져온 email => {}",useremail);
		log.error("세션에서 가져온 placename => {}",placename);
		log.error("세션에서 가져온 roadname => {}",roadname);
		log.error("세션에서 가져온 이미지src => {}",mainimg);
		vo.setUseremail(useremail);
		WishListVO data = vo;
		if(!(vo.getUseremail().equals("")) && vo.getUseremail()!=null) {
			test.insertWish(vo);
		}else {
			log.error("로그인 되지 않음");
		}
		return data;
	}
	//위시리스트에 DB저장된 값 출력
	@RequestMapping("/data/wishSelect")
	public List<WishListVO> wishSelect(HttpServletRequest request){
		String useremail = (String) request.getSession().getAttribute("email");
		/*if(!(useremail.equals("")) && useremail!=null) {*/
		List<WishListVO> data = test.selectWish(useremail);
		/*}*/
		log.error("가져온 data => {}",data);
		return data;
	}

/*	@PostMapping("/data/select")//해외
	public String userDB(@RequestBody modalVO param){


		//String keyData = String.valueOf(param);  //우리가 post (key,object)
		log.error("user 정보 확인 : {}", param);
		//받은 MAP 데이터 {'KEY' : 값형태} 형태
		log.error("user 정보 확인 : {}", param.getName());

		//log.error("{}",isData);
		List<modalVO> modalVO = new ArrayList<>();
		modalVO.add(param);
		log.error("{}",modalVO);


		//add한 codeVOList를 데이터베이스에 넣기
		//test.userInsert(modalVO);

		return "index";
	}*/

	@PostMapping("/idCheck")
	public int checkDuplicateId(@RequestBody Map param){
		String id = String.valueOf(param.get("userId"));
		int idCount = test.idCount(id);

		return idCount;
	}




}
