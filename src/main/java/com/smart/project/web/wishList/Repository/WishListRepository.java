package com.smart.project.web.wishList.Repository;

import com.smart.project.web.wishList.entity.WishListEntity;
import com.smart.project.web.wishListDB.MemoryDbRepositoryAbstract;
import com.smart.project.web.wishListDB.MemoryDbRepositoryIfs;
import org.springframework.stereotype.Repository;

import java.util.Arrays;

@Repository
public class WishListRepository extends MemoryDbRepositoryAbstract<WishListEntity> {

}
