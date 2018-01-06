


var search = getQueryString('search');
var page = 1;

$(function () {
    mui.init({
        pullRefresh: {
            container: "#pullrefresh",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                contentdown: '下拉刷新效果',
                contentover: '拉动的时候的效果',
                contentrefresh: '松开手的时候正在加载数据的显示文本...',
                callback: function () {
                    setTimeout(function () {
                        getProductList({
                            proName: '鞋', //商品名称
                            brandId: 1, //品牌的id
                            price: 1, //价格排序 1是升序  2是降序
                            num: 1, //数量的排序 1是升序 2是降序
                            page: 1, //页码数  第几页商品类别
                            pageSize: 2, //页容量 每页的商品条数
                        }, function (data) {
                            var html = template('productlistTmp', data);
                            $('.product-content .mui-row').html(html);
                            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                            page=1;
                            mui('#pullrefresh').pullRefresh().refresh(true);
                        });
                    },1000);
                }
            },
            up: {
                contentrefresh: "加载中...", //提示上拉刷新
                contentnomore: '加载完成........',
                callback: function() {
                    //模拟ajax请求 过1秒后结束上拉加载更多
                    setTimeout(function() {
                        // mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                        // 如果传入true表示数据全部加载完成（没有更多数据了）
                        page++;
                        getProductList({
                            proName: '鞋', //商品名称
                            brandId: 1, //品牌的id
                            price: 1, //价格排序 1是升序  2是降序
                            num: 1, //数量的排序 1是升序 2是降序
                            page: page, //页码数  第几页商品类别
                            pageSize: 2, //页容量 每页的商品条数
                        }, function(data) {
                            var html = template('productlistTmp', data);
                            $('.product-content .mui-row').append(html);
                            if(data.data.length <= 0){
                                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                                return;
                            }
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                        });
                    }, 1000);
                }
            }
        }
    });

    $('.search-input').val(search);
    getProductList({
        proName: search, //商品名称
        // brandId: 1, //品牌的id
        price: 1, //价格排序 1是升序  2是降序
        num: 1, //数量的排序 1是升序 2是降序
        page: 1, //页码数  第几页商品类别
        pageSize: 6, //页容量 每页的商品条数
    },function (data) {
        var html = template('productlistTmp',data);
        $('.product-content .mui-row').html(html);
    });

    // 调用搜索
    searchProductlist();
    // 商品排序
    productlistSort();
    //跳转到详情页
    linkDetail();
});

function getProductList(options, callback) {
    $.ajax({
        url:'/product/queryProduct',
        data:options,
        success:function (data) {
            // console.log(backData);
            callback && callback(data);
        }
    });
}


// 搜索商品方法  点击搜索 , 搜索输入内容相关数据
function searchProductlist() {
    $('.btn-search').on('click',function () {
       var search = $('.search-input').val().trim();
        // 判断搜索框是否有值,没有就 return
        if(!search){
            alert('请输入要搜索的商品');
            return;
        }
        getProductList({
            proName: search, //商品名称
            price: 1, //价格排序 1是升序  2是降序
            num: 1, //数量的排序 1是升序 2是降序
            page: 1, //页码数  第几页商品类别
            pageSize: 2, //页容量 每页的商品条数
        }, function(data) {
            if (data.data.length <= 0) {
                $('.productlist-content .mui-row').html('<p>没有此商品</p>');
                return;
            }
            var html = template('productlistTmp', data);
            $('.product-content .mui-row').html(html);

        });

    });
}
//商品排序
function productlistSort(){
    $('.product-orderBar .mui-row > div').on('tap',function () {
        $('.product-orderBar .mui-row > div').removeClass('active');
        $(this).addClass('active');
        var sortType = $(this).data('type');
        var sort = $(this).data('sort');
        if(sort == 1){
            sort = 2;
            $(this).data('sort',2);
            $(this).find('i').removeClass().addClass('fa fa-angle-down');
        }else{
            sort = 1;
            $(this).data('sort',1);
            $(this).find('i').removeClass().addClass('fa fa-angle-up');
        }
        if (sortType == 'price') {
            getProductList({
                proName: search, //商品名称
                price: sort, //价格排序 1是升序  2是降序
                page: 1, //页码数  第几页商品类别
                pageSize: 6, //页容量 每页的商品条数
            }, function(data) {
                var html = template('productlistTmp', data);
                $('.product-content .mui-row').html(html);
            });
        } else if (sortType == 'num') { //如果排序类型是num 调用API传入排序方式num属性
            getProductList({
                proName: search, //商品名称
                num: sort,//数量排序 1是升序 2降序
                page: 1, //页码数  第几页商品类别
                pageSize: 6, //页容量 每页的商品条数
            }, function(data) {
                var html = template('productlistTmp', data);
                $('.product-content .mui-row').html(html);
            });
        }
    });
}

function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}


//点击跳转到详情页
function linkDetail(){
    $('.product-content').on('tap','.product',function () {
        console.log('product');
        window.location.href = "detail.html?id="+$(this).data('id');
    });
}
