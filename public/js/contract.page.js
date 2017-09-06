//移除本地缓存
localStorage.removeItem("isAlert");
var pageSize = 10;

/**
 * 构造函数
 * Author:LiYong
 * Date:2017-09-5
 * @constructor
 */
function ContractPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.PAGE_SIZE = arguments['PAGE_SIZE'] ? arguments['PAGE_SIZE'] : 10;
    this.PAGE_INDEX = arguments['PAGE_INDEX'] ? arguments['PAGE_INDEX'] : 1;
    this.DETAIL_BTN = arguments['DETAIL_BTN'] ? arguments['DETAIL_BTN'] : '.btn-detail';
    this.CONTRACT_EDIT = arguments['CONTRACT_EDIT'] ? arguments['CONTRACT_EDIT'] : '.btn-edit';
    this.CONTRACT_CHARTID = arguments['CONTRACT_CHARTID'] ? arguments['CONTRACT_CHARTID'] : 'CONTRACT_CHARTID';

    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        QUERY: '/contract/condition',
        CONTRACTS_LIST: '/contract/contracts',
        CONTRACT_DETAIL_BIND: '/contract',
        BILL_LIST: '/bill/bills/contract',
        CONTRACT_ABANDON: '/contract/abandon',
        CONTRACT_EDIT_BIND: '/contract/update',
        EMPLOYEE_BIND_EDIT: "/employee/employees",
    }
    this.init();
}

/**
 *初始化函数
 * Author:LiYong
 * Date:2017-09-5
 * @returns {ContractPage}
 */
ContractPage.prototype.init = function () {
    App.init();
    ComponentsPickers.init();
    this.conditionBind();
    this.contractList();
    this.contractDetail();
    this.tabChange();
    this.contractEdit();
    this.treeItem();
    return this;
}

/**
 * 参数
 * Author:LiYong
 * Date:2017-07-20
 * @param name
 * @returns {*}
 */
ContractPage.prototype.getParams = function (name) {
    var params = null,
        _this = this;
    switch (name) {
        case this.API_CONFIG['QUERY']:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.API_CONFIG['CONTRACTS_LIST']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                pageIndex: this.PAGE_INDEX,
                pageSize: this.PAGE_SIZE,
                buildingCharId: $("#building .active").length > 0 ? $("#building .active").attr("data-value") : "",
                buildingRoomCharId: "",//物业模块合同列表用到该参数,此处不需要传
                state: $("#contractState .active").length > 0 ? $("#contractState .active").attr("data-value") : 3,
                dateType: $("#dateType .active").length > 0 ? $("#dateType .active").attr("data-value") : -1,
                startDate: $("#StartDate").val(),
                endDate: $("#EndDate").val(),
                key: $("#Key").val()
            };
            break;
        case this.API_CONFIG['CONTRACT_DETAIL_BIND']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: this.CONTRACT_CHARTID
            };
            break;
        case this.API_CONFIG['BILL_LIST']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                pageIndex: this.PAGE_INDEX,
                pageSize: this.PAGE_SIZE,
                contractCharId: _this.CONTRACT_CHARTID
            };
            break;
        case this.API_CONFIG['CONTRACT_ABANDON']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: _this.CONTRACT_CHARTID
            };
            break;
        case this.API_CONFIG['CONTRACT_EDIT_BIND']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: _this.CONTRACT_CHARTID
            }
            break;
        case this.API_CONFIG['EMPLOYEE_BIND_EDIT']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                departmentCharId: $("#Dpts_Edit ul li.active").attr("data-value")
            };
            console.log(params);
            break;
    }

    return params;
}


