/**
 * Author:liyong
 * Date:2017-8-25
 * 构造函数
 * @constructor
 */
function CustomerPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.PAGE_SIZE = arguments['PAGE_SIZE'] ? arguments['PAGE_SIZE'] : 10;
    this.PAGE_INDEX = arguments['PAGE_INDEX'] ? arguments['PAGE_INDEX'] : 1;
    this.DETAIL_BTN = arguments['DETAIL_BTN'] ? arguments['DETAIL_BTN'] : '.btn-detail';
    this.CUSTOMER_ADD = arguments['CUSTOMER_ADD'] ? arguments['CUSTOMER_ADD'] : '.customer_add';
    this.CUSTOMER_BIND = arguments['CUSTOMER_BIND'] ? arguments['CUSTOMER_BIND'] : 'CUSTOMER_BIND';
    this.CUSTOMER_ADD_SAVE = arguments['CUSTOMER_ADD_SAVE'] ? arguments['CUSTOMER_ADD_SAVE'] : 'CUSTOMER_ADD_SAVE';
    this.EMPLOYEE_BIND_EDIT = arguments['EMPLOYEE_BIND_EDIT'] ? arguments['EMPLOYEE_BIND_EDIT'] : 'EMPLOYEE_BIND_EDIT';
    this.DATA_CHARID = arguments['DATA_CHARID'] ? arguments['DATA_CHARID'] : "DATA_CHARID";
    this.HOUSE_TYPE = arguments['HOUSE_TYPE'] ? arguments['HOUSE_TYPE'] : [];
    this.HOUSE_TYPE_EDIT = arguments['HOUSE_TYPE_EDIT'] ? arguments['HOUSE_TYPE_EDIT'] : [];
    this.CUSTOMER_EDIT = arguments['CUSTOMER_EDIT'] ? arguments['CUSTOMER_EDIT'] : '.customer_update';
    this.FOLLOW_CHARID = arguments['FOLLOW_CHARID'] ? arguments['FOLLOW_CHARID'] : 'FOLLOW_CHARID';
    this.FOLLOW_DEL = arguments['FOLLOW_DEL'] ? arguments['FOLLOW_DEL'] : '.column-del';
    this.FOLLOW_REMARK = arguments['FOLLOW_REMARK'] ? arguments['FOLLOW_REMARK'] : '.follow-remark';
    this.FOLLOW_RECORD = arguments['FOLLOW_RECORD'] ? arguments['FOLLOW_RECORD'] : '.follow-record';


    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIGE'] : {
        CONDITION_BIND: "/customer/search/condition",
        CUSTOMER_BIND: "/customer/customers",
        CUSTOMER_ADD: "/customer/add",
        CUSTOMER_ADD_SAVE: "/customer/add",
        CUSTOMER_DETAIL_BIND: "/customer",
        CONTRACT_BIND: "/customer/contract",
        CUSTOMER_EDIT_BIND: "/customer/Update",
        EMPLOYEE_BIND_ADD: "/employee/employees",
        CUSTOMER_EDIT_SAVE: "/customer/update",
        CUSTOMER_DELETE: "/customer/delete",
        FOLLOW_BIND: "/customer/follows",
        GIVEUP_CUSTOMER: "/customer/abandon",
        FOLLOW_DELETE: "/customer/follow/delete",
        FOLLOW_ADD: "/customer/follow/Add",
    };
    this.init();
}

/**
 * Author:liyong
 * Date: 2017-8-25
 * 初始化
 * @returns {CustomerPage}
 */
CustomerPage.prototype.init = function () {
    localStorage.removeItem("isAlert");
    var _this = this;
    this.conditionBind();
    this.customer();
    this.CustomerDetail();
    this.customerAddBind();
    this.tabChange();
    this.customerEdit();
    this.followDelete();
    this.treeItem();
    App.init();
    ComponentsPickers.init();
    return this;
}

/**
 * Author:liyong
 * Date:2017-8-25
 * 参数列表
 * @param name
 * @returns {*}
 */
