package com.smart.project.web.home.act;

import com.smart.project.component.CommonCodeComponent;
import com.smart.project.component.LocCodeComponent;
import com.smart.project.component.data.CodeObject;
import com.smart.project.proc.Test;
import com.smart.project.web.home.vo.TestVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
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

	@PostMapping("/register")
	public TestVO createMember(TestVO vo) {

		test.insertMember(vo);
		log.info(vo.toString());
		return vo;
	}

	@PostMapping("/idCheck")
	public int checkDuplicateId(@RequestBody Map param){
		String id = String.valueOf(param.get("userId"));

		int idCount = test.idCount(id);

		return idCount;
	}
}