/**AJAX
 *查询条件绑定
 * Author:LiYong
 * Date:2017-9-5
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.conditionBind = function () {
    var params = this.getParams(this.API_CONFIG['QUERY']);
    this.ajaxRequestCondition(params);
    return this;
}
/**AJAX
 *查询条件绑定
 * Author:LiYong
 * Date:2017-9-5
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestCondition = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['QUERY'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML;
                var JSON_DATA = data['data'];
                var TEMP_DATA = Object.keys(JSON_DATA);
                for (var i = 0; i < TEMP_DATA.length; i++) {
                    var OBJECT_DATA = JSON_DATA[TEMP_DATA[i]];
                    TEMP_HTML = "";
                    for (var j = 0; j < OBJECT_DATA.length; j++) {
                        if (i == TEMP_DATA.length - 1) {
                            TEMP_HTML += "<li data-value='" + OBJECT_DATA[j]['CharId'] + "' class='drop-option'>" + OBJECT_DATA[j]['Name'] + "</li>";
                        } else {
                            TEMP_HTML += "<li data-value='" + OBJECT_DATA[j]['Key'] + "' class='drop-option'>" + OBJECT_DATA[j]['Value'] + "</li>";
                        }
                    }
                    $("#" + TEMP_DATA[i] + " li:first").nextAll().remove();
                    // if (TEMP_DATA[i] == "contractState") {
                    //     $("#" + TEMP_DATA[i]).after(TEMP_HTML);
                    // } else {
                    $("#" + TEMP_DATA[i] + " li:first").after(TEMP_HTML);
                    // }
                }
            }
            else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * Author:LIYONG
 * Date:2017-9-5
 * 模板
 * @param params
 * @returns {string}
 */
ContractPage.prototype.getTemplate = function (params) {
    var TEMP_HTML = '';
    for (var i = 0; i < params.length; i++) {
        var JSON_DATA = params[i];
        var className = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-5 col-md-12"><div class="row-title' + className + ' row">'
            + '<div class="col-xs-12 col-md-6"><div class="row"><div class="column col-xs-12 col-md-5"><span>合同编号</span></div><div class="column col-xs-12 col-md-1"><span>状态</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>姓名</span></div><div class="column col-xs-12 col-md-3"><span>手机号码</span></div>'
            + '<div class="column col-xs-12 col-md-1"><span>房号</span></div></div></div><div class="column col-xs-12 col-md-1"><span>租金(元/月)</span></div>'
            + '<div class="col-xs-12 col-md-5"><div class="row"><div class="column col-xs-12 col-md-3"><span>签约</span></div>'
            + '<div class="column col-xs-12 col-md-3"><span>退租</span></div><div class="column col-xs-12 col-md-4"><span>创建</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>操作</span></div></div></div></div></div>'
            + '<div class="row-body col-xs-7 col-md-12"><div class="row-item row">'
            + '<div class="col-xs-12 col-md-6"><div class="row"><div class="column col-xs-12 col-md-5"><span>' + JSON_DATA['Number'] + '</span></div><div class="column col-xs-12 col-md-1"><span>' + JSON_DATA['State'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['CustomerName'] + '</span></div><div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['Phone'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-1"><span>' + JSON_DATA['RoomName'] + '</span></div></div></div>'
            + '<div class="column col-xs-12 col-md-1"><span>' + JSON_DATA['Price'] + '</span></div>'
            + '<div class="col-xs-12 col-md-5"><div class="row"><div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['InDate'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['OutDate'] + '</span></div><div class="column col-xs-12 col-md-4"><span>' + JSON_DATA['CreateTime'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>'
            + '<a data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-detail">查看</a></span></div></div></div></div></div></div></div>'
    }
    return TEMP_HTML;
}


/**
 * Author:liyong
 * Date:2017-9-5
 * 绑定人员列表页面调用
 * @returns {ContractPage}
 */
ContractPage.prototype.contractList = function () {
    var params = this.getParams(this.API_CONFIG['CONTRACTS_LIST']);
    if (webApp.grantControl($(".pagination"), "contract_select")) {
        this.ajaxRequestContractList(params);
    } else {
        webApp.noneGrant();
    }
    return this;
}
/**
 * Author:liyong
 * Date:2017-9-5
 * 绑定人员列表页面
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestContractList = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['CONTRACTS_LIST'],
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
                        params = _this.getParams(_this.API_CONFIG['CONTRACTS_LIST']);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestContractLists(params);
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
 * Date:2017-9-5
 * 绑定人员列表页面s
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestContractLists = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['CONTRACTS_LIST'],
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
 * Date:2017-8-28
 * 点击查看客户详情
 * @returns {ContractPage}
 */
ContractPage.prototype.contractDetail = function () {
    var _this = this;
    $(document).on("click", _this.DETAIL_BTN, function () {
        _this.CONTRACT_CHARTID = $(this).attr("data-value").trim();
        mp.manualShowPanel({
            index: 0,
            element: ".panel-lg",
            complete: function () {
                _this.contractDetailBind();
                // $('.tabs li').eq(0).addClass("active").siblings("li").removeClass("active");
                // $('.tab-body .block-content').eq(0).removeClass("hide").siblings().addClass("hide");
            }
        });
    });
    return this;
}


/**
 * Author:liyong
 * Date:2017-9-5
 *合同详情 调用
 * @returns {ContractPage}
 */
ContractPage.prototype.contractDetailBind = function () {
    var params = this.getParams(this.API_CONFIG['CONTRACT_DETAIL_BIND']);
    this.ajaxRequestContractDetailBind(params);
    return this;
}


/**
 *
 * @param params
 * @returns {CustomerPage}
 */
ContractPage.prototype.ajaxRequestContractDetailBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['CONTRACT_DETAIL_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                for (var JSON_KEY in JSON_DATA) {
                    $("#" + JSON_KEY + "_Detail").text(JSON_DATA[JSON_KEY] ? JSON_DATA[JSON_KEY] : "");
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
 * Date:2017-9-6
 *tab选项卡切换
 * @returns {ContractPage}
 */
ContractPage.prototype.tabChange = function () {
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
                    break;
                case 1:
                    _this.billList();
                    break;

            }
        }
    });
    return this;
}
/**
 * Author:LIYONG
 * Date:2017-9-5
 * 账单模板
 * @param params
 * @returns {string}
 */