CustomerPage.prototype.getParams = function (name) {
    var params = null;
    var _this = this;
    switch (name) {
        case this.API_CONFIG['CONDITION_BIND']:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.API_CONFIG['CUSTOMER_BIND']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                pageIndex: this.PAGE_INDEX,
                pageSize: this.PAGE_SIZE,
                type: $("#CustomerType_Get .active").length > 0 ? $("#CustomerType_Get .active").attr("data-value") : "",
                levelInCharId: $("#CustomerLevel_Get .active").length > 0 ? $("#CustomerLevel_Get .active").attr("data-value") : "",
                sourceCharId: $("#CustomerSource_Get .active").length > 0 ? $("#CustomerSource_Get .active").attr("data-value") : "",
                dateType: $("#CustomerDateType_Get .active").length > 0 ? parseInt($("#CustomerDateType_Get .active").attr("data-value")) : 0,
                startDate: $("#StartDate").val(),
                endDate: $("#EndDate").val(),
                key: $("#Key").val()
            };
            break;
        case this.API_CONFIG['CUSTOMER_ADD']:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.CUSTOMER_BIND:
            params = {
                NA_VAL: $("#Name_Add").val().trim(),
                PA_VAL: $("#Phone_Add").val().trim(),
                MA_VAL: parseInt($("#Month_Add").val().trim()),
                RM_VAL: parseFloat($("#RentalMin_Add").val().trim()),
                RA_VAL: parseFloat($("#RentalMax_Add").val().trim()),
                PD_VAL: $("#People_Add").val().trim(),
                DA_VAL: $("#Dpts_Add .active").attr("data-value"),
                EA_VAL: $("#Emps_Add .active").attr("data-value"),
                BT_VAL: $("#btnType").val()
            };
            break;
        case  this.CUSTOMER_ADD_SAVE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                name: $("#Name_Add").val().trim(),
                phone: $("#Phone_Add").val().trim(),
                cardID: $("#CardID_Add").val().trim(),
                address: $("#Address_Add").val().trim(),
                title: $("#Genders_Add .active").text(),
                month: parseInt($("#Month_Add").val().trim()),
                rentalMin: parseFloat($("#RentalMin_Add").val().trim()),
                rentalMax: parseFloat($("#RentalMax_Add").val().trim()),
                layout: this.HOUSE_TYPE.join("|"),
                people: $("#People_Add").val().trim(),
                seeTime: $("#SeeTime_Add").val().trim(),
                inTime: $("#InTime_Add").val().trim(),
                description: $("#Description_Add").val().trim(),
                levelInCharId: $("#CustomerLevel_Add .active").attr("data-value"),
                sourceCharId: $("#CustomerSource_Add .active").attr("data-value"),
                ownerDepartmentCharId: $("#Dpts_Add .active").attr("data-value"),
                ownerEmployeeCharId: $("#Emps_Add .active").attr("data-value")
            };
            break;
        case this.API_CONFIG['CUSTOMER_DETAIL_BIND']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: this.DATA_CHARID
            };
            break;
        case this.API_CONFIG['CONTRACT_BIND']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                customerCharId: this.DATA_CHARID
            };
            break;
        case this.API_CONFIG['CUSTOMER_EDIT_BIND']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: this.DATA_CHARID
            };
            break;
        case this.API_CONFIG['EMPLOYEE_BIND_ADD']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                departmentCharId: $("#Dpts_Add ul li.active").attr("data-value")
            };
            break;
        case this.EMPLOYEE_BIND_EDIT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                departmentCharId: $("#Dpts_Edit ul li.active").attr("data-value")
            };
            break;
        case this.API_CONFIG['CUSTOMER_EDIT_SAVE']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: this.DATA_CHARID,
                name: $("#Name_Edit").val().trim(),
                phone: $("#Phone_Edit").val().trim(),
                cardID: $("#CardID_Edit").val().trim(),
                address: $("#Address_Edit").val().trim(),
                title: $("#Genders_Edit .active").text(),
                month: parseInt($("#Month_Edit").val().trim()),
                rentalMin: parseFloat($("#RentalMin_Edit").val().trim()),
                rentalMax: parseFloat($("#RentalMax_Edit").val().trim()),
                layout: this.HOUSE_TYPE_EDIT.join("|"),
                people: $("#People_Edit").val().trim(),
                seeTime: $("#SeeTime_Edit").val().trim(),
                inTime: $("#InTime_Edit").val().trim(),
                description: $("#Description_Edit").val().trim(),
                levelInCharId: $("#CustomerLevel_Edit .active").attr("data-value"),
                sourceCharId: $("#CustomerSource_Edit .active").attr("data-value"),
                ownerDepartmentCharId: $("#Dpts_Edit .active").attr("data-value"),
                ownerEmployeeCharId: $("#Emps_Edit .active").attr("data-value")
            };
            break;
        case this.API_CONFIG['CUSTOMER_DELETE']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: this.DATA_CHARID
            };
            break;
        case this.API_CONFIG['FOLLOW_BIND']:
            params =
                {
                    requestKey: localStorage.getItem("requestKey"),
                    pageIndex: this.PAGE_INDEX,
                    pageSize: this.PAGE_SIZE,
                    customerCharId: this.DATA_CHARID
                };
            break;
        case this.API_CONFIG['GIVEUP_CUSTOMER']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: this.DATA_CHARID
            };
            break;
        case this.API_CONFIG['FOLLOW_DELETE']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: this.FOLLOW_CHARID
            };
            break;
        case this.API_CONFIG['FOLLOW_ADD']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                customerCharId: this.DATA_CHARID,
                followParameterCharId: $("#titleList .active").attr("data-value").trim(),
                description: $(".follow-remark").val(),
                createDepartmentCharId: localStorage.getItem("departmentCharId"),
                createEmployeeCharId: localStorage.getItem("employeeCharId")
            };
            break;


    }
    return params;
}


