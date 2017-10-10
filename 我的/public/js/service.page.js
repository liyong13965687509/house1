/**
 * Author:LIYONG
 * Date:2017-9-28
 * 构造函数
 * @constructor
 */
function Service() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.ACTIVE = arguments['ACTIVE'] ? arguments['ACTIVE'] : 'active';
    this.PAGE_SIZE = arguments['PAGE_SIZE'] ? arguments['PAGE_SIZE'] : 10;
    this.PAGE_INDEX = arguments['PAGE_INDEX'] ? arguments['PAGE_INDEX'] : 1;
    this.DATA_VALUE = arguments['DATA_VALUE'] ? arguments['DATA_VALUE'] : '';
    this.TAB_BTN = arguments['TAB_BTN'] ? arguments['TAB_BTN'] : '.tab-bar li';
    this.BTN_DETAIL = arguments['BTN_DETAIL'] ? arguments['BTN_DETAIL'] : '.btn-detail';
    this.BTN_REPLY = arguments['BTN_REPLY'] ? arguments['BTN_REPLY'] : '.btn-reply';
    this.ABOUT_IMG = arguments['ABOUT_IMG'] ? arguments['ABOUT_IMG'] : '.about-img';
    this.PANEL_IMG = arguments['PANEL_IMG'] ? arguments['PANEL_IMG'] : '.panel-img';
    this.INDEX = arguments['INDEX'] ? arguments['INDEX'] : 'INDEX';
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        BIND_DEVICES: '/devices',
    }

    this.init();
}

/**
 * Author:LIYONG
 * Date:2017-9-28
 * 初始化
 * @returns {service}
 */
Service.prototype.init = function () {
    ComponentsPickers.init();
    // this.scaling();
    this.navChange();
    this.btnDetailClick();
    this.selectObj();
    return this;
}
/**
 *  * Author:LIYONG
 * Date:2017-9-28
 * 参数
 * @returns {*}
 */
Service.prototype.getParams = function () {
var params=null;
var _this=this;
    switch (name){
        case this.API_CONFIG.BIND_DEVICES:

            break;
    }

    return params;
}

/**
 * Author:LIYONG
 * Date:2017-9-28
 * 图片缩放
 * @returns {service}
 */
// Service.prototype.scaling = function () {
//     $(document).on('click', '.panel .row-image img', function () {
//         $(this).css('transform', 'scale(1.34286) translate(0px, 20px)');
//     })
//     $( '.panel .row-image img').dblclick(function () {
//         $(this).css('transform', 'scale(1) translate(0px, 0px)');
//     })
//
//     $(document).on('click', '.panel .max-image img', function () {
//         $(this).fadeToggle(400);
//     })
//     return this;
// }

/**
 * Author:LIYONG
 * Date:2017-9-28
 * 左侧 竖tab
 * @returns {Service}
 */
