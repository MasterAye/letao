$(function () {
    getUserMessage();
    exitLogin();

});

function getUserMessage() {
    $.ajax({
        url: '/user/queryUserMessage',
        success: function (data) {
            console.log(data);
            if (data.error) {
                window.location.href = 'login.html';
            } else {
                $('.username').html(data.username)
                $('.mobile').html(data.mobile);
            }
        }
    });

}

//推出登录
function exitLogin() {
    $('.btn-exit').on('click', function () {
        $.ajax({
            url: '/user/logout',
            success: function (data) {
                mui.toast('推出成功');
                window.location.href = 'login.html';
            }
        });
    });
}