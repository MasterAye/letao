
$(function () {
    adminLogin();
});

function adminLogin() {
    $('.btn-login').on('click',function () {
       var username = $('#inputEmail3').val();
       var password = $('#inputPassword3').val();
        $.ajax({
            url:'/employee/employeeLogin',
            type:'post',
            data:{
                'username':username,
                'password':password
            },
            success:function (data) {
                if(data.success){
                    window.location.href = 'index.html';
                }else{
                    alert(data.message);
                }
            }
        });

    });
}