Service.prototype.navChange = function () {
    this.devicesApply();
    var _this = this;
    $(document).on('click', this.TAB_BTN, function () {
        _this.INDEX=$(this).index();
        // $(_this.TAB_BTN).removeClass(_this.ACTIVE);
        $(this).addClass(_this.ACTIVE).siblings(_this.TAB_BTN).removeClass(_this.ACTIVE);
        $('.right-header .header-item').eq( _this.INDEX).removeClass('hide')
            .siblings('.header-item').addClass('hide');
        switch (_this.INDEX) {
            case 0:
                _this.devicesApply();
                break;
            case 1:
                _this.feedback();
                break;
            case 2:
                _this.informWarm();
                break;
        }

    });
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-28
 *维修申请
 * @returns {Service}
 */
Service.prototype.devicesApply = function () {
    // var params = this.getParams(this.API_CONFIG.BIND_DEVICES);
    // this.ajaxRequestBindfeedback(params);
    var _this=this;
    var JSON_DATA=[{State:'已處理',Device:'冰箱',Fault:'漏返回的叫饭夫户籍附近的回复水',
        Room:'101',Name:'赵奕欢',Phone:'18852369631',Date:'2017-09-28 10:30-11:30'},
        {State:'已處理',Device:'冰箱',Fault:'漏返回的叫饭夫户籍附近的回复水',
            Room:'101',Name:'赵奕欢',Phone:'18852369631',Date:'2017-09-28 10:30-11:30'}];
    var TEMP_HTML = JSON_DATA.length != 0 ? _this.devicesApplyTemplate(JSON_DATA) : webApp['NO_RESULT'];
    $(".main .table-body").html(TEMP_HTML);
    return this;
}

/**
 * * Author:LIYONG
 * Date:2017-9-28
 *意见反馈
 * @returns {Service}
 */
Service.prototype.feedback = function () {
    // var params = this.getParams(this.API_CONFIG.BIND_DEVICES);
    // this.ajaxRequestBindDevicesApply(params);
    var _this=this;
    var JSON_DATA=[{State:'待回复',Type:'软件功能',Content:'漏返回的叫饭夫户籍附近的回复水',
       Name:'赵奕欢',Phone:'18852369631',Date:'2017-09-28 10:30-11:30'},
        {State:'待回复',Type:'软件功能',Content:'漏返回的叫饭夫户籍附近的回复水',
            Name:'赵奕欢',Phone:'18852369631',Date:'2017-09-28 10:30-11:30'}];
    var TEMP_HTML = JSON_DATA.length != 0 ? _this.feedBackTemplate(JSON_DATA) : webApp['NO_RESULT'];
    $(".main .table-body").html(TEMP_HTML);
    return this;
}

/**
 * * Author:LIYONG
 * Date:2017-9-28
 *通知提醒
 * @returns {Service}
 */
Service.prototype.informWarm = function () {
    // var params = this.getParams(this.API_CONFIG.BIND_DEVICES);
    // this.ajaxRequestBindInformWarm(params);
    var _this=this;
    var JSON_DATA=[{Type:'系统通知',Content:'漏返回的叫饭夫户籍附近的回复水',
        Object:'赵奕欢',Time:'2017-09-28 10:30-11:30',Name:'李勇'},
        {Type:'系统通知',Content:'冰箱漏水，不能继续使用，请尽快来修',
            Object:'赵奕欢',Time:'2017-09-28 10:30-11:30',Name:'李勇'}];
    var TEMP_HTML = JSON_DATA.length != 0 ? _this.informWarmTemplate(JSON_DATA) : webApp['NO_RESULT'];
    $(".main .table-body").html(TEMP_HTML);
    return this;
}



/**
 * Author:LIYONG
 * Date:2017-9-27
 * 维修申请
 * @param params
 * @returns {Service}
 */
Service.prototype.ajaxRequestBindDevicesApply = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_DEVICES'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.PAGINATION = new Pagination({
                    PAGINATION: '#Main',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG.BIND_DEVICES);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestChangePageDevices(params);
                    }
                });
                var TEMP_HTML = JSON_DATA.length != 0 ? _this.feedbackTemplate(JSON_DATA) : webApp['NO_RESULT'];
                $(".main .table-body").html(TEMP_HTML);
            } else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (e) {
            if (e.readyState > 0) {
                messageBox.show("错误", e, MessageBoxButtons.OK, MessageBoxIcons.error);
            } else {
                messageBox.show("错误", "网络异常，请检查网络 ！", MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        }
    });
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-27
 *意见反馈
 * @param params
 * @returns {Service}
 */
