

$(function () {
    getCategoryFirst();
    addCategoryFirst();
    prevPage();
    nextPage();
});

function getCategoryFirst(){
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        data:{
            'page':1,
            'pageSize':2
        },
        success:function (data) {
            data.page = Math.ceil(data.total / 2);
            var page = [];
            for(var i = 0;i < data.page;i++){
                page.push(i+1);
            }
            data.page = page;
            pageCount = data.page;

            var html = template('categoryFirstTmp',data);
            $('.main-body').html(html);
        }
    });
}

function addCategoryFirst(){
    $('.btn-add').on('click',function () {
        var categoryName = $('.category-first').val().trim();
        console.log(categoryName);
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:{
                'categoryName':categoryName
            },
            success:function (data) {
                // alert('添加成功');
                if(data.success){
                    getCategoryFirst();

                }

            }
        });
    });
}

var page = 1;
var pageCount = 1;
function prevPage() {
    $('body').on('click', '.prev', function() {
        page--;
        if (page <= 1) {
            page = 1;
        }
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: { 'page': page, 'pageSize': 5 },
            success: function(data) {
                data.page = Math.ceil(data.total / 5);
                pageCount = data.page;
                var page = [];
                for (var i = 1; i <= data.page; i++) {
                    page.push(i);
                }
                data.page = page;
                console.log(data.page);
                var html = template('categoryFirstTmp', data);
                $('.main-body').html(html);
            }
        });
    });
}
function nextPage() {
    $('body').on('click', '.next', function() {
        page++;
        if (page >= pageCount) {
            page = pageCount;
        }
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: { 'page': page, 'pageSize': 5 },
            success: function(data) {
                data.page = Math.ceil(data.total / 5);
                pageCount = data.page;
                var page = [];
                for (var i = 1; i <= data.page; i++) {
                    page.push(i);
                }
                data.page = page;
                console.log(data.page);
                var html = template('categoryFirstTmp', data);
                $('.main-body').html(html);
            }
        });
    });
}

