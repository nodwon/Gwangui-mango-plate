package com.smart.project.web.wishList.Service;

import com.smart.project.web.login.Naver.NaverClient;
import com.smart.project.web.login.Naver.dto.SearchLocalReq;
import com.smart.project.web.wishList.Repository.WishListRepository;
import com.smart.project.web.wishList.dto.WishListDto;
import com.smart.project.web.wishList.entity.WishListEntity;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.stereotype.Service;

import java.util.List;

@Service  // 해당클래스를 루트 컨테이너에 빈 객체로 생성해주는 어노테이션
@RequiredArgsConstructor
public class WishListService {
    private final NaverClient naverClient;
    private final WishListRepository wishListRepository;

    public WishListDto search(String query) {
        //지역검색
        var searchLocalReq = new SearchLocalReq();
        searchLocalReq.setQuery(query);
        var searchLocalRes = naverClient.searchLocal(searchLocalReq);
        return new WishListDto();

        if (searchLocalRes.getTotal() > 0) {
            var localItem = searchLocalRes.getItems().stream().findFirst().get();
            var imageQuery = localItem.getTitle().replaceAll("<[^>]*>", "");
            var searchImageReq = new SearchLocalReq();
            searchImageReq.setQuery(imageQuery);

            //이미지
            var searchImageRes = naverClient.searchImage(searchImageReq);

            if (searchImageRes.getTotal() > 0) {
                var imageItem = searchLocalRes.getItems().stream().findFirst().get();

                // 결과를 리턴
                var result = new WishListDto();
                result.setTitle(localItem.getTitle());
                result.setCategory(localItem.getCategory());
                result.setAddress(localItem.getAddress());
                result.setRoadAddress(localItem.getRoadAddress());
                result.setHomePageLink(localItem.getLink());
                result.setImageLink(localItem.getLink());
                return result;
            }
        }
        return new WishListDto();
    }

    public WishListDto add(WishListDto wishListDto){
        var entity = dtoToEntity(wishListDto);
//        var saveEntity  =wishListRepository.save(entity);
//                return entityToDto(saveEntity);
    }

    private WishListEntity dtoToEntity(WishListDto wishListDto){
        var entity = new WishListEntity();
       //entity.setIndex(wishListDto.getIndex()); => DB연결했을때
        entity.setTitle(wishListDto.getTitle());
        entity.setCategory(wishListDto.getCategory());
        entity.setAddress(wishListDto.getAddress());
        entity.setAddress(wishListDto.getRoadAddress());
        entity.setHomePageLink(wishListDto.getHomePageLink());
        entity.setImageLink(wishListDto.getHomePageLink());
        entity.setVisit(wishListDto.isVisit());
        entity.setVisitCount(wishListDto.getVisitCount());
        entity.setLastVisitDate(wishListDto.getLastVisitDate());
        return entity;

    }
    private WishListDto dtoToEntity(WishListEntity wishListEntity){
        var dto = new WishListEntity();
        //entity.setIndex(wishListDto.getIndex()); => DB연결했을때
        dto.setTitle(wishListEntity.getTitle());
        dto.setCategory(wishListEntity.getCategory());
        dto.setAddress(wishListEntity.getAddress());
        dto.setAddress(wishListEntity.getRoadAddress());
        dto.setHomePageLink(wishListEntity.getHomePageLink());
        dto.setImageLink(wishListEntity.getHomePageLink());
        dto.setVisit(wishListEntity.isVisit());
        dto.setVisitCount(wishListEntity.getVisitCount());
        dto.setLastVisitDate(wishListEntity.getLastVisitDate());
        return dto;
//
    }
//    public List<WishListDto> findAll(){
//        return wishListRepository.findAll()
//                .stream()
//                .map(it -> entityToDto(it))
//                .collect(Collectors.toList());
//    }
    //public void delete(int index) {
    //    wishListRepository.deleteById(index);
    //}
    //public void addVisit(int index){
    //    var wishItem = wishListRepository.findById(index);
    //    if(wishItem.isPresent()){
    //        var item = wishItem.get();
    //        item.setVisit(true);
    //        item.setVisitCount(item.getVisitCount()+1);
    //    }
}

}