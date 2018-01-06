


var id = getQueryString('id');
$(function () {
    console.log(id);
    getProductDetail(id);
    refreshInit();
    selectSize();
    selectNum();
    addCart();
});

function refreshInit() {
    mui.init({
        pullRefresh: {
            container: "#pullrefresh",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                contentdown: '下拉刷新效果',
                contentover: '拉动的时候的效果',
                contentrefresh: '松开手的时候正在加载数据的显示文本...',
                callback: function () {
                    setTimeout(function () {
                        getProductDetail(id,function () {
                            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();

                        });
                    },1000);
                }
            }
        }
    });
}
// 获取页面详细数据
function getProductDetail(id,callback) {
    $.ajax({
        url:'/product/queryProductDetail',
        data:{
            'id':id
        },
        success:function (data) {
            console.log(data);

            // 处理size
            var size = [];
            var start = data.size.split('-')[0];
            var end = data.size.split('-')[1];
            for(var i = start;i< end;i++){
                size.push(parseInt(i));
            }
            data.size = size;

            var html = template('productDetailTmp',data);
            $('.product-detail').html(html);
            var first = $('.mui-slider-group').children().first().clone().addClass('mui-slider-item-duplicate');
            var last = $('.mui-slider-group').children().last().clone().addClass('mui-slider-item-duplicate');
            $('.mui-slider-group').append(first);
            $('.mui-slider-group').prepend(last);
            $('.mui-slider-indicator .mui-indicator:eq(0)').addClass('mui-active');
            mui('.mui-slider').slider({
                interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            callback && callback();
        }
    });
}

//选择尺码
function selectSize(){
    $('body').on('tap','.btn-size',function () {
        $('.btn-size').removeClass('active');
        $(this).addClass('active');

    });
}
//选择数量
function selectNum() {
    $('body').on('tap','.btn-reduce',function () {
        var num = $(this).parent().find('input').val();
        num--;
        if(num<0){
            num = 0;
        }
        $(this).parent().find('input').val(num);
    });
    $('body').on('tap','.btn-add',function () {
        var num = parseInt($(this).parent().find('input').val());
        num++;
        var residueNum = parseInt($('.residue-num').html());
        if(num > residueNum ){
            num = residueNum;
        }
        $(this).parent().find('input').val(num);
    });
}

//添加到购物车
function addCart() {
    $('.btn-cart').on('tap',function () {
        var nowSize = $('.btn-size.active').html();
        if(!nowSize){
            mui.toast('请选择尺码');
            return;
        }

        var nowNum = $('.count').val();
        if(nowNum==0){
            mui.toast('请选择数量')
            return;
        }
        console.log(nowSize);
        console.log(nowNum);
        $.ajax({
            url:'/cart/addCart',
            type:'post',
            data:{
                productId:id,
                num:nowNum,
                size:nowSize
            },
            success:function (data) {
                console.log(data);
                if(data.error){
                    window.location.href = 'login.html';
                }
                if(data.success){
                    mui.confirm('去人跳转到购物车', '添加成功', ['确定','取消'], function(e) {
                        if (e.index == 1) {
                            // 点击了取消
                            mui.toast('还不去没了');
                        } else {
                            // 跳转到购物车
                            window.location.href = 'cart.html';
                        }
                    });
                }
            }
        });
    });
}

function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}