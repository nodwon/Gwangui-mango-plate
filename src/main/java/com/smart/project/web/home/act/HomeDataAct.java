package com.smart.project.web.home.act;


import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.*;
import com.smart.project.proc.Test;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.context.properties.bind.validation.ValidationErrors;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Struct;
import java.util.*;
@SessionAttributes("pageNum")
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

	@PostMapping("/data/searchAll")
	public Map<String, Object> getSearchAll(Model model ,@RequestBody Map param, HttpSession session, Criteria cri){
		Map<String, Object> result = new HashMap<>();
		String search = "";
		int pageNum = 1;
		if(param.get("search") != null)
			search = String.valueOf(param.get("search"));
		if(param.get("pageNum") != null )
			pageNum = Integer.parseInt(String.valueOf(param.get("pageNum")));
		model.addAttribute("pageNum",pageNum);
		cri.setSearch(search); // 검색 창에 입력한 것
		cri.setPage(pageNum); // 페이지 번호  1번누르면 1번 set
		List<MangoVO> data = test.searchAll(cri);

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

		result.put("food",data);

		return result;
	}





	@PostMapping("/data/mango2")
	public List<MangoVO>getMango2Data(@RequestBody Map param, Criteria cri, Model model){
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
	 List<MangoVO> data = test.selectMango2(mainmenu);
		/*List<mango2VO> data=null;*/
	log.error("select 결과 list : {}",data);
		return data;
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
		String useremail = (String)request.getSession().getAttribute("email");
		List<WishListVO> data = test.selectWish(useremail);
		log.error("가져온 data => {}",data);
		return data;
	}
	//위시리스트에 선택한 리스트 삭제
	@RequestMapping("data/wishDelete")
	public WishListVO wishDelete(@RequestBody Map param, HttpServletRequest request){
		WishListVO vo = new WishListVO();
		String useremail = (String)request.getSession().getAttribute("email");
		String placename = (String)param.get("placeName");
		log.error("가져온 이메일 => {}",useremail);
		log.error("가져온 장소 => {}",placename);
		vo.setUseremail(useremail);
		vo.setPlacename(placename);

		test.wishDelete(vo);

		WishListVO data = vo;

		log.error("지운 data => {}",data);

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

//	@PostMapping(value = "/new", consumes = "application/json", produces = { MediaType.TEXT_PLAIN_VALUE })
//	public ResponseEntity<String> create(@RequestBody ReviewDTO reviewDTO) {
//		int insertCount = test.register(reviewDTO);
//
//		return insertCount == 1 ? new ResponseEntity<>("success", HttpStatus.OK)
//				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//	}
//
//	@GetMapping(value = "/pages/{bno}/{page}", produces = { MediaType.APPLICATION_XML_VALUE,
//			MediaType.APPLICATION_JSON_UTF8_VALUE })
//	public ResponseEntity<List<ReviewDTO>> getList(@PathVariable("page") int page, @PathVariable("bno") Long bno) {
//
//		Criteria cri = new Criteria(page, 10);
//
//		return new ResponseEntity<List<ReviewDTO>>((List<ReviewDTO>) test.getList(cri, bno), HttpStatus.OK);
//	}
//
//	@GetMapping(value = "/{rno}", produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_UTF8_VALUE })
//	public ResponseEntity<ReviewDTO> get(@PathVariable("rno") Long rno) {
//
//		return new ResponseEntity<ReviewDTO>((ReviewDTO) test.get(rno), HttpStatus.OK);
//	}
//
//	@RequestMapping(method = { RequestMethod.PUT,
//			RequestMethod.PATCH }, value = "/{rno}", consumes = "application/json", produces = {
//			MediaType.TEXT_PLAIN_VALUE })
//	public ResponseEntity<String> modify(@RequestBody ReviewDTO reviewDTO, @PathVariable("rno") Long rno) {
//
//		reviewDTO.setRno(rno);
//
//		return test.modify(reviewDTO) == 1 ? new ResponseEntity<>("success", HttpStatus.OK)
//				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//
//	}
//
//	@DeleteMapping(value = "/{rno}", produces = { MediaType.TEXT_PLAIN_VALUE })
//	public ResponseEntity<String> remove(@PathVariable("rno") Long rno) {
//
//		return test.remove(rno) == 1 ? new ResponseEntity<>("success", HttpStatus.OK)
//				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//
//	}

	//리뷰 등록
	@PostMapping(value ="/review", consumes = "application/json")
	public ResponseEntity<String> review(@RequestBody ReviewDTO review){
		return test.insert(review) ? new ResponseEntity<String>(test.getReviewnum()+"",HttpStatus.OK) : new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	//리뷰 삭제
	@PostMapping(value="/reviewDelete", consumes = "application/json")
	public ResponseEntity<String> reviewDelete(@RequestBody int reviewnum){
		return test.delete(reviewnum) ? new ResponseEntity<String>("success",HttpStatus.OK) : new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	//리뷰 수정
	@RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH}, value="/{reviewnum}", consumes = "application/json")
	public ResponseEntity<String> reviewModify(@RequestBody ReviewDTO review){
		return test.update(review) ? new ResponseEntity<String>("success",HttpStatus.OK):new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
