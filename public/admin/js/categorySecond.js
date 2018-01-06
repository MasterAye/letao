

$(function () {
    getCategorySecond();
    addCategorySecond();
});

function getCategorySecond() {
    $.ajax({
        url:'/category/querySecondCategoryPaging',
        data:{
            'page':1,
            'pageSize':10
        },
        success:function (data) {
            var html = template('categorySecondTmp',data);
            $('.main-body').html(html);
        }
    });
}
//给二级分类添加点击事件
//把一级分类模板渲染到下拉框里面
function addCategorySecond() {
    $('body').on('click','.btn-add1',function () {
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            data:{
                'page':1,
                'pageSize':10
            },
            success:function (data) {
                var html = template('addCategorySecondTmp',data);
                $('.modal-body').html(html);
            }
        });
    });
    $('body').on('click','.btn-add',function () {
        var categoryId = $('#categoryFirst').val();
        var brandName = $('.category-second').val();
        //写一个不行 , 要转义一个
        var brandLogo = $('.brand-logo').val().split('\\');
        brandLogo = '/mobile/images/' + brandLogo[brandLogo.length - 1];

        $.ajax({
            url:'/category/addSecondCategory',
            data:{
                'brandName': brandName,
                'categoryId':categoryId,
                'brandLogo':brandLogo,
                'hot':1
            },
            type:'post',
            success:function (data) {
                if(data.success){
                    getCategorySecond();
                }
            }
        });
    });
}