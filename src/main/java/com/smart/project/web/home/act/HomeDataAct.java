package com.smart.project.web.home.act;

import com.smart.project.component.CommonCodeComponent;
import com.smart.project.component.LocCodeComponent;
import com.smart.project.component.data.CodeObject;
import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.locationVO;
import com.smart.project.web.home.vo.mango2VO;
import com.smart.project.web.home.vo.mangoVO;
import com.smart.project.web.home.vo.modalVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeDataAct {

	final private
	CommonCodeComponent commonCodeComponent;

	final private LocCodeComponent locCodeComponent;
	final private Test test;


	@PostMapping("/data/wantLoc")
	public Map<String, Object> getWantLoc(@RequestBody Map param){
		Map<String, Object> data = new HashMap<>();
		String keyData = String.valueOf(param.get("key"));

		log.error("key===>{}", keyData);

		String[] key = keyData.split(",");


		List<String> keyList = new ArrayList<>();
		if(StringUtils.isNotEmpty(keyData)){
			keyList = Arrays.asList(keyData.split(","));
		}
		List<CodeObject.Code> wishLocData = commonCodeComponent.getCodeList("wishLoc");
		if(wishLocData != null){
			for(CodeObject.Code codeData : wishLocData){
				String keyArr = keyList.stream().filter(a -> a.equals(codeData.getCode())).findAny().orElse(null);
				if(StringUtils.isNotEmpty(keyArr)){
					log.error("keyArr===>{}", keyArr);
					codeData.setChecked(true);
				}else{
					codeData.setChecked(false);
				}
				for(int i = 0; i < key.length; i++){
					if(codeData.getCode().equals(key[i])){
						log.error("key===>{}", key[i]);
					}
				}
			}
			log.error("{}", wishLocData);
		}
		data.put("wishLoc", wishLocData);

		return data;
	}

	@PostMapping("/data/loc")
	public Map<String, Object> getLoc(@RequestBody Map param){
		Map<String, Object> data = new HashMap<>();


		locCodeComponent.getCodeList("m002");

		return data;
	}

	@PostMapping("/data/locMiddle")
	public Map<String, Object> getLocMiddle(@RequestBody Map param){
		Map<String, Object> data = new HashMap<>();


		locCodeComponent.getCodeList("m003e");

		return data;
	}




	@PostMapping("/data/mango")
	public List<mangoVO>getMangoData(@RequestBody Map param){

	/*	//db에 바로 넣기
		log.error("{}",data);

		Iterator<String> keys = data.keySet().iterator();   //keys =[sex, gender, want, style_f, style_m, character_f, character_m, job, salary, salary_convert, school, car, religion,]
		List<mangoVO> mangoVOList = new ArrayList<>();
		*//*while( keys.hasNext() ){   // 키가 있으면 true  없으면 false
			String key = keys.next(); //key =  1. sex  2 gender  다음값이 입력된다.*//*
		for(mangoVO v:data.values())
		{
			mangoVO mv = new mangoVO();
			mv.setAddress(v.getAddress());
			mv.setId(v.getId());
			mv.setMenu(v.getMenu());
			mv.setName(v.getName());
			mv.setPhone(v.getPhone());
			mangoVOList.add(mv);
		}
		*//*test.insertMangoJson(mangoVOList);*/
		List<mangoVO> data = test.selectMango();



		log.error("sdfsafd{}",data);
		return data;
	}


	@PostMapping("/data/mango2All")
	public Map<String, Object> getMango2DataAll(@RequestBody Map param){
		Map<String, Object> result = new HashMap<>();
		List<mango2VO> data = test.selectMango2All();
		/*List<mango2VO> data=null;*/
		log.error("select 결과 list : {}",data);
		result.put("food",data);

		return result;
	}

	@PostMapping("/data/mango2")
	public List<mango2VO>getMango2Data(@RequestBody Map param){
	 String mainmenu = String.valueOf(param.get("menu"));
	 log.error("검색창에 입력한 것 : {}",mainmenu);
	 List<mango2VO> data = test.selectMango2(mainmenu);
		/*List<mango2VO> data=null;*/
	log.error("select 결과 list : {}",data);
		return data;
	}

	@PostMapping("/data/map")
	public List<mango2VO>getMapData(@RequestBody Map param){
		String name = String.valueOf(param.get("name"));
		log.error("검색창에 입력한 것 : {}",name);

		List<mango2VO> data = test.selectName(name);
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
}
