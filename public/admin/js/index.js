

$(function () {
    getUser();
});

function getUser() {
    $.ajax({
        url:'/user/queryUser',
        data:{
            'page':1,
            'pageSize':10
        },
        success:function (data) {
            console.log(data);
            var html = template('userTmp',data);
            $('.main-body').html(html);
        }
    });
}



function updateUser() {
    $('body').on('click','.btn-options',function () {
        var id = $(this).data('id');
        var isDelete = $(this).data('isDelete');
        if(isDelete == 1){
            isDelete = 2;
        }else{
            isDelete = 1;
        }
        $.ajax({
            url:'/user/update',
            type:'post',
            data:{
                'id':id,
                'isDelete':isDelete
            },
            success:function (data) {
                if(data.success){
                    getUser();
                }
            }
        });
    });
}