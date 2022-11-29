package com.smart.project.web.home.act;


import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeDataAct {

/*	final private
	CommonCodeComponent commonCodeComponent;

	final private LocCodeComponent locCodeComponent;*/
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
		List<MangoVO> data = test.selectName(name);
		return data;
	}
	@RequestMapping("/wishStore")
	public ModalVO getData(@ModelAttribute ModalVO vo, Model model, HttpSession session){

		ModalVO data = vo;
		log.error("name => {}",vo);
		return data;
	}

	@PostMapping("/idCheck")
	public int checkDuplicateId(@RequestBody Map param){
		String id = String.valueOf(param.get("userId"));

		int idCount = test.idCount(id);

		return idCount;
	}
	@PostMapping("/data/wish")
	public Map<String, Object> getwish(@RequestBody Map param){
		Map<String, Object> data = new HashMap<>();
		return data;
	}
}
