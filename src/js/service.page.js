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
    this.DATA_REPLY = arguments['DATA_REPLY'] ? arguments['DATA_REPLY'] : '';
    this.TAB_BTN = arguments['TAB_BTN'] ? arguments['TAB_BTN'] : '.tab-bar li';
    this.BTN_DETAIL = arguments['BTN_DETAIL'] ? arguments['BTN_DETAIL'] : '.btn-detail';
    this.BTN_REPLY = arguments['BTN_REPLY'] ? arguments['BTN_REPLY'] : '.btn-reply';
    this.ABOUT_IMG = arguments['ABOUT_IMG'] ? arguments['ABOUT_IMG'] : '#img-list .about-img';
    this.PANEL_IMG = arguments['PANEL_IMG'] ? arguments['PANEL_IMG'] : '.panel-img';
    this.BG_IMG = arguments['BG_IMG'] ? arguments['BG_IMG'] : '.panel-bg-img';
    this.CHOOSED = arguments['CHOOSED'] ? arguments['CHOOSED'] : '.choosed';
    this.CHECK_ALL = arguments['CHECK_ALL'] ? arguments['CHECK_ALL'] : '.check-all';
    this.SEL_PEOPLE = arguments['SEL_PEOPLE'] ? arguments['SEL_PEOPLE'] : '.selected-people';
    this.SELECTED = arguments['SELECTED'] ? arguments['SELECTED'] : '.selected-people.selected';
    this.PANEL_MASK = arguments['PANEL_MASK'] ? arguments['PANEL_MASK'] : '.panel-mask';
    this.INDEX = arguments['INDEX'] ? arguments['INDEX'] : 'INDEX';

    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        BIND_DEVICES: '/devices',
        APPLY_BASE: '/service-apply/base',
        APPLY_LIST: '/service-apply/list',
        APPLY_DETAIL: '/service-apply',
        APPLY_REPLY: '/service-apply/reply',
        SUGGESTION_BASE: '/suggestion/base',
        SUGGESTION_LIST: '/suggestion/list',
        SUGGESTION_DETAIL: '/suggestion',
        SUGGESTION_REPLY: '/suggestion/reply',

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
    this.navChange();
    this.btnDetailClick();
    this.selectObj();
    this.applyBase();
    this.applyList();
    this.applyDetail();
    this.informPeople();
    this.suggestionBase();
    this.suggestionDetail();
    return this;
}
/**
 *  * Author:LIYONG
 * Date:2017-9-28
 * 参数
 * @returns {*}
 */
Service.prototype.getParams = function (name) {
    var params = null;
    var _this = this;
    switch (name) {
        case this.API_CONFIG['APPLY_BASE']:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.API_CONFIG['APPLY_LIST']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                applyDate: $('#applyDate').val().trim(),
                pageIndex: this.PAGE_INDEX,
                pageSize: this.PAGE_SIZE,
                buildingCharId: $("#Buildings .active").length > 0 ? $("#Buildings .active").attr("data-value") : "",
                state: $("#States .active").length > 0 ? $("#States .active").attr("data-value") : 0,
                key: $('#key').val().trim(),
            };
            break;
        case this.API_CONFIG['APPLY_DETAIL']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                serviceApplyCharId: this.DATA_VALUE
            };
            break;
        case this.API_CONFIG['APPLY_REPLY']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                serviceApplyCharId: this.DATA_VALUE,
                replyEmployeeCharId: localStorage.getItem("employeeCharId"),
                reply: $('#Reply').val().trim()
            };
            break;
        case this.API_CONFIG['SUGGESTION_BASE']:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.API_CONFIG['SUGGESTION_LIST']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                suggestDate: $('#suggestDate').val().trim(),
                pageIndex: this.PAGE_INDEX,
                pageSize: this.PAGE_SIZE,
                type: $("#Types .active").length > 0 ? $("#Types .active").attr("data-value") : 0,
                state: $(".States .active").length > 0 ? $(".States .active").attr("data-value") : 0,
                key: $('.key').val().trim()
            };
            break;
        case this.API_CONFIG['SUGGESTION_DETAIL']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                suggestionCharId: this.DATA_REPLY,
            };
            break;
        case this.API_CONFIG['SUGGESTION_REPLY']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                suggestionCharId: this.DATA_REPLY,
                replyEmployeeCharId: localStorage.getItem("employeeCharId"),
                reply: $('#Reply_detail').val().trim()
            };
            break;

    }
    return params;
}


/**
 * Author:LIYONG
 * Date:2017-9-28
 * 左侧 竖tab
 * @returns {Service}
 */
