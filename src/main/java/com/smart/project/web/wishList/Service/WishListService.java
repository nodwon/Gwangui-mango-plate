package com.smart.project.web.wishList.Service;

import com.smart.project.web.login.Naver.NaverClient;
import com.smart.project.web.wishList.Repository.WishListRepository;
import com.smart.project.web.wishList.dto.WishListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service  // 해당클래스를 루트 컨테이너에 빈 객체로 생성해주는 어노테이션
@RequiredArgsConstructor
public class WishListService {
    private final NaverClient naverClient;
    private final WishListRepository wishListRepository;

    public WishListDto search(String query){
        //지역검색

        return new WishListDto();
    }
}