Service.prototype.ajaxRequestBindfeedback = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_DEVICES'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.PAGINATION = new Pagination({
                    PAGINATION: '#Main',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG.BIND_DEVICES);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestChangePageDevices(params);
                    }
                });
                var TEMP_HTML = JSON_DATA.length != 0 ? _this.feedbackTemplate(JSON_DATA) : webApp['NO_RESULT'];
                $(".main .table-body").html(TEMP_HTML);
            } else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (e) {
            if (e.readyState > 0) {
                messageBox.show("错误", e, MessageBoxButtons.OK, MessageBoxIcons.error);
            } else {
                messageBox.show("错误", "网络异常，请检查网络 ！", MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        }
    });
    return this;
}

/**
 *通知提醒
 * @param params
 * @returns {Service}
 */
Service.prototype.ajaxRequestBindInformWarm = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_DEVICES'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.PAGINATION = new Pagination({
                    PAGINATION: '#Main',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG.BIND_DEVICES);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestChangePageDevices(params);
                    }
                });
                var TEMP_HTML = JSON_DATA.length != 0 ? _this.informWarmTemplate(JSON_DATA) : webApp['NO_RESULT'];
                // var TEMP_HTML = _this.informWarmTemplate(JSON_DATA);
                $(".main .table-body").html(TEMP_HTML);
            } else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (e) {
            if (e.readyState > 0) {
                messageBox.show("错误", e, MessageBoxButtons.OK, MessageBoxIcons.error);
            } else {
                messageBox.show("错误", "网络异常，请检查网络 ！", MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        }
    });
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-27
 *维修申请 模板
 * @param params
 * @returns {string}
 */
Service.prototype.devicesApplyTemplate= function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_CLASS = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_CLASS = i >= 1 ? " visible-xs visible-sm" : "";
        var TEMP_CAUSE='<p class="column-content">'+ JSON_DATA['Fault'] + '</p><div class="column-float">'+JSON_DATA['Fault']+'</div>';
        var TEMP_FAULT=JSON_DATA['Fault'].length>=10?TEMP_CAUSE:JSON_DATA['Fault'];
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_CLASS + ' row">'
            + '<div class="column col-xs-12 col-md-1">处理状态</div><div class="column col-xs-12 col-md-1">维修设备</div>'
            + '<div class="column col-xs-12 col-md-1">故障原因</div><div class="column col-xs-12 col-md-1">物业房号</div>'
            + '<div class="column col-xs-12 col-md-1">姓名</div><div class="column col-xs-12 col-md-3">手机号</div>'
            + '<div class="column col-xs-12 col-md-3">维修日期</div><div class="column col-xs-12 col-md-1">操作</div>'
            + '</div></div><div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['State'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Device'] + '</div>'
            + '<div class="column col-xs-12 col-md-1 column-fault">' + TEMP_FAULT + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Room'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Name'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Phone'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Date'] + '</div><div class="column col-xs-12 col-md-1">'
            + '<a data-uuid="' + JSON_DATA['UUID'] + '" data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-detail">查看</a>'
            + '</div></div></div></div></div>';
    }


    return TEMP_HTML;
}

/**
 * Author:LIYONG
 * Date:2017-9-27
 *意见反馈 模板
 * @param params
 * @returns {string}
 */
Service.prototype.feedBackTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_CLASS = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        var TEMP_CAUSE='<p class="column-content">'+ JSON_DATA['Content'] + '</p><div class="column-float">'+JSON_DATA['Content']+'</div>';
        var TEMP_FAULT=JSON_DATA['Content'].length>=10?TEMP_CAUSE:JSON_DATA['Content'];
        TEMP_CLASS = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_CLASS + ' row">'
            + '<div class="column col-xs-12 col-md-1">回复状态</div><div class="column col-xs-12 col-md-1">反馈类型</div>'
            + '<div class="column col-xs-12 col-md-2">反馈内容</div>'
            + '<div class="column col-xs-12 col-md-1">姓名</div><div class="column col-xs-12 col-md-3">手机号</div>'
            + '<div class="column col-xs-12 col-md-3">反馈时间</div><div class="column col-xs-12 col-md-1">操作</div>'
            + '</div></div><div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['State'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-2 column-fault">' +TEMP_FAULT + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Name'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Phone'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Date'] + '</div><div class="column col-xs-12 col-md-1">'
            + '<a data-uuid="' + JSON_DATA['UUID'] + '" data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-reply">回复</a>'
            + '</div></div></div></div></div>';
    }

    return TEMP_HTML;
}