Service.prototype.navChange = function () {
    var _this = this;
    $(document).on('click', this.TAB_BTN, function () {
        _this.INDEX = $(this).index();
        // $(_this.TAB_BTN).removeClass(_this.ACTIVE);
        $(this).addClass(_this.ACTIVE).siblings(_this.TAB_BTN).removeClass(_this.ACTIVE);
        $('.right-header .header-item').eq(_this.INDEX).removeClass('hide')
            .siblings('.header-item').addClass('hide');
        switch (_this.INDEX) {
            case 0:
                _this.applyList();
                break;
            case 1:
                _this.suggestionList();
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
 * Date:2017-10-10
 *维修申请基础数据绑定
 * @returns {Service}
 */
Service.prototype.applyBase = function () {
    var params = this.getParams(this.API_CONFIG['APPLY_BASE']);
    this.ajaxRequestApplyBase(params);
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-10-10
 *维修申请基础数据绑定ajax
 * @returns {Service}
 */
Service.prototype.ajaxRequestApplyBase = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['APPLY_BASE'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'], TEMP_HTML;
                for (KEY in JSON_DATA) {
                    TEMP_HTML = '';
                    for (var i = 0; i < JSON_DATA[KEY].length; i++) {
                        TEMP_HTML += "<li data-value='" + JSON_DATA[KEY][i]['Key'] + "' class='drop-option'>" + JSON_DATA[KEY][i]['Value'] + "</li>";
                    }
                    $("#" + KEY).html(TEMP_HTML);
                }
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
 * Date:2017-10-13
 *意见反馈基础数据绑定
 * @returns {Service}
 */
Service.prototype.suggestionBase = function () {
    var params = this.getParams(this.API_CONFIG['SUGGESTION_BASE']);
    this.ajaxRequestSuggestionBase(params);
    return this;
}
/**
 * Author:LIYONG
 * Date:2017-10-13
 *意见反馈基础数据绑定ajax
 * @returns {Service}
 */
Service.prototype.ajaxRequestSuggestionBase = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['SUGGESTION_BASE'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'], TEMP_HTML;
                for (KEY in JSON_DATA) {
                    TEMP_HTML = '';
                    for (var i = 0; i < JSON_DATA[KEY].length; i++) {
                        TEMP_HTML += "<li data-value='" + JSON_DATA[KEY][i]['Key'] + "' class='drop-option'>" + JSON_DATA[KEY][i]['Value'] + "</li>";
                    }
                    $("#" + KEY).html(TEMP_HTML);
                    $("." + KEY).html(TEMP_HTML);
                }
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
 * Date:2017-10-10
 *维修申请列表
 * @returns {Service}
 */
Service.prototype.applyList = function () {
    var params = this.getParams(this.API_CONFIG['APPLY_LIST']);
    this.ajaxRequestApplyList(params);
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-10-10
 *维修申请列表ajax
 * @returns {Service}
 */
Service.prototype.ajaxRequestApplyList = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['APPLY_LIST'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'], TEMP_HTML;
                _this.PAGINATION = new Pagination({
                    PAGINATION: '#Main',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG['APPLY_LIST']);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestApplyLists(params);
                    }
                });
                TEMP_HTML = JSON_DATA.length != 0 ? _this.devicesApplyTemplate(JSON_DATA) : webApp['NO_RESULT'];
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
 * Date:2017-10-10
 *维修申请列表ajaxs
 * @returns {Service}
 */
Service.prototype.ajaxRequestApplyLists = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['APPLY_LIST'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'], TEMP_HTML;
                TEMP_HTML = JSON_DATA.length != 0 ? _this.devicesApplyTemplate(JSON_DATA) : webApp['NO_RESULT'];
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
 * Date:2017-10-13
 *意见反馈列表
 * @returns {Service}
 */
Service.prototype.suggestionList = function () {
    var params = this.getParams(this.API_CONFIG['SUGGESTION_LIST']);
    this.ajaxRequestSuggestionList(params);
    return this;
}
/**
 * Author:LIYONG
 * Date:2017-10-13
 *意见反馈列表ajax
 * @returns {Service}
 */
Service.prototype.ajaxRequestSuggestionList = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['SUGGESTION_LIST'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'], TEMP_HTML;
                _this.PAGINATION = new Pagination({
                    PAGINATION: '#Main',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG['SUGGESTION_LIST']);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestSuggestionLists(params);
                    }
                });

                TEMP_HTML = JSON_DATA.length != 0 ? _this.suggestionTemplate(JSON_DATA) : webApp['NO_RESULT'];
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
 * Date:2017-10-13
 *意见反馈列表ajaxs
 * @returns {Service}
 */
Service.prototype.ajaxRequestSuggestionLists = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['SUGGESTION_LIST'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'], TEMP_HTML;
                TEMP_HTML = JSON_DATA.length != 0 ? _this.suggestionTemplate(JSON_DATA) : webApp['NO_RESULT'];
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
 * Date:2017-10-10
 *维修申请详情
 * @returns {Service}
 */
Service.prototype.applyDetail = function () {
    var _this = this;
    $(document).on('click', this.BTN_DETAIL, function () {
        _this.DATA_VALUE = $(this).attr('data-value').trim();
        mp.manualShowPanel({
            index: 0,
            element: '.panel-sm',
            complete: function () {
                var params = _this.getParams(_this.API_CONFIG['APPLY_DETAIL']);
                _this.ajaxRequestApplyDetail(params);
            }
        });
    });

    return this;
}

/**
 * Author:LIYONG
 * Date:2017-10-10
 *维修申请详情ajax
 * @returns {Service}
 */
Service.prototype.ajaxRequestApplyDetail = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['APPLY_DETAIL'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'], TEMP_HTML = '';

                for (KEY in JSON_DATA) {
                    $('#' + KEY).html(JSON_DATA[KEY]);
                    $('#' + KEY).val(JSON_DATA[KEY]);
                }
                if (JSON_DATA['Reply']) {
                    $('.row-reply').removeClass('hide')
                } else {
                    $('.row-reply').addClass('hide')
                }


                var IMGS = JSON_DATA['Imgs'];
                for (var i = 0; i < IMGS.length; i++) {
                    TEMP_HTML += '<li class="about-img"><img src="' + IMGS[i] + '" alt=""></li>';
                }

                $('#img-list').html(TEMP_HTML);
                $('#max-img').html(TEMP_HTML);

                $('#RoomName').html(JSON_DATA['RoomName'] + '室');
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
 * Date:2017-10-13
 *意见反馈详情
 * @returns {Service}
 */
Service.prototype.suggestionDetail = function () {
    var _this = this;
    $(document).on('click', this.BTN_REPLY, function () {
        _this.DATA_REPLY = $(this).attr('data-value').trim();
        mp.manualShowPanel({
            index: 1,
            element: '.panel-sm',
            complete: function () {
                var params = _this.getParams(_this.API_CONFIG['SUGGESTION_DETAIL']);
                _this.ajaxRequestSuggestionDetail(params);
            }
        });
    });

    return this;
}

/**
 * Author:LIYONG
 * Date:2017-10-13
 *意见反馈详情ajax
 * @returns {Service}
 */
Service.prototype.ajaxRequestSuggestionDetail = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['SUGGESTION_DETAIL'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'], TEMP_HTML = '';
                for (KEY in JSON_DATA) {
                    $('#' + KEY + '_detail').html(JSON_DATA[KEY]);
                    $('#' + KEY + '_detail').val(JSON_DATA[KEY]);
                }
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
 * Date:2017-10-11
 *维修申请回复
 * @returns {Service}
 */
Service.prototype.applyReply = function () {
    var params = this.getParams(this.API_CONFIG['APPLY_REPLY']);
    this.ajaxRequestApplyReply(params);
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-10-11
 *维修申请回复AJAX
 * @returns {Service}
 */

Service.prototype.ajaxRequestApplyReply = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['APPLY_REPLY'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * Date:2017-10-13
 *意见反馈回复
 * @returns {Service}
 */
Service.prototype.suggestionReply = function () {
    var params = this.getParams(this.API_CONFIG['SUGGESTION_REPLY']);
    this.ajaxRequestSuggestionReply(params);
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-10-13
 *意见反馈回复AJAX
 * @returns {Service}
 */

Service.prototype.ajaxRequestSuggestionReply = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['SUGGESTION_REPLY'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * * Author:LIYONG
 * Date:2017-9-28
 *意见反馈
 * @returns {Service}
 */
Service.prototype.feedback = function () {
    // var params = this.getParams(this.API_CONFIG.BIND_DEVICES);
    // this.ajaxRequestBindDevicesApply(params);
    var _this = this;
    var JSON_DATA = [{
        State: '待回复', Type: '软件功能', Content: '漏返回的叫饭夫户籍附近的回复水',
        Name: '赵奕欢', Phone: '18852369631', Date: '2017-09-28 10:30-11:30'
    },
        {
            State: '待回复', Type: '软件功能', Content: '漏返回的叫饭夫户籍附近的回复水',
            Name: '赵奕欢', Phone: '18852369631', Date: '2017-09-28 10:30-11:30'
        }];
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
    var _this = this,TEMP_HTML='';
    // var JSON_DATA = [{
    //     Type: '系统通知', Content: '漏返回的叫饭夫户籍附近的回复水',
    //     Object: '赵奕欢', Time: '2017-09-28 10:30-11:30', Name: '李勇'
    // },
    //     {
    //         Type: '系统通知', Content: '冰箱漏水，不能继续使用，请尽快来修',
    //         Object: '赵奕欢', Time: '2017-09-28 10:30-11:30', Name: '李勇'
    //     }];
    var JSON_DATA='';
    if(JSON_DATA.length != 0 ){
        TEMP_HTML=_this.informWarmTemplate(JSON_DATA)
    }else{
        TEMP_HTML=webApp['NO_RESULT'];
        $('#Main').html('');
    }
    // var TEMP_HTML = JSON_DATA.length != 0 ? _this.informWarmTemplate(JSON_DATA) : webApp['NO_RESULT'];


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
                var TEMP_HTML = JSON_DATA.length == 0 ? _this.informWarmTemplate(JSON_DATA) : webApp['NO_RESULT'];
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
 * Date:2017-10-11
 *维修申请 模板
 * @param params
 * @returns {string}
 */
Service.prototype.devicesApplyTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_CLASS = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_CLASS = i >= 1 ? " visible-xs visible-sm" : "";
        var TEMP_CAUSE = '<p class="column-content">' + JSON_DATA['Description'] + '</p><div class="column-float">' + JSON_DATA['Description'] + '</div>';
        var TEMP_FAULT = JSON_DATA['Description'].length >= 10 ? TEMP_CAUSE : JSON_DATA['Description'];
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_CLASS + ' row">'
            + '<div class="column col-xs-12 col-md-1">处理状态</div><div class="column col-xs-12 col-md-1">维修设备</div>'
            + '<div class="col-xs-12 col-md-10"><div class="row"><div class="column col-xs-12 col-md-2">故障原因</div><div class="column col-xs-12 col-md-2">物业房号</div>'
            + '<div class="column col-xs-12 col-md-1">姓名</div><div class="column col-xs-12 col-md-2">手机号</div>'
            + '<div class="column col-xs-12 col-md-4">维修日期</div><div class="column col-xs-12 col-md-1">操作</div></div></div>'
            + '</div></div><div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['State'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['ServiceItem'] + '</div>'
            + '<div class="col-xs-12 col-md-10"><div class="row"><div class="column col-xs-12 col-md-2 column-fault">' + TEMP_FAULT + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['RoomName'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['CustomerName'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Phone'] + '</div>'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['Time'] + '</div><div class="column col-xs-12 col-md-1">'
            + '<a  data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-detail">查看</a>'
            + '</div></div></div></div></div></div></div>';
    }


    return TEMP_HTML;
}

/**
 * Author:LIYONG
 * Date:2017-10-13
 *意见反馈 模板
 * @param params
 * @returns {string}
 */
Service.prototype.suggestionTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_CLASS = '', TEMP_STATUS = '', TEMP_FAULT = '', TEMP_CAUSE = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_STATUS = JSON_DATA['IsReply'] == '待处理' ? '<div class="column col-xs-12 col-md-1 isReply">'
            : '<div class="column col-xs-12 col-md-1">';
        TEMP_CAUSE = '<p class="column-content">' + JSON_DATA['Content'] + '</p><div class="column-float">' + JSON_DATA['Content'] + '</div>';
        if (JSON_DATA['Content']) {
            TEMP_FAULT = JSON_DATA['Content'].length >= 10 ? TEMP_CAUSE : JSON_DATA['Content'];
        } else {
            TEMP_FAULT = JSON_DATA['Content'];
        }
        TEMP_CLASS = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_CLASS + ' row">'
            + '<div class="column col-xs-12 col-md-1">回复状态</div><div class="column col-xs-12 col-md-1">反馈类型</div>'
            + '<div class="column col-xs-12 col-md-2">反馈内容</div>'
            + '<div class="column col-xs-12 col-md-1">姓名</div><div class="column col-xs-12 col-md-3">手机号</div>'
            + '<div class="column col-xs-12 col-md-3">反馈时间</div><div class="column col-xs-12 col-md-1">操作</div>'
            + '</div></div><div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + TEMP_STATUS + JSON_DATA['IsReply'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-2 column-fault">' + TEMP_FAULT + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['CustomerName'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Phone'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['CreateTime'] + '</div><div class="column col-xs-12 col-md-1">'
            + '<a data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-reply">回复</a>'
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
        var TEMP_CAUSE = '<p class="column-content">' + JSON_DATA['Content'] + '</p><div class="column-float">' + JSON_DATA['Content'] + '</div>';
        var TEMP_FAULT = JSON_DATA['Content'].length >= 10 ? TEMP_CAUSE : JSON_DATA['Content'];
        TEMP_CLASS = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_CLASS + ' row">'
            + '<div class="column col-xs-12 col-md-2">类型</div><div class="column col-xs-12 col-md-2">内容</div>'
            + '<div class="column col-xs-12 col-md-2">对象</div><div class="column col-xs-12 col-md-3">时间</div>'
            + '<div class="column col-xs-12 col-md-2">创建人</div><div class="column col-xs-12 col-md-1">操作</div>'
            + '</div></div><div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-2 column-fault">' + TEMP_FAULT + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Object'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Time'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Name'] + '</div><div class="column col-xs-12 col-md-1">'
            + '<a data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-delete">删除</a>'
            + '</div></div></div></div></div>';
    }
    return TEMP_HTML;
}


/**
 * Author:LIYONG
 * Date:2017-9-28
 *  点击回复
 * @returns {Service}
 */
Service.prototype.btnDetailClick = function () {
    var _this = this;

    $(document).on('click', this.ABOUT_IMG, function () {
        var INDEX = $(this).index();
        $(_this.PANEL_IMG).find('.panel-content').css('transform', 'scale(1.0)');
        $(_this.PANEL_IMG).find('.panel-content').css('opacity', '1.0');
        $(_this.BG_IMG).removeClass('hide');
        $('#max-img .about-img').eq(INDEX).show()
            .siblings().hide();

    })


    $(document).on('click', this.PANEL_IMG, function () {
        $(this).find('.panel-content').css('transform', 'scale(0.0)');
        $(this).find('.panel-content').css('opacity', '0.0');
        $(_this.BG_IMG).addClass('hide');
    })

    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-29
 *  通知新增
 * @returns {Service}
 */
Service.prototype.informAdd = function () {
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
 * Date:2017-10-11
 *  选择通知对象
 * @returns {Service}
 */
Service.prototype.selectObj = function () {
    var _this = this;
    $(document).on('click', '.form-radio input[checked="checked"]', function () {
        $('.form-radio input[name="choose"]').removeClass('choosed');
    })
    $(document).on('click', '.form-radio input[name="notice"]', function () {
        $(this).parents('.col-xs-3').next().find('input[name="choose"]').addClass('choosed');
    })
    $(document).on('click', this.CHOOSED, function () {
        $('.panel-window .panel-content').css('margin-left', '-220px');
        $('.panel-window .panel-content').css('opacity', '1');
        $(_this.PANEL_MASK).removeClass('hide');
    })

    return this;
}
/**
 * Author:LIYONG
 * Date:2017-10-11
 *  选择被通知人
 * @returns {Service}
 */
Service.prototype.informPeople = function () {
    var _this = this;
    $(document).on('click', this.CHECK_ALL, function () {
        $(_this.SEL_PEOPLE).addClass('selected');
        $(this).addClass('selected');
    })


    $(document).on('click', this.SEL_PEOPLE, function () {
        $(this).toggleClass('selected');

        if ($('.selected').length - 1 != $(_this.SEL_PEOPLE).length) $(_this.CHECK_ALL).removeClass('selected');
        if ($('.selected').length == $(_this.SEL_PEOPLE).length) $(_this.CHECK_ALL).addClass('selected');
    })

    $(document).on('click', '.panel-mask,.pull-cancel,#confirm-select', function () {
        $('.panel-window .panel-content').css('margin-left', '-760px');
        $('.panel-window .panel-content').css('opacity', '0');
        $(_this.PANEL_MASK).addClass('hide');
    })

    return this;
}


/*
 * Author:LIYONG
 * Date:2017-10-12
 *  确认选择
 * @returns {Service}
 */
Service.prototype.confirmSelect = function () {
    var TEMP_HTML = '';
    var LENGTH = $(this.SELECTED).length;
    for (var i = 0; i < LENGTH; i++) {
        var name = $(this.SELECTED).eq(i).parents('.row-item').find('.column-name').html();
        var phone = $(this.SELECTED).eq(i).parents('.row-item').find('.column-phone').html();
        TEMP_HTML += (i < LENGTH - 1) ? name + '<' + phone + '>' + '、' : name + '<' + phone + '>';
    }
    $('#information').val(TEMP_HTML);
    return this;
}

var sp = new Service();