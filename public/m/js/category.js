

$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.006,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        bounce: true //是否启用回弹
    });
    getCategoryLeftTmp();
    categoryLeftClick();
    getCategoryRightData(1);

});
function getCategoryLeftTmp(){
    $.ajax({
        url:'/category/queryTopCategory',

        success:function(backData){
            // console.log(backData);
            var html = template('categoryLeftTmp',backData);
            $('.category-left ul').html(html);
            $('.category-left ul li:eq(0)').addClass('active');
        }
    });
}
function categoryLeftClick(){
    $('.category-left').on('click',function(e){
        // console.log(e);
        var idData = $(e.target).parent().data('id');
        console.log($(e.target).parent().data('id'));
        getCategoryRightData(idData);
    });
}
function getCategoryRightData(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        data: { 'id': id },
        beforeSend:function (data) {
            $('.loadEffect').show();
        },
        complete:function () {
            setTimeout(function () {
                $('.loadEffect').hide();
            },1000);
        },
        success: function(data) {
            console.log(data);
            var html = template('categoryRightTmp', data);
            // 判断如果有数据就添加html如果没有数据添就添加提示没有数据
            if (data.rows.length) {
                $('.category-right .mui-scroll').html(html);
            } else {
                $('.category-right .mui-scroll').html('<p>没有数据</p>')
            }
        }
    });
}



