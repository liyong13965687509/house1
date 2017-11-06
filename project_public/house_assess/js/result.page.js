/**
 * 构造函数
 * Author:liyong
 * Date:2017-11-02
 * @constructor
 */
function ResultPage() {
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        RESULT: "http://service.xpchina.com/ashx/AssessAjax.ashx",
    }
    this.init();
}
/**
 *参数
 * Author:liyong
 * Date:2017-11-02
 * @param name
 * @returns {*}
 */
ResultPage.prototype.getParams = function (name) {
    var params = null,
        _this = this;
    switch (name) {
        case this.API_CONFIG['RESULT']:
            params = {
                method: "sel_assess",
                row_id: localStorage.row_id,
                reg_id: "18"
            };
            break;
    }
    return params;
}


/**
 * 初始化
 * Author:liyong
 * Date:2017-11-01
 * @returns {ResultPage}
 */
ResultPage.prototype.init = function () {
    this.assessResult();
    return this;
}
/**
 * 查看评估
 * Author:liyong
 * Date:2017-11-02
 * @returns {ResultPage}
 */
ResultPage.prototype.assessResult = function () {
    var params = this.getParams(this.API_CONFIG['RESULT']);
    this.ajaxRequestAssessResult(params);
    return this;
}
/**
 * ajax
 * Author:liyong
 * Date:2017-11-02
 * @returns {ResultPage}
 */
ResultPage.prototype.ajaxRequestAssessResult = function (params) {
    $.ajax({
        type: "POST",
        url: this.API_CONFIG['RESULT'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            var TEMP_HTML='';
            for(var key in data){
                $("#"+key).html(data[key]);
            }
           for(var i=0;i<data['est'].length;i++){
                var TEMP_EST=data['est'][i];
               TEMP_HTML +=' <li class="item-house"><a href="http://www.baidu.com"> ' +
                   '<div class="item-inside clearfix row"> <div class="item-img col-md-5">' +
                   '<img src="images/loading.png" data-original="http://'+TEMP_EST["est_picture"]+'" data-loaded="false"/> </div>' +
               ' <div class="item-info col-md-7"><h2 class="item-title ellipsis multiple">'+TEMP_EST["est_name"]+'</h2>' +
               '<p class="item-param"> <span>'+TEMP_EST["est_reg_size_p"]+'m²</span>' +
               '<span>'+TEMP_EST["est_div1"]+'室'+TEMP_EST["est_div2"]+'厅'+TEMP_EST["est_div3"]+'卫</span>' +
               ' <span>'+TEMP_EST["est_sit_txt"]+'</span> </p> <div class="item-amount clearfix">' +
               '<p class="item-addr ellipsis col-md-8">'+TEMP_EST["est_name"]+"&nbsp;"+ TEMP_EST["zip_name"]+'</p>' +
               '<span class="item-total col-md-4"><b>'+TEMP_EST["est_sell_price"]+'</b>万</span></div> </div> </div> </a> </li>'
           }
           $('.item-box').html(TEMP_HTML);
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            alert("资源请求失败！");
        }

    });
    return this;
}



function Lazyload(obj) {
    this.timer = obj.timer ? obj.timer : null;
    this.loadImgCount = obj.loadImgCount ? obj.loadImgCount : 5;
    this.loadImg = obj.loadImg ? obj.loadImg : "images/loading.png";
    this.element = obj.element ? obj.element : "img[src='" + this.loadImg + "']";

    this.loading();
}
/**
 * BEGIN 加载方法
 * Author:PengLunJian
 * Date:2017-06-06
 * @returns {Lazyload}
 */
Lazyload.prototype.loading = function () {
    var _protoObj_ = this;
    this.timer = setInterval(function () {
        $(_protoObj_.element).each(function () {
            var _this = this;
            this.iWidth = $(window).outerWidth();
            this.iHeight = $(window).outerHeight();
            this.dataLoaded = "false" == $(this).attr("data-loaded");
            this.iTop = $(this).offset().top - $(window).scrollTop();
            this.iLeft = $(this).offset().left - $(window).scrollLeft();
            this.offsetYIN = (this.iTop >= 0 && this.iTop <= this.iHeight);
            this.offsetXIN = (this.iLeft >= 0 && this.iLeft <= this.iWidth);
            if (this.offsetXIN && this.offsetYIN && this.dataLoaded) {
                this.tempImgObj = new Image();
                this.tempImgObj.src = $(this).attr("data-original");
                $(this.tempImgObj).on("load", function () {
                    $(_this).attr("data-loaded", "true");
                    $(_this).css("opacity", 0);
                    $(_this).attr("src", this.src);
                    $(_this).animate({"opacity": 1}, 300);
                    _this.tempImgObj = null;
                });
                $(this.tempImgObj).on("error", function () {
                    $(_this).attr("data-loaded", "true");
                    _this.tempImgObj = null;
                });
            }
        });
    }, 100);
    return _protoObj_;
}

$(function () {
    new Lazyload({
        loadImgCount: 5
    });
})



var result = new ResultPage();