/**
 * Author:liyong
 * Date: 2017-8-25
 * 查询条件绑定调用
 * @returns {CustomerPage}
 */
CustomerPage.prototype.conditionBind = function () {
    var params = this.getParams(this.API_CONFIG['CONDITION_BIND']);
    this.ajaxRequestConditionBind(params);
    return this;
}
/**
 * Author:liyong
 * Date: 2017-8-25
 * 查询条件绑定AJAX
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestConditionBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['CONDITION_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = null;
                var JSON_DATA = data['data'];
                for (var KEY in JSON_DATA) {
                    TEMP_HTML = "";
                    for (var i = 0; i < JSON_DATA[KEY].length; i++) {
                        var KEY_DATA = JSON_DATA[KEY][i];
                        TEMP_HTML += "<li class='drop-option' data-value=\"" + KEY_DATA['Key'] + "\">" + KEY_DATA['Value'] + "</li>";
                    }
                    TEMP_HTML += "<div class=\"clear\"></div>";
                    $("#" + KEY + "_Get").html(TEMP_HTML);
                }

            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            // 添加本地缓存
            $("#iFrmMain").load(function () {
                if (localStorage.getItem("isAlert")) {
                } else {
                    messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
                    localStorage.setItem("isAlert", true);
                }
            });

        }
    });
    return this;
}


/**
 * Author:liyong
 * Date:2017-8-25
 * 绑定人员列表页面调用
 * @returns {CustomerPage}
 */
CustomerPage.prototype.customer = function () {
    var params = this.getParams(this.API_CONFIG['CUSTOMER_BIND']);
    if (webApp.grantControl($(".pagination"), "customer_select")) {
        this.ajaxRequestCustomerBind(params);
    } else {
        webApp.noneGrant();
    }
    return this;
}
/**
 * Author:liyong
 * Date:2017-8-25
 * 绑定人员列表页面
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestCustomerBind = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['CUSTOMER_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = webApp['NO_RESULT'];
                var JSON_DATA = data['data'];
                _this.PAGINATION = new Pagination({
                    PAGINATION: '#Main',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG['CUSTOMER_BIND']);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestCustomerBinds(params);
                    }
                });
                TEMP_HTML = JSON_DATA.length != 0 ? _this.getTemplate(JSON_DATA) : TEMP_HTML;
                $(".table-body").html(TEMP_HTML);

            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}
/**
 * Author:liyong
 * Date:2017-8-25
 * 绑定人员列表页面ajaxs
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestCustomerBinds = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['CUSTOMER_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $(".table-body").html(_this.getTemplate(JSON_DATA));
            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}
/**
 * Author:liyong
 * Date:2017-8-25
 * 模板
 * @param params
 * @returns {string}
 */
