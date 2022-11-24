package com.smart.project.web.home.act;


import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.*;
import com.smart.project.proc.Test;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
		List<Mango2VO> data = test.selectMango2All();
		/*List<mango2VO> data=null;*/
		log.error("select 결과 list : {}",data);
		result.put("food",data);

		return result;
	}

	@PostMapping("/data/searchAll")
	public Map<String, Object> getSearchAll(@RequestBody Map param){
		Map<String, Object> result = new HashMap<>();
		String search = String.valueOf(param.get("search"));

		List<Mango2VO> data = test.searchAll(search);



		log.error("select 결과 list : {}",data);
		result.put("food",data);

		return result;
	}




	@PostMapping("/data/mango2")
	public List<Mango2VO>getMango2Data(@RequestBody Map param, Criteria cri, Model model){
	 String mainmenu = String.valueOf(param.get("menu"));
	 String search = String.valueOf(param.get("menu"));

	 cri.setSearch(search);

		if(search!=null)
		{
/*
			List<mangoVO> list =test.getList(cri);// 해당 페이지의 perPageNum 만큼의 리스트
			model.addAttribute("list", list); // list --> ArrayList를 가르킨다.
			log.error("{}",list);*/
			/*
	//페이징 처리에 필요한 객체를 생성
			//1 2 3 4 5 6 7 8 9 10 페이지를 만들기위해서는 endpage, totalCount 등 PageMaker에 대한 객체생성
			PageMaker pageMaker= new PageMaker();
			//전체 게시물의 수를 구하기

			pageMaker.setCri(cri);   // 현재페이지를 넣어주자.
			pageMaker.setTotalCount(test.totalCount());

			model.addAttribute("pageMaker",pageMaker);*/
		}



	 log.error("검색창에 입력한 것 : {}",mainmenu);
	 List<Mango2VO> data = test.selectMango2(mainmenu);
		/*List<mango2VO> data=null;*/
	log.error("select 결과 list : {}",data);
		return data;
	}

	@PostMapping("/data/map")
	public List<Mango2VO>getMapData(@RequestBody Map param){
		String name = String.valueOf(param.get("name"));
		log.error("검색창에 입력한 것 : {}",name);

		List<Mango2VO> data = test.selectName(name);
		/*List<mango2VO> data=null;*/
		log.error("select 결과 list : {}",data);
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
