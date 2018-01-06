$(function () {
    login();
});

function login() {
    $('.btn-login').on('click', function () {
        var username = $('.username').val().trim();
        var password = $('.password').val().trim();
        if (username && password) {
            $.ajax({
                url: '/user/login',
                type: 'post',
                data: {
                    'username': username,
                    'password': password
                },
                success: function (data) {
                    console.log(data);
                    if(data.success){
                        mui.toast('登录成功');
                        history.back();
                        location.reload();
                        // window.location.href = 'user.html';
                        // history.back();
                    }else{
                        mui.toast(data.message);
                    }
                }
            });
        } else {
            //消失消息框
            mui.toast('请输入用户名和密码',{
                duration: 500
            });

        }


    });
}