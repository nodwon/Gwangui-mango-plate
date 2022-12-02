const review = (function(){

    //리뷰 작성 ajax
    function review(review, callback){
        $.ajax({
            type:"POST",
            url:"/buy/review",
            data:JSON.stringify(review),
            contentType:"application/json; charset=utf-8",
            success:function(result){
                if(callback){
                    callback(result);
                }
            },
            error:function(err){
                alert("리뷰 작성 실패!");
            }
        })
    }

    //리뷰 삭제
    function reviewDelete(review,callback){
        $.ajax({
            type:"POST",
            url:"/buy/reviewDelete",
            data:JSON.stringify(review),
            contentType:"application/json; charset=utf-8",
            success:function(result){
                if(callback){
                    callback(result);
                }
            },
            error:function(err){
                alert("리뷰를 삭제하지 못했습니다. 다시 시도해 주세요.");
            }
        })
    }

    //리뷰 수정
    function reviewModify(review,callback){
        $.ajax({
            type:"PUT",
            url:"/buy/"+review.reviewnum,
            data:JSON.stringify(review),
            contentType:"application/json; charset=utf-8",
            success:function(result){
                if(callback){
                    callback(result);
                }
            },
            error:function(err){
                alert("리뷰 수정 실패. 다시 시도해주세요~");
            }
        })
    }


    return {add:insert,addreview:review, drop:reviewDelete, modify:reviewModify};
})();