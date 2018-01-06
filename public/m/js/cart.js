


$(function () {
    queryCart();
    selectProduct();
    deleteCart();
    editCart();
    selectSize();
    selectNum();
});
// 删除商品
function deleteCart() {
    $('body').on('tap','.btn-delete',function () {
        $.ajax({
            url:'/cart/deleteCart',
            data:{
                'id':$(this).data('id')
            },
            success:function (data) {
                queryCart();
            }
        });
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

//编辑商品
function editCart() {
    $('body').on('tap','.btn-edit',function () {
        var nowSize = $(this).data('nowSize');
        var productSize = $(this).data('productSize');
        var size = [];
        var start = productSize.split('-')[0];
        var end = productSize.split('-')[1];
        for(var i=start;i<end;i++){
            size.push(parseInt(i));
        }
        var nowNum = $(this).data('nowNum');
        var productNum = $(this).data('productNum');
        var product = {
            'nowSize':nowSize,
            'nowNum':nowNum,
            'productSize':size,
            'productNum':productNum,
            'id':$(this).data('id')
        };
        var html = template('editCartTmp',product).replace(/(\r)?\n/g, "");
        //获取 li
        var li = $(this).parent().parent()[0];

        // console.log(product);
        mui.confirm(html, 'HelloMUI', ['编辑','取消'], function(e) {
            if (e.index == 0) {
                var selectedSize = $('.btn-size.active').html();
                var selectedNum = $('.count').val();
                var id = product.id;
                $.ajax({
                    url: '/cart/updateCart',
                    data: { 'id': id, 'size': selectedSize, 'num': selectedNum },
                    type:'post',
                    success:function (data) {
                        // 调用滑动关闭的方法 需要传入 当前编辑框的爷爷 而且必须是DOM对象
                        mui.swipeoutClose(li);
                        queryCart();
                    }
                });

            } else {
                console.log('取消');
            }
        });
    });
}

//验证是否登录
function queryCart() {
    $.ajax({
        url:'/cart/queryCart',
        success:function (data) {
            if(data.error){
                window.location.href ='login.html';
            }else{
                //登录了, 渲染购物车页面
                // console.log(data);
                var html = template('cartTmp',{'rows':data});
                $('#main ul').html(html);
                getOrderSum(data);
            }
        }
    });
}

//获取订单总额
function getOrderSum(data) {
    // console.log(data);
    var sum = 0;
    for(var i=0; i < data.length;i++){
        sum += data[i].price*data[i].num;
    }
    // console.log(sum);
    $('.order-price').html(Math.ceil(sum));
}

// 点击input改变下面的价格
function selectProduct() {
    $('#main').on('click','.product-check input',function () {
        console.log(this);
        var price = $(this).parent().parent().find('.price').data('price');
        var num = $(this).parent().parent().find('.num').data('num');
        var count = price * num;

        var sum = $('.order-price').html();
        sum -= Math.floor(count);
        $('.order-price').html(sum);
    });
}



