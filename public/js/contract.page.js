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
    this.CONTRACT_EDIT = arguments['CONTRACT_EDIT'] ? arguments['CONTRACT_EDIT'] : '.contract-edit';
    this.BILL_ADD = arguments['BILL_ADD'] ? arguments['BILL_ADD'] : '.bill-add';
    this.CONTRACT_END = arguments['CONTRACT_END'] ? arguments['CONTRACT_END'] : '.contract-end';
    this.BILL_DEL = arguments['BILL_DEL'] ? arguments['BILL_DEL'] : '.bill-del';
    this.BILL_COLLECT = arguments['BILL_COLLECT'] ? arguments['BILL_COLLECT'] : '.bill-collect';
    this.CONTRACT_CHARTID = arguments['CONTRACT_CHARTID'] ? arguments['CONTRACT_CHARTID'] : 'CONTRACT_CHARTID';
    this.CONTRACT_SAVE = arguments['CONTRACT_SAVE'] ? arguments['CONTRACT_SAVE'] : 'CONTRACT_SAVE';
    this.COST_ITEMS = arguments['COST_ITEMS'] ? arguments['COST_ITEMS'] : 'COST_ITEMS';
    this.BILL_SAVE = arguments['BILL_SAVE'] ? arguments['BILL_SAVE'] : 'BILL_SAVE';
    this.BILL_CHARID = arguments['BILL_CHARID'] ? arguments['BILL_CHARID'] : 'BILL_CHARID';
    this.COLLECT_CHARID = arguments['COLLECT_CHARID'] ? arguments['COLLECT_CHARID'] : 'COLLECT_CHARID';
    this.BILL_RECEIVE = arguments['BILL_RECEIVE'] ? arguments['BILL_RECEIVE'] : 'BILL_RECEIVE';
    this.RECEIVE_JSON = arguments['RECEIVE_JSON'] ? arguments['RECEIVE_JSON'] : 'RECEIVE_JSON';

    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        QUERY: '/contract/condition',
        CONTRACTS_LIST: '/contract/contracts',
        CONTRACT_DETAIL_BIND: '/contract',
        BILL_LIST: '/bill/bills/contract',
        CONTRACT_ABANDON: '/contract/abandon',
        CONTRACT_EDIT_BIND: '/contract/update',
        EMPLOYEE_BIND_EDIT: '/employee/employees',
        END_BIND: '/contract/end',
        BILL_ADD: '/bill/add',
        BILL_DEL: '/bill/delete',
        COLLECT_BIND: '/bill/receive',
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
    //移除本地缓存
    localStorage.removeItem("isAlert");
    App.init();
    ComponentsPickers.init();
    this.conditionBind();
    this.contractList();
    this.contractDetail();
    this.tabChange();
    this.contractEdit();
    this.treeItem();
    this.contractEnd();
    this.sundrySwitch();
    this.billAdd();
    this.billDelete();
    this.collectBind();
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
            break;
        case this.CONTRACT_SAVE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: _this.CONTRACT_CHARTID,
                customerCharId: '0BAA95CC-F221-4707-B561-80AD7065ABA6',//不作修改
                price: parseFloat($("#Price_edit").val()),
                deposit: parseFloat($("#Deposit_edit").val()),
                payType: parseInt($("#PayType_edit .active").attr("data-value")),
                inDate: $("#InDate_edit").val(),
                outDate: $("#OutDate_edit").val(),
                total: parseInt($("#Total_edit").val()),
                bargainDate: $("#CreateTime_edit").val(),
                ownerDepartmentCharId: $("#Dpts_Edit .active").attr("data-value"),
                ownerEmployeeCharId: $("#Emps_Edit .active").attr("data-value"),
                description: $("#Description_edit").val()
            };
            break;
        case this.API_CONFIG['END_BIND']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                contractCharId: _this.CONTRACT_CHARTID,
            }
            break;
        case this.API_CONFIG['END_SAVE']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                contractCharId: _this.CONTRACT_CHARTID,
                contractType: $("#EndContractType .active").attr("data-value"),
                costItems: JSON.stringify(_this.COST_ITEMS),
                costPrice: $(".money-total span:eq(1)").text(),
                description: $("#Description_end").val().trim(),
                endDate: $("#end-date").val().trim()
            };
            break;
        case this.API_CONFIG['BILL_ADD']:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.BILL_SAVE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                contractCharId: _this.CONTRACT_CHARTID,
                costCharId: $("#CostItems-bill .active").attr("data-value"),
                type: $("#BillTypes-bill .active").attr("data-value"),
                payDate1: $("#InDate_bill").val().trim(),
                payDate2: $("#OutDate_bill").val().trim(),
                payDate3: $("#pay-bill").val().trim(),
                costPrice: $("#Price_bill").val().trim(),
                description: $("#Description_bill").val().trim()
            };
            break;
        case this.API_CONFIG['BILL_DEL']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                billCharId: _this.BILL_CHARID
            };
            break;
        case this.API_CONFIG['COLLECT_BIND']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                billCharId: _this.BILL_CHARID
            };
            break;
        case this.BILL_RECEIVE:
            params={
                requestKey: localStorage.getItem("requestKey"),
//            账单唯一标示
                billCharId:  _this.BILL_CHARID,
//            实收
                costItems: _this.RECEIVE_JSON,
//            实收金额
                progress: $("#total_coll").val().trim(),
//            付款方式
                payType: $("#PayType_coll .active").attr("data-value").trim(),
//            支付流水号
                serialNumber:$("#follow_coll").val().trim(),
//            支付日期
                payDate: $("#date_coll").val().trim(),
//            备注
                description: $("#Description_coll").val().trim()
            };
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
                var JSON_DATA = data['data'],TEMP_HTML;
                for(var KEY in JSON_DATA){
                    TEMP_HTML='';
                    for (var i = 0; i < JSON_DATA[KEY].length; i++) {
                        TEMP_HTML += "<li data-value='" +JSON_DATA[KEY][i]['Key'] + "' class='drop-option'>" + JSON_DATA[KEY][i]['Value'] + "</li>";
                    }
                    $("#" + KEY).html(TEMP_HTML);
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
            + '<div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['EndDate'] + '</span></div><div class="column col-xs-12 col-md-4"><span>' + JSON_DATA['CreateTime'] + '</span></div>'
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
                $('.tabs li').eq(0).addClass("active").siblings("li").removeClass("active");
                $('.tab-body .block-content').eq(0).removeClass("hide").siblings().addClass("hide");
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
                if (JSON_DATA['EndDate']) {
                    $('.contract-end').hide();
                } else {
                    $('.contract-end').show();
                }
                if(JSON_DATA['State']=='作废'){
                    $('.contract-abandon').hide();
                }else{
                    $('.contract-abandon').show();
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
            + '<div class="column col-xs-12 col-md-2"><span>状态</span></div><div class="column col-xs-12 col-md-1"><span>类型</span></div>'
            + '<div class="col-xs-12 col-md-4"><div class="row"><div class="column col-xs-12 col-md-9"><span>账单周期</span></div><div class="column col-xs-12 col-md-3"><span>应收</span></div></div></div>'
            + '<div class="column col-xs-12 col-md-1"><span>已收</span></div><div class="column col-xs-12 col-md-2"><span>应支付日</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>操作</span></div></div></div>'
            + '<div class="row-body col-xs-7 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['State'] + '</span></div><div class="column col-xs-12 col-md-1"><span>' + JSON_DATA['Type'] + '</span></div>'
            + '<div class="col-xs-12 col-md-4"><div class="row"><div class="column col-xs-12 col-md-9"><span>' + JSON_DATA['PayDate1'] + "~" + JSON_DATA['PayDate2'] + '</span></div><div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['Price'] + '</span></div></div></div>'
            + '<div class="column col-xs-12 col-md-1"><span>' + JSON_DATA['Progress'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['PayDate3'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>'
            + '<a data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="bill-collect">收款</a>'
        TEMP_HTML += webApp.grantControl($(".billDel"), "bill_delete") == false ? '</td></tr>' :
            '&nbsp;&nbsp;<a data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="bill-del">删除</a></span></div></div></div></div></div></div></div>'
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
    var _this = this;
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
ContractPage.prototype.contractEditBind = function () {
    var params = this.getParams(this.API_CONFIG['CONTRACT_EDIT_BIND']);
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
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['CONTRACT_EDIT_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_DATA = data['exted'];
                for (var JSON_KEY in JSON_DATA) {
                    $("#" + JSON_KEY + "_edit").text(JSON_DATA[JSON_KEY] ? JSON_DATA[JSON_KEY] : "");
                    $("#" + JSON_KEY + "_edit").val(JSON_DATA[JSON_KEY] ? JSON_DATA[JSON_KEY] : "");
                }

                for (var KEY in TEMP_DATA) {
                    if (KEY == "Dpts") {//绑定部门
                        var TEMP_HTML = tm.customerGetTemplate(TEMP_DATA[KEY]);
                        $(".tree-menu").html(TEMP_HTML);
                    }
                    TEMP_HTML = '';
                    if (KEY == "PayType") {
                        for (var i = 0; i < TEMP_DATA[KEY].length; i++) {
                            TEMP_HTML += "<li class='drop-option' data-value='" + TEMP_DATA['PayType'][i].Key + "'>" + TEMP_DATA['PayType'][i].Value + "</li>";
                        }
                        $("#PayType_edit ul").html(TEMP_HTML);
                    }
                }
                $("#PayType_edit ul li[data-value='" + TEMP_DATA['PayTypeSel'] + "']").addClass("active")
                    .siblings("li").removeClass("active");
                $("#PayType_edit").find('.drop-result').text($("#PayType_edit ul .active").text());


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
ContractPage.prototype.treeItem = function () {
    var _this = this;
    tm.customerClickTreeItem(function () {
        _this.employeeBindEdit();
        $("#Emps_Edit").parents(".drop-body").prev().find(".drop-result").text($("#Emps_Edit li").eq(0).html());
    });

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
                $("#Emps_Edit").parents(".drop-body").prev('.drop-header').find('.drop-result').text($('#Emps_Edit .active').html());

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
 * 合同保存
 * Author:LiYong
 * Date:2017-9-7
 * @returns {ContractPage}
 */
ContractPage.prototype.contractSave = function () {
    var _this = this,
        contractMessage = "",
        result = false;
    var REMARK = $("#Description_edit").val().trim();
    if (regular.check(regular.MONEY_REG_EXP, $("#Price_edit").val().trim())) {
        contractMessage = "租金输入有误！";
    } else if (regular.check(regular.MONEY_REG_EXP, $("#Deposit_edit").val().trim())) {
        contractMessage = "押金输入有误！";
    } else if (regular.check(regular.MONTH_REG_EXP, parseInt($("#Total_edit").val().trim()))) {
        contractMessage = "入住人数输入有误！";
    } else if ($("#Dpts_Edit .active").length == 0 || $("#Emps_Edit .active").length == 0) {
        contractMessage = "请选择所属员工！";
    } else if (REMARK != "" && webApp.textLength(REMARK) > 100) {
        contractMessage = "文字长度不能超过100！";
    } else {
        result = true;
    }
    if (result) {
        var params = _this.getParams(_this.CONTRACT_SAVE);
        _this.ajaxRequestContractSave(params);
    } else {
        messageBox.show('提示', contractMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return this;
}


/**
 * 合同保存
 * Author:LiYong
 * Date:2017-9-7
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestContractSave = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['CONTRACT_EDIT_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                _this.contractDetailBind();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                mp.hideSmPanel();
                _this.contractList();
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
 * Date:2017-8-30
 * 显示退租编辑弹窗
 * @returns {CustomerPage}
 */
ContractPage.prototype.contractEnd = function () {
    var _this = this;
    $(document).on("click", this.CONTRACT_END, function () {
        mp.manualShowPanel({
            index: 1,
            element: ".panel-sm",
            complete: function () {
                $('.panel-end .form-input').val('');
                $('.money-total span').eq(1).html(0);
                var params = _this.getParams(_this.API_CONFIG['END_BIND']);
                _this.ajaxRequestEndBind(params);
            }
        });
    })
    return this;
}
/**
 * 杂费切换
 * Author:liyong
 * Date:2017-9-11
 * @returns {ContractPage}
 */
ContractPage.prototype.sundrySwitch = function () {
    var _this = this;
    $('#CostItem ul').on('click', 'li', function () {
        $(this).toggleClass('sel');
        var index = $(this).index();
        $(this).parents('.fees-project')
            .next('.fees-money').find('.form-group').eq(index).toggle().find('.form-input').val('');
        _this.sum();
    });

    $('#more_end').click(function () {
        _toggleHtml(this, ['更多', '收起']);
        $('#CostItem').slideToggle();
    });

    function _toggleHtml(obj, arr) {
        var arr = ['更多', '收起'];
        if (obj.innerHTML == arr[0]) {
            obj.innerHTML = arr[1];
        } else {
            obj.innerHTML = arr[0];
        }
    }

    _this.sum();
    $('.fees-money').on('click', 'ul li', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        $(this).parents('.drop-body').prev('.drop-header').find('.drop-result').html($(this).html());
        $(this).addClass('active').siblings('li').removeClass('active');
        _this.sum();
    })
    $('.fees-money').on('keyup', '.form-group .form-input', function () {
        _this.sum();
    });
    return this;
}
/**
 * BEGIN 退租数据绑定
 * Author:LiYong
 * Date:2017-09-11
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestEndBind = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['END_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            var JSON_DATA = data['data'],
                TEMP_DATA = data['exted'],
                TEMP_HTML = '',
                TEMP_CLASS = null;
            //绑定明细页面
            if (data['succ']) {
                for (var KEY in JSON_DATA) {
                    $("#" + KEY + "-End").text(JSON_DATA[KEY] ? JSON_DATA[KEY] : "");
                }
                for (var KEY in TEMP_DATA) {
                    TEMP_HTML = '';
                    for (var i = 0; i < TEMP_DATA[KEY].length; i++) {
                        TEMP_CLASS = i == 0 ? ' active' : '';
                        TEMP_HTML += "<li class='drop-option" + TEMP_CLASS + "' data-value='" + TEMP_DATA[KEY][i].Key + "'>" + TEMP_DATA[KEY][i].Value + "</li>";
                    }
                    $("#" + KEY + " ul").html(TEMP_HTML);
                    $('#' + KEY + ' .drop-header .drop-result').text($('#' + KEY + ' ul .active').text());
                }
                TEMP_HTML = '';
                for (var i = 0; i < TEMP_DATA['CostItem'].length; i++) {
                    TEMP_HTML += '<div class="form-group">'
                        + '<div class="group-row row">'
                        + '<div class="group-header col-xs-3 col-sm-3">'
                        + '<div class="group-title" data-value="' + TEMP_DATA['CostItem'][i]['Key'] + '">' + TEMP_DATA['CostItem'][i]['Value'] + '</div>'
                        + '</div></div>'
                        + '<div class="group-body"><div class="row">'
                        + '<div class="col-xs-4 column-end"><div class="drop-container hide" tabIndex="1">'
                        + '<div class="drop-content"><div class="drop-header">'
                        + '<span class="drop-result"></span> <i class="drop-icon icon-drop-down"></i>'
                        + '</div><div class="drop-body"><ul>'
                    for (var j = 0; j < TEMP_DATA['BillAddType'].length; j++) {
                        TEMP_CLASS = j == 0 ? ' active' : '';
                        TEMP_HTML += "<li class='drop-option " + TEMP_CLASS + "' data-value='" + TEMP_DATA['BillAddType'][j].Key + "'>" + TEMP_DATA['BillAddType'][j].Value + "</li>";
                    }
                    TEMP_HTML += '</ul></div><div class="drop-footer"></div></div></div></div>'
                        + '<div class="col-xs-8 column-end">'
                        + '<input class="form-input" type="text" data-keyup="number"/>'
                        + '</div></div></div><div class="group-footer"></div></div>'
                }

                $('.fees-money').html(TEMP_HTML);
                $('.fees-money .column-end .drop-header .drop-result').html($('.fees-money .column-end ul .active').html());

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
 * Date:2017-9-11
 * 求和
 * @returns {ContractPage}
 */
ContractPage.prototype.sum = function () {
    var TEMP_VALUE = $('.fees-money .form-group');
    var TEMP_HTML, TEMP_DT = 0 / 1;
    for (var i = 0; i < TEMP_VALUE.length; i++) {
        TEMP_HTM = '';
        TEMP_HTML = (TEMP_VALUE.eq(i).find('.form-input').val() ? TEMP_VALUE.eq(i).find('.form-input').val() : 0) / 1;
        TEMP_HTML = (TEMP_VALUE.eq(i).find('ul .active').attr('data-value') == 1) ? TEMP_HTML : -TEMP_HTML;
        TEMP_DT += TEMP_HTML;
    }
    $('.money-total span:eq(1)').html(TEMP_DT);
    return this;
}

/**
 * BEGIN 退租保存ajax
 * Author:LiYong
 * Date:2017-07-20
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.endSave = function () {
    var _this = this,
        contractMessage = "",
        result = false,
        ARR = [];
    $(".fees-money .form-group").each(function () {
        if ($(this).css("display") != "none") {
            var OBJ = {
                costCharId: $(this).find(".group-title").attr("data-value"),
                costItemPrice: $(this).find("input").val(),
                type: $(this).find("ul .active").attr("data-value")
            };
            ARR.push(OBJ);
        }
    });
    _this.COST_ITEMS = ARR;

    var REMARK = $("#Description_end").val().trim();
    if ($('#end-date').val() == '') {
        contractMessage = "退租日期不能为空！";
    } else if (REMARK != "" && webApp.textLength(REMARK) > 100) {
        contractMessage = "文字长度不能超过100！";
    } else {
        result = true;
    }
    if (result) {
        var params = _this.getParams(_this.API_CONFIG['END_SAVE']);
        _this.ajaxRequestEndSave(params);
    } else {
        messageBox.show('提示', contractMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return this;
}
/**
 * BEGIN 退租保存ajax
 * Author:LiYong
 * Date:2017-09-11
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestEndSave = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['END_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                _this.contractDetailBind();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                mp.hideSmPanel();
                _this.contractList();
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
 * Date:2017-9-12
 * 账单新增 模态窗
 * @returns {CustomerPage}
 */
ContractPage.prototype.billAdd = function () {
    var _this = this;
    $(document).on("click", this.BILL_ADD, function () {
        mp.manualShowPanel({
            index: 2,
            element: ".panel-sm",
            complete: function () {
                var params = _this.getParams(_this.API_CONFIG['BILL_ADD']);
                _this.ajaxRequestBillAdd(params);
            }
        });
    })
    return this;
}

/**
 * BEGIN 账单新增绑定ajax
 * Author:LiYong
 * Date:2017-09-12
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestBillAdd = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['BILL_ADD'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                //绑定账单费用类别列表
                var TEMP_HTML = "", TEMP_CLASS = '';
                for (var KEY in JSON_DATA) {
                    TEMP_HTML = '';
                    for (var i = 0; i < JSON_DATA[KEY].length; i++) {
                        TEMP_CLASS = i == 0 ? ' active' : '';
                        TEMP_HTML += "<li class='drop-option" + TEMP_CLASS + "' data-value='" + JSON_DATA[KEY][i].Key + "'>" + JSON_DATA[KEY][i].Value + "</li>";
                    }
                    $("#" + KEY + "-bill ul").html(TEMP_HTML);
                    $('#' + KEY + '-bill  .drop-header .drop-result').text($('#' + KEY + '-bill ul .active').text());
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
 * 账单新增保存
 * Author:LiYong
 * Date:2017-09-13
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.billSave = function () {
    var _this = this, contractMessage = "", result = false,
        REMARK = $("#Description_bill").val().trim();
    if ($('#InDate_bill').val() == "" || $('#OutDate_bill').val() == "") {
        contractMessage = "请输入账单周期";
    } else if (regular.check(regular.MONEY_REG_EXP, $('#Price_bill').val())) {
        contractMessage = "金额输入不正确";
    } else if ($('#pay-bill').val() == "") {
        contractMessage = "请输入应支付日";
    } else if (REMARK != "" && webApp.textLength(REMARK) > 100) {
        contractMessage = "文字长度不能超过100！";
    } else {
        result = true;
    }
    if (result) {
        var params = _this.getParams(_this.BILL_SAVE);
        _this.ajaxRequestBillSave(params);
    } else {
        messageBox.show('提示', contractMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return this;
}

/**
 * 账单新增保存ajax
 * Author:LiYong
 * Date:2017-09-13
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestBillSave = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['BILL_ADD'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            _this.billList();
            mp.hideSmPanel();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

/**
 *  账单删除
 *  Author:LiYong
 * Date:2017-09-13
 * @returns {ContractPage}
 */

ContractPage.prototype.billDelete = function () {
    var _this = this;
    $(document).on("click", _this.BILL_DEL, function () {
        _this.BILL_CHARID = $(this).attr("data-value").trim();
        var params = _this.getParams(_this.API_CONFIG['BILL_DEL']);
        messageBox.show("确认", "确定删除账单？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            _this.ajaxRequestBillDelete(params);
        });
    });
    return this;
}
/**
 * BEGIN 账单删除ajax
 * Author:LiYong
 * Date:2017-09-13
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestBillDelete = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['BILL_DEL'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            _this.billList();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

/**
 * 打开账单收款窗口
 * Author:LiYong
 * Date:2017-09-13
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.collectBind = function () {
    var _this = this;
    $('#items-cost').on('keyup', '.form-group input', function () {
        _this.add();
        if($(this).val()/1-$(this).parents('.col-xs-6').prev('.col-xs-6').find('span:eq(1)').html()>0){
            messageBox.show("提示", "实收金额应小于应收金额！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
        }
    });

    $(document).on("click", _this.BILL_COLLECT, function () {
        $('#total_coll').val('');
        $('#follow_coll').val('');
        $('#date_coll').val('');
        $('#Description_coll').val('');
        _this.BILL_CHARID = $(this).attr("data-value").trim();
        var params = _this.getParams(_this.API_CONFIG['COLLECT_BIND']);
        mp.manualShowPanel({
            index: 3,
            element: ".panel-sm",
            complete: function () {
                _this.ajaxRequestCollectBind(params);
            }
        });
    });
    return this;
}


/**
 * 打开账单收款窗口ajax
 * Author:LiYong
 * Date:2017-09-13
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestCollectBind = function (params) {
    $.ajax({
        type: 'GET',
        url: host + this.API_CONFIG['COLLECT_BIND'],
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA=data['data'],TEMP_DATA=data['exted'],TEMP_HTML='', TEMP_CLASS='';

                for(var i=0;i<JSON_DATA.length;i++){
                    TEMP_HTML+= '<div class="form-group"><div class="group-row row"><div class="col-xs-6"> '
                        +'<div class="row row-should"><div class="col-xs-6"><span>'+JSON_DATA[i]["Item"]+'</span></div>'
                        +'<div class="col-xs-6"><span>'+JSON_DATA[i]["ItemPrice"]+'</span></div>'
                        +'</div></div><div class="col-xs-6"><span>实收</span>'
                        + '<input type="text" data-value="'+JSON_DATA[i]["ItemCharId"]+'" data-keyup="number"></div></div></div>';
                    for(var KEY in JSON_DATA[i]){
                        $('#'+KEY+'-coll').html(JSON_DATA[i][KEY]);
                    }
                }
                $('#items-cost').html(TEMP_HTML);


                TEMP_HTML=''
                for(var i=0;i<TEMP_DATA.length;i++){
                    TEMP_CLASS = i == 0 ? ' active' : '';
                    TEMP_HTML += "<li class='drop-option" + TEMP_CLASS + "' data-value='" + TEMP_DATA[i].Key + "'>" + TEMP_DATA[i].Value + "</li>";
                }
                $("#PayType_coll ul").html(TEMP_HTML);
                $('#PayType_coll  .drop-header .drop-result').text($('#PayType_coll ul .active').text());
            } else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    })
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-13
 * 账单收款 调用
 * @returns {ContractPage}
 */
ContractPage.prototype.billReceive=function () {
    var _this = this, contractMessage = "", result = false,
        REMARK = $("#Description_coll").val().trim(),
        ARR=[],flag=false;
    $("#items-cost .form-group input").each(function(){
        var OBJ={
            CharId:$(this).attr("data-value"),
            Progress:$(this).val()
        };
        ARR.push(OBJ);
    });
    _this.RECEIVE_JSON=JSON.stringify(ARR);
    $('#items-cost input').each(function () {
        if($(this).val().trim()== ""){
            flag=true;
        };
    })
    if (flag) {
        contractMessage = "请输入实收金额";
    } else if ($('#follow_coll').val().trim() == "") {
        contractMessage = "请输入流水账号";
    }else if ($('#date_coll').val().trim() == "") {
        contractMessage = "请输入支付日期";
    } else if (REMARK != "" && webApp.textLength(REMARK) > 100) {
        contractMessage = "文字长度不能超过100！";
    } else {
        result = true;
    }
    if (result) {
        var params = _this.getParams(_this.BILL_RECEIVE);
        _this.ajaxRequestBillReceive(params);
    } else {
        messageBox.show('提示', contractMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return this;
}
/**
 * Author:LIYONG
 * Date:2017-9-13
 * 账单收款 ajax
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestBillReceive=function (params) {
    var _this=this;
    $.ajax({
        type: "Post",
        url: host + this.API_CONFIG['COLLECT_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                _this.billList();
                messageBox.show("提醒", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                mp.hideSmPanel();
            }
            else {
                messageBox.show("错误", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.error);
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
 * Date:2017-9-11
 * 求和
 * @returns {ContractPage}
 */
ContractPage.prototype.add = function () {
    var TEMP_VALUE = $('#items-cost .form-group');
    var TEMP_HTML, TEMP_DT = 0 / 1;
    for (var i = 0; i < TEMP_VALUE.length; i++) {
        TEMP_HTML= '';
        TEMP_HTML = (TEMP_VALUE.eq(i).find('input').val() ? TEMP_VALUE.eq(i).find('input').val() : 0) / 1;
        TEMP_DT += TEMP_HTML;
    }
    $('#total_coll').val(TEMP_DT?TEMP_DT:'');
    return this;
}

var ctp = new ContractPage();
