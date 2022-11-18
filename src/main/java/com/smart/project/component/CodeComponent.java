package com.smart.project.component;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.smart.project.component.data.CodeObject;
import com.smart.project.web.home.vo.mangoVO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;

import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

abstract class CodeComponent {
	final Map<String, mangoVO> mangoMap = new LinkedHashMap<>();
	final Map<String, CodeObject> codeMap = new LinkedHashMap<>();
	@Autowired ApplicationContext applicationContext;
	@PostConstruct
	public void init() {
		String jsonFileName = jsonPath();
		List<CodeObject> codeObjectList = getListFromJson(jsonFileName);
		List<mangoVO> mangoObjectList = getMangoListFromJson(jsonFileName);
		codeObjectList.forEach(data -> codeMap.put((data.getId()), data));
		mangoObjectList.forEach(data -> mangoMap.put((data.getId()), data));
	}



	private List<CodeObject> getListFromJson(String jsonPath) {
		List<CodeObject> codeList = new ArrayList<>();
		Resource resource = applicationContext.getResource(jsonPath);
		try {
			codeList = new Gson().fromJson(new BufferedReader(new InputStreamReader(resource
					.getInputStream())), new TypeToken<List<CodeObject>>() {
			}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return codeList;
	}
	private List<mangoVO> getMangoListFromJson(String jsonPath) {
		List<mangoVO> mangoList = new ArrayList<>();
		Resource resource = applicationContext.getResource(jsonPath);
		try {
			mangoList = new Gson().fromJson(new BufferedReader(new InputStreamReader(resource
					.getInputStream())), new TypeToken<List<mangoVO>>() {
			}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return mangoList;
	}


	/**********************************************************************************************
	 * @Method 설명  : 상속받은 code관련 컴포넌트에서 반드시 구현해야 한다. (어떤 json 파일을 사용할지를 리턴해야함)
	 * @작성일   :  2019-07-23
	 * @작성자   : 김성훈
	 * @변경이력  :
	 **********************************************************************************************/
	abstract String jsonPath();

	/**********************************************************************************************
	 * @Method 설명  : id에 해당하는 codeList 반환
	 * @작성일   :  2019-01-28
	 * @작성자   : 김성훈
	 * @변경이력  :
	 **********************************************************************************************/
	public List<CodeObject.Code> getCodeList (String id) {

		List<CodeObject.Code> dummyResult = new ArrayList<>();
		if(StringUtils.isEmpty(id)) { return dummyResult; }

		CodeObject codeObject = codeMap.get(id);
		if(codeObject == null) { return dummyResult; }

		return codeObject.getCodeList();
	}


	/**********************************************************************************************
	 * @Method 설명 : 해당 id에 일치하는 json객체의 codeList중 code가 일치하는 json 리턴
	 * @작성일   : 2019-01-28
	 * @작성자   : 김성훈
	 * @변경이력  :
	 **********************************************************************************************/
	public CodeObject.Code getOneByIdAndCode (String id, String code) {
		CodeObject codeObject = codeMap.get(id);
		if(codeObject != null) {
			for (CodeObject.Code obj : codeObject.getCodeList()) {
				if (StringUtils.equals(obj.getCode(), code)) {
					return obj;
				}
			}
		}
		return new CodeObject().new Code();
	}

	/**********************************************************************************************
	 * @Method 설명 : 해당 id에 일치하는 json객체의 codeList중 codeName이 일치하는 json 리턴
	 * @작성일   : 2019-01-28
	 * @작성자   : 김성훈
	 * @변경이력  :
	 **********************************************************************************************/
	public CodeObject.Code getOneByIdAndCodeName (String id, String codeName) {
		CodeObject codeObject = codeMap.get(id);
		if(codeObject != null) {
			for (CodeObject.Code obj : codeObject.getCodeList()) {
				if (StringUtils.equals(obj.getCodeName(), codeName)) {
					return obj;
				}
			}
		}
		return new CodeObject().new Code();
	}


	/**********************************************************************************************
	 * @Method 설명  : json파일 오브젝트 전체를 반환함
	 * @작성일   :  2019-01-28
	 * @작성자   : 김성훈
	 * @변경이력  :
	 **********************************************************************************************/
	public Map<String, CodeObject> getAll() {
		return codeMap;
	}
	public Map<String, mangoVO> getmangoAll() {
		return mangoMap;
	}

}
