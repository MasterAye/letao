


$(function(){
    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();
});

function addHistory(){
    //点击搜索按钮,添加当前搜索内容到本地存储里面
    $('.btn-search').on('click',function(){
        // console.log('我被点击了');
        var search = $('.search-input').val();
        if (!search) {
            alert('请输入要搜索的商品');
            return;
        }
        // console.log(search);

        var historyData = localStorage.getItem('historyData');

        if(historyData){
            historyData = JSON.parse(historyData);
        }else{
            historyData = [];
        }
        if(historyData.indexOf(search) == -1){
            historyData.push(search);
            localStorage.setItem('historyData',JSON.stringify(historyData));

            queryHistory();
        }
        $('.search-input').val('');
        window.location.href="productlist.html?search="+search;
    });
}

function queryHistory() {
    var historyData = localStorage.getItem('historyData');
    if (historyData) {
        historyData = JSON.parse(historyData);
    }else {
        historyData = [];
    }
    // 如果要反转 就调用数组反转方法
    historyData = historyData.reverse();

    var html = template('getHistoryTmp', {'rows': historyData});
    $('.mui-table-view').html(html);
}

function deleteHistory(){
    $('.search-history-list').on('click','i',function(){
        // console.log('我被点击');
        var history = $(this).parent().data('history');
        var historyData = localStorage.getItem('historyData');

        if(historyData){
            historyData = JSON.parse(historyData);
        }else{
            historyData = [];
        }
        var historyIndex = historyData.indexOf(history + "");
        historyData.splice(historyIndex,1);

        localStorage.setItem('historyData',JSON.stringify(historyData));
        queryHistory();
    });
}
function clearHistory() {
    $('.btn-clear').on('click',function(){
        localStorage.setItem('historyData','');
        queryHistory();
    });

}

