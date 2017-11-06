/**
 * 构造函数
 * Author:liyong
 * Date:2017-11-01
 * @constructor
 */
function SelectPage() {
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        DIM: 'http://service.xpchina.com/ashx/AssessAjax.ashx',
    }
    this.init();
}


/**
 * Author:liyong
 * Date:2017-11-01
 * @returns {SelectPage}
 */
SelectPage.prototype.init = function () {
    this.ishistory();
    this.keyup();
    this.close();
    this.selected();
    this.clearHistory();
    return this;
}
/**
 *参数
 * Author:liyong
 * Date:2017-11-02
 * @param name
 * @returns {*}
 */
SelectPage.prototype.getParams = function (name) {
    var params = null,
        _this = this;
    switch (name) {
        case this.API_CONFIG['DIM']:
            params = {
                method: 'sel_plot',
                keyword: $('#dim').val(),
                reg_id: '18',
                franCode: '',
                city_no: '520'
            };
            break;
    }
    ;
    return params;
}

/**
 * 判断有无搜索历史
 * * Author:liyong
 * Date:2017-11-03
 * @returns {SelectPage}
 */
var searchArr = [];
SelectPage.prototype.ishistory = function () {
    //定义一个search的，判断浏览器有无数据存储（搜索历史）
    if (sessionStorage.search) {
   //如果有，转换成 数组的形式存放到searchArr的数组里（sessionStorage以字符串的形式存储，所以要把它转换成数组的形式）
        var optionss = sessionStorage.getItem('search');
        searchArr = JSON.parse(optionss);
    }
//把存储的数据显示出来作为搜索历史
    this.mapSearchArr();
    return this;
}
/**
 * 历史搜索列表展示
 * * Author:liyong
 * Date:2017-11-03
 * @returns {SelectPage}
 */
SelectPage.prototype.mapSearchArr = function () {
    var TEMP_HTML = "";
    for (var i = 0; i < searchArr.length; i++) {
        TEMP_HTML += "<li data-value='" + searchArr[i]["row_id"] + "'>" +
            "<a href='house_assess.html'>" +
            searchArr[i]["plot_name"] +
            "</a><img src='images/close.png' alt=''></li>";
    }
    $("#plot-list").html(TEMP_HTML);
    return this;
}
/**
 * 搜索时键盘弹起
 * Author:liyong
 * Date:2017-11-02
 * @returns {SelectPage}
 */
SelectPage.prototype.keyup = function () {
    var _this = this;
    $("#dim").keyup(function () {
        _this.dim();
    })
}

/**
 * 模糊匹配
 * Author:liyong
 * Date:2017-11-02
 * @returns {SelectPage}
 */
SelectPage.prototype.dim = function () {
    var params = this.getParams(this.API_CONFIG['DIM']);
    this.ajaxRequestDim(params);
    return this;
}
/**
 *模糊匹配 ajax
 * Author:liyong
 * Date:2017-11-02
 * @param params
 * @returns {ContractPage}
 */
SelectPage.prototype.ajaxRequestDim = function (params) {
    $.ajax({
        type: "POST",
        url: this.API_CONFIG['DIM'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            var JSON_DATA = data, TEMP_HTML;
            TEMP_HTML = '';
            for (var i = 0; i < JSON_DATA.length; i++) {
                TEMP_HTML += "<li data-value='" + JSON_DATA[i]['row_id'] + "'>" +
                    "<a href='house_assess.html'>"
                    + JSON_DATA[i]['plot_name'] +
                    "</a><img src='images/close.png' alt=''></li>";
            }
            $("#plot-list").html(TEMP_HTML);

        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            alert("资源请求失败！");
        }
    });
    return this;
}
/**
 * 清除某个历史搜索
 * * Author:liyong
 * Date:2017-11-02
 * @returns {SelectPage}
 */
SelectPage.prototype.close = function () {
    $("#plot-list").on("click", "li img", function () {
        $(this).parent("li").remove();
        // 清除数组中的这一项 返回新的数组
        for (var i = 0; i < searchArr.length; i++) {
            if (searchArr[i]['plot_name'] == $(this).parent("li").find("a").html().trim()) {
                //splice方法会改变数组长度，当减掉一个元素后，后面的元素都会前移，因此需要相应减少i的值
                searchArr.splice(i, 1);
                i--;
            }
            // 将新的数组存到sessionStorage 更新sessionStorage
            sessionStorage.search = JSON.stringify(searchArr);
        }
    })
    return this;
}
/**
 * 清除所有历史搜索
 * * Author:liyong
 * Date:2017-11-02
 * @returns {SelectPage}
 */
SelectPage.prototype.clearHistory = function () {
    $(".history-clear").click(function () {
        $(this).prev().find("ul").html('');
        // 清空数组
        searchArr=[];
        // 清空sessionStorage
        sessionStorage.removeItem('search');
    })
    return this;
}

/**
 * 选择某个小区
 * * Author:liyong
 * Date:2017-11-02
 * @returns {SelectPage}
 */
SelectPage.prototype.selected = function () {
    var _this = this;
    $("#plot-list").on("click", "li a", function () {
        sessionStorage.setItem('plot_name', $(this).html().trim());
        // 存储选中的小区名称和row_id
        var plot = {
            plot_name: $(this).html().trim(),
            row_id: $(this).parent("li").attr("data-value").trim()
        };

        //去重 更新数组
        _this.killRepeat(plot);
        //然后再把搜索内容显示出来
        //    _this.mapSearchArr();
    })
    return this;
}




/**
 * 去重
 * * Author:liyong
 * Date:2017-11-03
 * @returns {SelectPage}
 */
SelectPage.prototype.killRepeat = function (obj) {
    var kill = 0;
    for (var i = 0; i < searchArr.length; i++) {
        if (obj['plot_name'] === searchArr[i]['plot_name']) kill++;
    }
    if (kill < 1) searchArr.push(obj);
    //去重 更新sessionStorage
    sessionStorage.search = JSON.stringify(searchArr);
    return this;
}


var select = new SelectPage();