CustomerPage.prototype.getTemplate = function (params) {
    var TEMP_HTML = '';
    for (var i = 0; i < params.length; i++) {
        var JSON_DATA = params[i];
        var className = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-5 col-md-12"><div class="row-title' + className + ' row">'
            + '<div class="col-xs-12 col-md-5"><div class="row"><div class="column col-xs-12 col-md-2"><span>类型</span></div><div class="column col-xs-12 col-md-2"><span>等级</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>姓名</span></div><div class="column col-xs-12 col-md-4"><span>手机号码</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>来源</span></div></div></div><div class="col-xs-12 col-md-2"><div class="row"><div class="column col-xs-12 col-md-7"><span>租金(元/月)</span></div>'
            + '<div class="column col-xs-12 col-md-5"><span>租期(月)</span></div></div></div><div class="col-xs-12 col-md-5"><div class="row"><div class="column col-xs-12 col-md-3"><span>创建</span></div>'
            + '<div class="column col-xs-12 col-md-3"><span>预约</span></div><div class="column col-xs-12 col-md-2"><span>计划</span></div><div class="column col-xs-12 col-md-2"><span>归属人</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>操作</span></div></div></div></div></div>'
            + '<div class="row-body col-xs-7 col-md-12"><div class="row-item row">'
            + '<div class="col-xs-12 col-md-5"><div class="row"><div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['Type'] + '</span></div><div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['LevelInValue'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['Name'] + '</span></div><div class="column col-xs-12 col-md-4"><span>' + JSON_DATA['Phone'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['SourceValue'] + '</span></div></div></div><div class="col-xs-12 col-md-2"><div class="row">'
            + '<div class="column col-xs-12 col-md-7"><span>' + JSON_DATA['RentalMin'] + '~' + JSON_DATA['RentalMax'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-5"><span>' + JSON_DATA['Month'] + '</span></div></div></div><div class="col-xs-12 col-md-5"><div class="row"><div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['CreateTime'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['SeeTime'] + '</span></div><div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['InTime'] + '</span></div><div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['EmployeeName'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>'
            + '<a data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-detail">查看</a></span></div></div></div></div></div></div></div>'
    }
    return TEMP_HTML;
}

/**
 * Author:liyong
 * Date:2017-8-29
 * 员工信息绑定 调用
 * @returns {CustomerPage}
 * @constructor
 */
CustomerPage.prototype.CustomerDetailBind = function () {
    var params = this.getParams(this.API_CONFIG['CUSTOMER_DETAIL_BIND']);
    this.ajaxRequestCustomerDetailBind(params);
    return this;
}

/**
 * Author:liyong
 * Date:2017-8-29
 * 员工信息绑定 ajax
 * @returns {CustomerPage}
 * @constructor
 */
CustomerPage.prototype.ajaxRequestCustomerDetailBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['CUSTOMER_DETAIL_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                for (var JSON_KEY in JSON_DATA) {
                    $("#" + JSON_KEY + "_Detail").text(JSON_DATA[JSON_KEY]);
                }
            }
            else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

/**
 * Author:liyong
 * Date:2017-8-28
 * 点击查看客户详情
 * @returns {CustomerPage}
 * @constructor
 */
CustomerPage.prototype.CustomerDetail = function () {
    var _this = this;
    $(document).on("click", this.DETAIL_BTN, function () {
        _this.DATA_CHARID = $(this).attr("data-value").trim();
        mp.manualShowPanel({
            index: 0,
            element: ".panel-lg",
            complete: function () {
                _this.CustomerDetailBind();
                $('.tabs li').eq(0).addClass("active").siblings("li").removeClass("active");
                $('.tab-body .block-content').eq(0).removeClass("hide").siblings().addClass("hide");
            }
        });
    });
    return this;
}

/**
 * Author:liyong
 * Date:2017-8-29
 *tab选项卡切换
 * @returns {CustomerPage}
 */
CustomerPage.prototype.tabChange = function () {
    var _this = this;
    var tabComponent = new TabComponent({
        changeEnd: function (obj) {
            var TEMP_SELECTOR = '.panel-lg .panel-modal .tab.active'
            var TAB_INDEX = parseInt($(TEMP_SELECTOR).index());
            var $_BLOCK_CONTENT = $('.panel-lg .panel-modal').find('.block-content');
            $_BLOCK_CONTENT.addClass('hide');
            $_BLOCK_CONTENT.eq(TAB_INDEX).removeClass('hide');
            switch (TAB_INDEX) {
                case 0:
                    _this.CustomerDetailBind();
                    break;
                case 1:
                    _this.contractBind();
                    break;
                case 2:
                    _this.followBind();
                    break;
            }
        }
    });
    return this;
}

/**
 * Author:liyong
 * Date:2017-8-29
 * 合同详情绑定 调用
 *  @returns {CustomerPage}
 */
CustomerPage.prototype.contractBind = function () {
    var params = this.getParams(this.API_CONFIG['CONTRACT_BIND']);
    this.ajaxRequestContractBind(params);
    return this;
}

/**
 * Author:liyong
 * Date:2017-8-29
 * 合同详情绑定 ajax
 * @param params
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestContractBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['CONTRACT_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                if (JSON_DATA['ContractState'] != 1) {
                    $(".withoutContract").removeClass("hide");
                    $(".hasContract").addClass("hide");
                }
                else {
                    $(".hasContract").removeClass("hide");
                    $(".withoutContract").addClass("hide");
                    for (var JSON_KEY in JSON_DATA) {
                        JSON_DATA[JSON_KEY] = JSON_DATA[JSON_KEY] ? JSON_DATA[JSON_KEY] : "";
                        $("#" + JSON_KEY + "_Detail").text(JSON_DATA[JSON_KEY]);
                        $("." + JSON_KEY).text(JSON_DATA[JSON_KEY]);
                    }
                }
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

/**
 * Author:liyong
 * Date:2017-8-28
 * 绑定客户新增页面基础条件调用
 * @returns {CustomerPage}
 */
CustomerPage.prototype.customerAddBind = function () {
    var _this = this;
    $(document).on("click", _this.CUSTOMER_ADD, function () {
        //清空表单信息
        $("#Name_Add").val("");
        $("#Address_Add").val("");
        $("#CardID_Add").val("");
        $("#Phone_Add").val("");
        $("#Month_Add").val("");
        $("#RentalMin_Add").val("");
        $("#RentalMax_Add").val("");
        $("#People_Add").val("");
        $("#SeeTime_Add").val("");
        $("#InTime_Add").val("");
        $("#Description_Add").val("");
        $("#Genders_Add li").removeClass("active").eq(0).addClass("active");
        $(".genders-add").html($("#Genders_Add").find(".active").html());
        $("#CustomerSource_Add li").removeClass("active").eq(0).addClass("active");
        $(".source-add").html($("#CustomerSource_Add").find(".active").html());
        $("#CustomerLevel_Add li").removeClass("active").eq(0).addClass("active");
        $(".level-add").html($("#CustomerLevel_Add").find(".active").html());
        $("#HouseType_Add li").removeClass("selected");
        $(".select-dep").html("不选");
        $(".select-people").html("不选");
        mp.manualShowPanel({
            index: 0,
            element: ".panel-sm",
            complete: function () {

            }
        })
    });

    $(document).on("click", ".house-type li", function () {
        $(this).toggleClass("selected");
    });
    return this;
}
/**
 * Author:liyong
 * Date:2017-8-28
 * 绑定客户新增页面基础条件ajax
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestCustomerAddBind = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['CUSTOMER_ADD'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'],
                    TEMP_DATA1 = JSON_DATA['data1'],
                    TEMP_DATA2 = JSON_DATA['data2'],
                    TEMP_HTML = "";
                for (var KEY in TEMP_DATA1) {
                    var TEMP_HTML = "", TEMP_NAME = "";
                    var TEMP_VALUE = TEMP_DATA1[KEY];
                    for (var i = 0; i < TEMP_VALUE.length; i++) {
                        TEMP_NAME = i == 0 ? ' active' : '';
                        var TEMP_KEY = TEMP_VALUE[i]['Key'] ? TEMP_VALUE[i]['Key'] : TEMP_VALUE[i]["CharId"];
                        var DATA_VALUE = TEMP_VALUE[i]['Value'] ? TEMP_VALUE[i]['Value'] : TEMP_VALUE[i]["Name"];
                        TEMP_HTML += '<li class="drop-option ' + TEMP_NAME + '" data-value="' + TEMP_KEY + '">' + DATA_VALUE + '</li>'
                    }
                    $("#" + KEY + "_Add").html(TEMP_HTML);
                    $("#" + KEY + "_Edit").html(TEMP_HTML);
                }
                TEMP_HTML = tm.customerGetTemplate(TEMP_DATA2);
                $(".tree-menu").html(TEMP_HTML);
            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

/**
 * Author:liyong
 * Date:2017-8-28
 * 客户新增 保存
 * @returns {CustomerPage}
 */
CustomerPage.prototype.customerAddSave = function () {
    var _this = this,
        customerMessage = "",
        result = false;
    var REMARK = $("#Description_Add").val().trim();
    if (regular.check(regular.NAME_REG_EXP, $("#Name_Add").val().trim())) {
        customerMessage = "客户姓名输入有误！";
    } else if (regular.check(regular.PHONE_REG_EXP, $("#Phone_Add").val().trim())) {
        customerMessage = "手机号码不正确！";
    } else if (regular.check(regular.MONTH_REG_EXP, parseInt($("#Month_Add").val().trim()))) {
        customerMessage = "租期输入有误！";
    } else if (regular.check(regular.MONEY_REG_EXP, parseFloat($("#RentalMin_Add").val().trim())) || regular.check(regular.MONEY_REG_EXP, parseFloat($("#RentalMax_Add").val().trim()))) {
        customerMessage = "租金输入不正确！";
    } else if (parseFloat($("#RentalMin_Add").val().trim()) > parseFloat($("#RentalMax_Add").val().trim())) {
        customerMessage = "最高租金不能小于最低租金！";
    } else if (regular.customerRegExpCheck($("#People_Add").val().trim())) {
        customerMessage = "租客人数不正确！";
    } else if ($("#SeeTime_Add").val() == "") {
        customerMessage = "请选择预约看房日期！";
    } else if ($("#InTime_Add").val() == "") {
        customerMessage = "请选择入住日期！";
    } else if ($("#Dpts_Add .active").length == 0 || $("#Emps_Add .active").length == 0) {
        customerMessage = "请选择所属员工！";
    } else if (REMARK != "" && !webApp.specialCharacter(REMARK)) {
        customerMessage = "不能含有特殊字符！";
    } else if (REMARK != "" && webApp.textLength(REMARK) > 100) {
        customerMessage = "文字长度不能超过100！";
    } else {
        result = true;
    }
    if (result) {
        $("#HouseType_Add li").each(function () {
            if ($(this).hasClass("selected")) {
                _this.HOUSE_TYPE.push($(this).attr("data-value"));
            }
        });

        var params = _this.getParams(_this.CUSTOMER_ADD_SAVE);
        _this.ajaxRequestCustomerAddSave(params);
    } else {
        messageBox.show('提示', customerMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return this;
}


/**
 * Author:liyong
 * Date:2017-8-28
 * 客户新增 保存ajax
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestCustomerAddSave = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['CUSTOMER_ADD_SAVE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                _this.customer();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                mp.hideSmPanel()
            }
            else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}


/**
 * Author:liyong
 * Date:2017-8-28
 * 客户编辑 保存
 * @returns {CustomerPage}
 */
CustomerPage.prototype.customerEditSave = function () {
    var _this = this,
        customerMessage = "",
        result = false;
    var REMARK = $("#Description_Edit").val().trim();
    if (regular.check(regular.NAME_REG_EXP, $("#Name_Edit").val().trim())) {
        customerMessage = "客户姓名输入有误！";
    } else if (regular.check(regular.PHONE_REG_EXP, $("#Phone_Edit").val().trim())) {
        customerMessage = "手机号码不正确！";
    } else if (regular.check(regular.MONTH_REG_EXP, parseInt($("#Month_Edit").val().trim()))) {
        customerMessage = "租期输入有误！";
    } else if (regular.check(regular.MONEY_REG_EXP, parseFloat($("#RentalMin_Edit").val().trim())) || regular.check(regular.MONEY_REG_EXP, parseFloat($("#RentalMax_Edit").val().trim()))) {
        customerMessage = "租金输入不正确！";
    } else if (parseFloat($("#RentalMin_Edit").val().trim()) > parseFloat($("#RentalMax_Edit").val().trim())) {
        customerMessage = "最高租金不能小于最低租金！";
    } else if (regular.customerRegExpCheck($("#People_Edit").val().trim())) {
        customerMessage = "租客人数不正确！";
    } else if ($("#SeeTime_Edit").val() == "") {
        customerMessage = "请选择预约看房日期！";
    } else if ($("#InTime_Edit").val() == "") {
        customerMessage = "请选择入住日期！";
    } else if ($("#Dpts_Edit .active").length == 0 || $("#Emps_Edit .active").length == 0) {
        customerMessage = "请选择所属员工！";
    } else if (REMARK != "" && !webApp.specialCharacter(REMARK)) {
        customerMessage = "不能含有特殊字符！";
    } else if (REMARK != "" && webApp.textLength(REMARK) > 100) {
        customerMessage = "文字长度不能超过100！";
    } else {
        result = true;
    }
    if (result) {
        $("#HouseType_Edit li").each(function () {
            if ($(this).hasClass("selected")) {
                _this.HOUSE_TYPE_EDIT.push($(this).attr("data-value"));
            }
        });

        var params = _this.getParams(_this.API_CONFIG['CUSTOMER_EDIT_SAVE']);
        _this.ajaxRequestCustomerEditSave(params);
    } else {
        messageBox.show('提示', customerMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return this;
}


/**
 * Author:liyong
 * Date:2017-8-28
 * 客户编辑 保存ajax
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestCustomerEditSave = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['CUSTOMER_EDIT_SAVE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                _this.customer();
                _this.CustomerDetailBind();
                mp.hideSmPanel();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }

            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}
/**
 * Author:LIYONG
 * Date:2017-8-30
 * 显示客户编辑弹窗
 * @returns {CustomerPage}
 */
CustomerPage.prototype.customerEdit = function () {
    var _this = this;
    $(document).on("click", this.CUSTOMER_EDIT, function () {
        mp.manualShowPanel({
            index: 1,
            element: ".panel-sm",
            complete: function () {
                _this.customerEditBind();
            }
        });
    })
    return this;
}
/**
 * Author:LIYONG
 * Date:2017-8-30
 * 客户编辑基础数据绑定 调用
 * @returns {CustomerPage}
 */
CustomerPage.prototype.customerEditBind = function () {
    var params = this.getParams(this.API_CONFIG['CUSTOMER_EDIT_BIND']);
    this.ajaxRequestCustomerEditBind(params);
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-8-30
 * 客户编辑基础数据绑定 ajax
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestCustomerEditBind = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['CUSTOMER_EDIT_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_JSON = {
                    SourceParameterCharId: "#CustomerSource_Edit", LevelParameterCharId: "#CustomerLevel_Edit",
                };
                for (var KEY in JSON_DATA) {
                    $("#" + KEY + "_Edit").val(JSON_DATA[KEY]);
                }

                // 下拉框
                for (var KEY in TEMP_JSON) {
                    var $_TEMP_SELECTOR = $(TEMP_JSON[KEY] + " li[data-value='" + JSON_DATA[KEY] + "']");
                    var $_DROP_RESULT = $(TEMP_JSON[KEY]).parents(".drop-container").eq(0).find(".drop-result");
                    if (undefined != $_TEMP_SELECTOR[0]) {
                        $(TEMP_JSON[KEY] + " li").removeClass("active");
                        $_TEMP_SELECTOR.addClass("active");
                        $_DROP_RESULT.text($_TEMP_SELECTOR.text());
                    }
                }

                // 性别
                $(".genders").text(JSON_DATA['Title']);
                $("#Genders_Edit li").each(function () {
                    if ($(this).text() == JSON_DATA['Title']) {
                        $(this).addClass("active").siblings("li").removeClass("active");
                    }
                });

                var $_TEMP_DEPARTMENT = $("#Dpts_Edit li[data-value='" + JSON_DATA['OwnerDepartmentCharId'] + "']");
                if (undefined != $_TEMP_DEPARTMENT[0]) {
                    var TEMP_TEXT = $_TEMP_DEPARTMENT.find(".tree-text").eq(0).text();
                    $("#Dpts_Edit li").removeClass("active");
                    $_TEMP_DEPARTMENT.addClass("active");
                    $("#Dpts_Edit").parents(".select-option").prev().text(TEMP_TEXT);
                    _this.employeeBindEdit();
                }
                $("#Emps_Edit").parents(".drop-body").prev().find(".drop-result").text($("#EmployeeName_Detail").html());
                var layouts = JSON_DATA['Layout'].split('|');
                for (var i = 0; i < layouts.length; i++) {
                    $("#HouseType_Edit li[data-value='" + layouts[i] + "']").addClass("selected");
                }

            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-8-31
 * 员工绑定 新增
 * @returns {CustomerPage}
 */
CustomerPage.prototype.employeeBindAdd = function () {
    var params = this.getParams(this.API_CONFIG['EMPLOYEE_BIND_ADD']);
    this.ajaxRequestEmployeeBindAdd(params);
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-8-31
 * 员工绑定 新增 ajax
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestEmployeeBindAdd = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['EMPLOYEE_BIND_ADD'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_HTML = "";
                TEMP_HTML += "<li data-value=\"\" class=\"drop-option\">不选</li>";
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += "<li data-value=\"" + JSON_DATA[i]['CharId'] + "\"   class='drop-option'>" + JSON_DATA[i]['Name'] + "</li>";
                }
                $("#Emps_Add").html(TEMP_HTML);
                $("#Emps_Add").parents(".drop-body").prev().find(".drop-result").text($("#Emps_Add li").eq(0).html());
            }
            else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-8-31
 * 员工绑定 编辑
 * @returns {CustomerPage}
 */
CustomerPage.prototype.employeeBindEdit = function () {
    var params = this.getParams(this.EMPLOYEE_BIND_EDIT)
    this.ajaxRequestEmployeeBindEdit(params);
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-8-31
 * 员工绑定 编辑 ajax
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestEmployeeBindEdit = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['EMPLOYEE_BIND_ADD'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_HTML = "";
                TEMP_HTML += "<li data-value=\"\" class=\"drop-option\">不选</li>";
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += "<li data-value=\"" + JSON_DATA[i]['CharId'] + "\"   class='drop-option'>" + JSON_DATA[i]['Name'] + "</li>";
                }
                $("#Emps_Edit").html(TEMP_HTML);
                $("#Emps_Edit li").each(function () {
                    if ($(this).text() == $("#EmployeeName_Detail").html()) {
                        $(this).addClass("active").siblings().removeClass("active");
                    }
                })

            }
            else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

/**
 * Author:LIYONG
 *Date:2017-9-1
 * 客户删除
 * @returns {CustomerPage}
 */
CustomerPage.prototype.customerDelete = function () {
    var _this = this;
    messageBox.show("确认", "确定删除该员工吗 ?", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        var params = _this.getParams(_this.API_CONFIG['CUSTOMER_DELETE']);
        _this.ajaxRequestCustomerDelete(params);
    });
    return this;
}


/**
 * Author:LIYONG
 *Date:2017-9-1
 * 客户删除 ajax
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestCustomerDelete = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['CUSTOMER_DELETE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                _this.customer();
                mp.hideLgPanel();
            } else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }

        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-1
 * 跟进记录列表
 * @returns {CustomerPage}
 */
CustomerPage.prototype.followBind = function () {
    $(this.FOLLOW_REMARK).val("");
    var params = this.getParams(this.API_CONFIG['FOLLOW_BIND']);
    this.ajaxRequestFollowBind(params);
    return this;
}
/**
 * Author:LIYONG
 * Date:2017-9-1
 * 跟进记录列表
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestFollowBind = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['FOLLOW_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'],
                    TEMP_DATA = data['exted']['paramKey'],
                    TEMP_HTML = '',
                    STYLE;
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += '<div class="column col-xs-4">' + JSON_DATA[i]["CreateTime"] + '</div>'
                        + '<div class="column col-xs-2">' + JSON_DATA[i]["Value"] + '</div>'
                        + '<div class="column col-xs-4">' + JSON_DATA[i]["Description"] + '</div>'
                    if (webApp.grantControl($(".followDelete"), "follow_delete")) {
                        TEMP_HTML += '<div class="column col-xs-2 column-del" data-value=" ' + JSON_DATA[i]["CharId"] + '">删除</div>';
                    }
                }
                $(_this.FOLLOW_RECORD).html(TEMP_HTML);

                if ($(_this.FOLLOW_RECORD).find('.column').length == 0) {
                    $(_this.FOLLOW_RECORD).hide()
                } else {
                    $(_this.FOLLOW_RECORD).show()
                }

                _this.PAGINATION = new Pagination({
                    PAGINATION: '#PagPassword',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        var params = _this.getParams(_this.API_CONFIG['FOLLOW_BIND']);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestFollowBinds(params);
                    }
                });

                TEMP_HTML = '';
                for (var j = 0; j < TEMP_DATA.length; j++) {
                    STYLE = j == 0 ? "active" : "";
                    TEMP_HTML += '<li class="drop-option ' + STYLE + '" data-value="' + TEMP_DATA[j]['Key'] + '" >' + TEMP_DATA[j]['Value'] + '</li>'
                }
                $("#titleList").html(TEMP_HTML);
                $("#titleList").parents(".drop-body").prev().find(".drop-result").text($("#titleList .active").text());

            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });

    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-1
 * 跟进记录
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestFollowBinds = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['FOLLOW_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'],
                    TEMP_DATA = data['exted']['paramKey'],
                    TEMP_HTML = '',
                    STYLE;
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += '<div class="column col-xs-3">' + JSON_DATA[i]["CreateTime"] + '</div>'
                        + '<div class="column col-xs-2">' + JSON_DATA[i]["Value"] + '</div>'
                        + '<div class="column col-xs-5">' + JSON_DATA[i]["Description"] + '</div>'
                    if (webApp.grantControl($(".followDelete"), "follow_delete")) {
                        TEMP_HTML += '<div class="column col-xs-2 column-del" data-value=" ' + JSON_DATA[i]["CharId"] + '">删除</div>';
                    }
                }
                $(".follow-record").html(TEMP_HTML);
                TEMP_HTML = '';
                for (var j = 0; j < TEMP_DATA.length; j++) {
                    STYLE = j == 0 ? "active" : "";
                    TEMP_HTML += '<li class="drop-option ' + STYLE + '" data-value="' + TEMP_DATA[j]['Key'] + '" >' + TEMP_DATA[j]['Value'] + '</li>'
                }
                $("#titleList").html(TEMP_HTML);
            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });

    return this;
}
/**
 * Author:LIYONG
 * Date:2017-9-1
 *放弃客户
 * @returns {CustomerPage}
 */
CustomerPage.prototype.giveUpCustomer = function () {
    var _this = this;
    messageBox.show("确认", "确定放弃该客户吗 ?", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        var params = _this.getParams(_this.API_CONFIG['GIVEUP_CUSTOMER']);
        _this.ajaxRequestGiveUpCustomer(params);
    });

    return this;
};
/**
 * Author:LIYONG
 * Date:2017-9-1
 *放弃客户 ajax
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestGiveUpCustomer = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['GIVEUP_CUSTOMER'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                _this.customer();
                mp.hideLgPanel();
            } else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });


    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-1
 * 删除跟进
 * @returns {CustomerPage}
 */
CustomerPage.prototype.followDelete = function () {
    var _this = this;
    $(document).on('click', _this.FOLLOW_DEL, function () {
        _this.FOLLOW_CHARID = $(this).attr("data-value").trim();
        messageBox.show("确认", "确定删除该跟进吗 ?", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            var params = _this.getParams(_this.API_CONFIG['FOLLOW_DELETE']);
            _this.ajaxRequestFollowDelete(params);
        });
    })
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-1
 * 删除跟进 ajax
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestFollowDelete = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['FOLLOW_DELETE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            _this.followBind();
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });

    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-1
 * 跟进新增
 * @returns {CustomerPage}
 */
CustomerPage.prototype.followAdd = function () {
    var REMARK = $(".follow-remark").val().trim();
    if (webApp.specialCharacter(REMARK)) {
        if (webApp.textLength(REMARK) <= 100) {
            var params = this.getParams(this.API_CONFIG['FOLLOW_ADD']);
            this.ajaxRequestFollowAdd(params);
        } else {
            messageBox.show("提示", "文字长度不能超过100！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
        }
    }
    return this;
}


/**
 * Author:LIYONG
 * Date:2017-9-1
 * 跟进新增 ajax
 * @returns {CustomerPage}
 */
CustomerPage.prototype.ajaxRequestFollowAdd = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['FOLLOW_ADD'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            _this.followBind();
            $(".follow-remark").val("")//清空表单数据
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}
/**
 * Author:LIYONG
 * Date:20170-9-4
 * 树形菜单
 * @returns {CustomerPage}
 */
CustomerPage.prototype.treeItem = function () {
    var _this = this;
    tm.customerClickTreeItem(function () {
        if ($("#Dpts_Add ul li.active").length != 0) {
            _this.employeeBindAdd();
        }
        if ($("#Dpts_Edit ul li.active").length != 0) {
            _this.employeeBindEdit();
            $("#Emps_Edit").parents(".drop-body").prev().find(".drop-result").text($("#Emps_Edit li").eq(0).html());
        }
    });
    var params = _this.getParams(_this.API_CONFIG['CUSTOMER_ADD']);
    _this.ajaxRequestCustomerAddBind(params);
    return this;
}
var cp = new CustomerPage();