ContractPage.prototype.getBillTemplate = function (params) {
    var TEMP_HTML = '';
    for (var i = 0; i < params.length; i++) {
        var JSON_DATA = params[i];
        var className = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-5 col-md-12"><div class="row-title' + className + ' row">'
            + '<div class="column col-xs-12 col-md-1"><span>状态</span></div><div class="column col-xs-12 col-md-1"><span>类型</span></div>'
            + '<div class="col-xs-12 col-md-5"><div class="row"><div class="column col-xs-12 col-md-9"><span>账单周期</span></div><div class="column col-xs-12 col-md-3"><span>应收</span></div></div></div>'
            + '<div class="column col-xs-12 col-md-1"><span>已收</span></div><div class="column col-xs-12 col-md-2"><span>应支付日</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>操作</span></div></div></div>'
            + '<div class="row-body col-xs-7 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-1"><span>' + JSON_DATA['State'] + '</span></div><div class="column col-xs-12 col-md-1"><span>' + JSON_DATA['Type'] + '</span></div>'
            + '<div class="col-xs-12 col-md-5"><div class="row"><div class="column col-xs-12 col-md-9"><span>' + JSON_DATA['PayDate1'] + "~" + JSON_DATA['PayDate2'] + '</span></div><div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['Price'] + '</span></div></div></div>'
            + '<div class="column col-xs-12 col-md-1"><span>' + JSON_DATA['Progress'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['PayDate3'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>'
            + '<a data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-detail">收款</a>'
            + '&nbsp;&nbsp;<a href="javascript:void(0)">删除</a></span></div></div></div></div></div></div></div>'
    }
    return TEMP_HTML;
}


/**
 *  账单列表
 *  Author:LiYong
 * Date:2017-9-6
 * @returns {ContractPage}
 */
ContractPage.prototype.billList = function () {
    var params = this.getParams(this.API_CONFIG['BILL_LIST']);
    this.ajaxRequestBillList(params);
    return this;
}
/**
 * BEGIN 账单列表ajax
 * Author:LiYong
 * Date:2017-9-6
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestBillList = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['BILL_LIST'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = webApp['NO_RESULT'];
                var JSON_DATA = data['data'];
                _this.PAGINATION = new Pagination({
                    PAGINATION: '#pagBill',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG['BILL_LIST']);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestBillLists(params);
                    }
                });
                TEMP_HTML = JSON_DATA.length != 0 ? _this.getBillTemplate(JSON_DATA) : TEMP_HTML;
                $(".bill-table").html(TEMP_HTML);
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
 * BEGIN 账单列表ajax
 * Author:LiYong
 * Date:2017-9-6
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestBillLists = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['BILL_LIST'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $(".bill-table").html(_this.getBillTemplate(JSON_DATA));
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
 *  合同作废
 *  Author:LiYong
 * Date:2017-9-6
 * @returns {ContractPage}
 */
ContractPage.prototype.contractAbandon = function () {
    var _this = this;
    var params = this.getParams(this.API_CONFIG['CONTRACT_ABANDON']);
    messageBox.show("确认", "确定作废合同？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        _this.ajaxRequestContractAbandon(params);
    })
    return this;
}

/**
 * 合同作废
 * Author:LiYong
 * Date:2017-9-6
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestContractAbandon = function (params) {
    var _this=this;
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['CONTRACT_ABANDON'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                _this.contractList();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                mp.hideLgPanel();
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
 * Date:2017-8-30
 * 显示客户编辑弹窗
 * @returns {CustomerPage}
 */
ContractPage.prototype.contractEdit = function () {
    var _this = this;
    $(document).on("click", this.CONTRACT_EDIT, function () {
        mp.manualShowPanel({
            index: 0,
            element: ".panel-sm",
            complete: function () {
               _this.contractEditBind();
            }
        });
    })
    return this;
}


/**
 * 合同编辑基础数据
 * Author:LiYong
 * Date:2017-9-6
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.contractEditBind=function () {
    var params=this.getParams(this.API_CONFIG['CONTRACT_EDIT_BIND']);
    this.ajaxRequestContractEditBind(params);
    return this;
}
/**
 * 合同编辑基础数据
 * Author:LiYong
 * Date:2017-9-6
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestContractEditBind = function (params) {
     var _this=this;
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['CONTRACT_EDIT_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            console.log(22);
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_DATA = data['exted'];
                console.log(JSON_DATA);
                console.log(TEMP_DATA);
                for (var JSON_KEY in JSON_DATA) {
                    $("." + JSON_KEY ).text(JSON_DATA[JSON_KEY] ? JSON_DATA[JSON_KEY] : "");
                    $("." + JSON_KEY ).val(JSON_DATA[JSON_KEY] ? JSON_DATA[JSON_KEY] : "");
                }

                for (var KEY in TEMP_DATA) {
                    if (KEY == "Dpts") {//绑定部门
                        var TEMP_HTML = tm.customerGetTemplate(TEMP_DATA[KEY]);
                        $(".tree-menu").html(TEMP_HTML);
                    }
                    TEMP_HTML='';
                    if (KEY == "PayType") {
                        for(var i=0;i<TEMP_DATA[KEY].length;i++){
                            TEMP_HTML += "<li class='drop-option' value='" + TEMP_DATA['PayType'][i].Key + "'>" + TEMP_DATA['PayType'][i].Value + "</li>";
                        }
                        $(".PayType ul").html(TEMP_HTML);
                    }
                }
                var $_TEMP_DEPARTMENT = $("#Dpts_Edit li[data-value='" + JSON_DATA['OwnerDepartmentCharId'] + "']");
                if (undefined != $_TEMP_DEPARTMENT[0]) {
                    var TEMP_TEXT = $_TEMP_DEPARTMENT.find(".tree-text").eq(0).text();
                    $("#Dpts_Edit li").removeClass("active");
                    $_TEMP_DEPARTMENT.addClass("active");
                    $("#Dpts_Edit").parents(".select-option").prev().text(TEMP_TEXT);
                    _this.employeeBindEdit();
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
 * Author:LIYONG
 * Date:20170-9-6
 * 树形菜单
 * @returns {ContractPage}
 */
ContractPage.prototype.treeItem=function () {
    var _this=this;
    tm.customerClickTreeItem(function () {
        console.log(2222);
            _this.employeeBindEdit();
            console.log(1);
            $("#Emps_Edit").parents(".drop-body").prev().find(".drop-result").text($("#Emps_Edit li").eq(0).html());
    });
    // var params = _this.getParams(_this.API_CONFIG['CUSTOMER_ADD']);
     // _this.ajaxRequestCustomerAddBind(params);
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-8-31
 * 员工绑定 编辑
 * @returns {ContractPage}
 */
ContractPage.prototype.employeeBindEdit = function () {
    var params = this.getParams(this.API_CONFIG['EMPLOYEE_BIND_EDIT']);
    this.ajaxRequestEmployeeBindEdit(params);
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-8-31
 * 员工绑定 编辑 ajax
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestEmployeeBindEdit = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['EMPLOYEE_BIND_EDIT'],
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
var ctp = new ContractPage();