/**
 * Author:LIYONG
 * Date:2017-9-27
 *通知提醒 模板
 * @param params
 * @returns {string}
 */
Service.prototype.informWarmTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_CLASS = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        var TEMP_CAUSE='<p class="column-content">'+ JSON_DATA['Content'] + '</p><div class="column-float">'+JSON_DATA['Content']+'</div>';
        var TEMP_FAULT=JSON_DATA['Content'].length>=10?TEMP_CAUSE:JSON_DATA['Content'];
        TEMP_CLASS = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_CLASS + ' row">'
            + '<div class="column col-xs-12 col-md-2">类型</div><div class="column col-xs-12 col-md-2">内容</div>'
            + '<div class="column col-xs-12 col-md-2">对象</div><div class="column col-xs-12 col-md-2">时间</div>'
            + '<div class="column col-xs-12 col-md-2">创建人</div><div class="column col-xs-12 col-md-2">操作</div>'
            + '</div></div><div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-2 column-fault">' +TEMP_FAULT + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Object'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Time'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Name'] + '</div><div class="column col-xs-12 col-md-2">'
            + '<a data-uuid="' + JSON_DATA['UUID'] + '" data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-delete">删除</a>'
            + '</div></div></div></div></div>';
    }
    return TEMP_HTML;
}


/**
 * Author:LIYONG
 * Date:2017-9-28
 *  点击查看
 * @returns {Service}
 */
Service.prototype.btnDetailClick = function () {
    var _this = this;
    $(document).on('click', this.BTN_DETAIL, function () {
        var that = this;
        // var SELECTOR = _this.TAB_BTN + '.' + _this.ACTIVE;
        // var TEMP_INDEX = parseInt($(SELECTOR).index());
        // _this.DATA_VALUE = $(this).attr('data-value').trim();
        mp.manualShowPanel({
            index: 0,
            element: '.panel-sm',
            complete: function () {
                // _this.switchShowDetail({
                //     that: that,
                //     index: TEMP_INDEX
                // });
            }
        });
    });

    $(document).on('click', this.BTN_REPLY, function () {
        mp.manualShowPanel({
            index: 1,
            element: '.panel-sm',
            complete: function () {

            }
        });
    })

    $(document).on('click', this.ABOUT_IMG, function () {
        $(_this.PANEL_IMG).find('.panel-content').animate({
            marginTop: '-200px',
        }, 400);
        $(_this.PANEL_IMG).toggleClass('hide');

    })


    $(document).on('click', this.PANEL_IMG, function () {
        $(this).find('.panel-content').animate({
            marginTop: '-500px',
        }, 400);

        webApp.TIMER = setTimeout(function () {
            $(_this.PANEL_IMG).toggleClass('hide');
        }, 350);

    })

    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-29
 *  通知新增
 * @returns {Service}
 */
Service.prototype.informAdd=function () {
    mp.manualShowPanel({
        index: 2,
        element: '.panel-sm',
        complete: function () {
            // _this.switchShowDetail({
            //     that: that,
            //     index: TEMP_INDEX
            // });
        }
    });
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-29
 *  选择通知对象
 * @returns {Service}
 */
Service.prototype.selectObj=function () {
    $(document).on('click','.form-radio .radio',function () {
        $('.form-radio .radio').toggleClass('radio-selected');
        if($('#radio-part').hasClass('radio-selected')){
            $('.selecte-obj').addClass('add-obj');
        }else{
            $('.selecte-obj').removeClass('add-obj');
        }
    })

    return this;
}
var sp = new Service();