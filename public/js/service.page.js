/**
 *
 * @constructor
 */
function Management() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.ACTIVE = arguments['ACTIVE'] ? arguments['ACTIVE'] : 'active';
    this.PAGE_SIZE = arguments['PAGE_SIZE'] ? arguments['PAGE_SIZE'] : 10;
    this.PAGE_INDEX = arguments['PAGE_INDEX'] ? arguments['PAGE_INDEX'] : 1;
    this.DATA_VALUE = arguments['DATA_VALUE'] ? arguments['DATA_VALUE'] : '';
    this.TAB_BTN = arguments['TAB_BTN'] ? arguments['TAB_BTN'] : '.tab-bar li';
    this.PAGINATION = arguments['PAGINATION'] ? arguments['PAGINATION'] : null;
    this.BTN_RESET = arguments['BTN_RESET'] ? arguments['BTN_RESET'] : '.btn-reset';
    this.BTN_DETAIL = arguments['BTN_DETAIL'] ? arguments['BTN_DETAIL'] : '.btn-detail';
    this.BTN_UPDATE = arguments['BTN_UPDATE'] ? arguments['BTN_UPDATE'] : '.btn-update';
    this.BTN_CHARGE = arguments['BTN_CHARGE'] ? arguments['BTN_CHARGE'] : '.btn-charge';
    this.PASSWORD_ID = arguments['PASSWORD_ID'] ? arguments['PASSWORD_ID'] : 'PASSWORD_ID';
    this.POWER_STATUS = arguments['POWER_STATUS'] ? arguments['POWER_STATUS'] : '#PowerStatus';

    this.ADD_PWD_END = arguments['ADD_PWD_END'] ? arguments['ADD_PWD_END'] : 'ADD_PWD_END';
    this.ADD_PWD_START = arguments['ADD_PWD_START'] ? arguments['ADD_PWD_START'] : 'ADD_PWD_START';
    this.UPDATE_PWD_END = arguments['UPDATE_PWD_END'] ? arguments['UPDATE_PWD_END'] : 'UPDATE_PWD_END';
    this.UPDATE_PWD_START = arguments['UPDATE_PWD_START'] ? arguments['UPDATE_PWD_START'] : 'UPDATE_PWD_START';
    this.LOCK_OPEN_END = arguments['LOCK_OPEN_END'] ? arguments['LOCK_OPEN_END'] : 'LOCK_OPEN_END';
    this.LOCK_OPER_END = arguments['LOCK_OPER_END'] ? arguments['LOCK_OPER_END'] : 'LOCK_OPER_END';
    this.LOCK_OPEN_START = arguments['LOCK_OPEN_START'] ? arguments['LOCK_OPEN_START'] : 'LOCK_OPEN_START';
    this.LOCK_OPER_START = arguments['LOCK_OPER_START'] ? arguments['LOCK_OPER_START'] : 'LOCK_OPER_START';

    this.POWER_BUY_END = arguments['POWER_BUY_END'] ? arguments['POWER_BUY_END'] : 'POWER_BUY_END';
    this.POWER_USE_END = arguments['POWER_USE_END'] ? arguments['POWER_USE_END'] : 'POWER_USE_END';
    this.POWER_OPER_END = arguments['POWER_OPER_END'] ? arguments['POWER_OPER_END'] : 'POWER_OPER_END';

    this.POWER_USE_START = arguments['POWER_USE_START'] ? arguments['POWER_USE_START'] : 'POWER_USE_START';
    this.POWER_BUY_START = arguments['POWER_BUY_START'] ? arguments['POWER_BUY_START'] : 'POWER_BUY_START';
    this.POWER_OPER_START = arguments['POWER_OPER_START'] ? arguments['POWER_OPER_START'] : 'POWER_OPER_START';

    this.LOCK_OPER_REC = arguments['LOCK_OPER_REC'] ? arguments['LOCK_OPER_REC'] : 'LOCK_OPER_REC';
    this.POWER_OPER_REC = arguments['POWER_OPER_REC'] ? arguments['POWER_OPER_REC'] : 'POWER_OPER_REC';
    this.POWER_RECHARGE = arguments['POWER_RECHARGE'] ? arguments['POWER_RECHARGE'] : 'POWER_RECHARGE';
    this.BUILDING_CHARID = arguments['BUILDING_CHARID'] ? arguments['BUILDING_CHARID'] : 'BUILDING_CHARID';
    this.BUILDROOM_CHARID = arguments['BUILDROOM_CHARID'] ? arguments['BUILDROOM_CHARID'] : 'BUILDROOM_CHARID';
    this.BUILDFLOOR_CHARID = arguments['BUILDFLOOR_CHARID'] ? arguments['BUILDFLOOR_CHARID'] : 'BUILDFLOOR_CHARID';

    this.GRANT_CONFIG = arguments['GRANT_CONFIG'] ? arguments['GRANT_CONFIG'] : {
        selectmanage: {
            value: '查看',
            class: 'select'
        },
        resetmanage: {
            value: '重置',
            class: 'reset'
        },
        delete: {
            value: '删除',
            class: 'delete',
        },
        update: {
            value: '修改',
            class: 'update',
        },
        frozen: {
            value: '冻结',
            class: 'frozen',
        },
        unfrozen: {
            value: '解冻',
            class: 'unfrozen',
        }
    };

    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        BIND_LOAD: '/device/base',
        BIND_DEVICES: '/devices',
        ADD_DEVICES: '/device/add',
        DELETE_DEVICES: '/device/delete',
        UPDATE_DEVICES: '/device/update',
        BIND_FLOOR: '/building/floors',
        BIND_ROOMS: '/building/roomsbyfloor',
        LOCK_DETAIL: '/lock/get-lock-info',
        LOCK_PASSWORD: '/lock/fetch-passwords',
        LOCK_OPEN_REC: '/lock/get-lock-events',
        LOCK_OPER_REC: '/search-device-op-log',
        POWER_DETAIL: '/elemeter/get-elemeter-info',
        POWER_OPER_REC: '/search-device-op-log',
        POWER_BUY_REC: '/elemeter/elemeter-charge-record',
        POWER_USE_REC: '/elemeter/elemeter-fetch-power-history',
        ADD_PASSWORD: '/lock/add-password',
        DELETE_PASSWORD: '/lock/delete-password',
        UPDATE_PASSWORD: '/lock/update-password',
        SELECT_PASSWORD: '/lock/get-default-password-plaintext',
        FROZEN_PASSWORD: '/lock/frozen-password',
        UNFROZEN_PASSWORD: '/lock/unfrozen-password',
        DEVICE_BIND: '/device/bind',
        DEVICE_UNBIND: '/device/unbind',
        DYNAMIC_PASSWORD: '/lock/get-dynamic-password-plaintext',
        POWER_RESET: '/elemeter/elemeter-charge-reset',
        POWER_SWITCH_ON: '/elemeter/elemeter-switch-on',
        POWER_SWITCH_OFF: '/elemeter/elemeter-switch-off',
        POWER_RECHARGE: '/elemeter/elemeter-charge',
        GETNEW_POWER: '/elemeter/elemeter-read',
        RESET_PASSWORD: '/lock/update-manager-password',
    }

    this.init();
}
/**
 *
 * @returns {Management}
 */
Management.prototype.init = function () {
    ComponentsPickers.init();

    this.exeBindLoad();
    this.navChange();
    this.dropChange();
    this.btnDetailClick();
    this.tabChange();
    this.btnResetClick();
    this.btnUpdateClick();
    this.btnChargeClick();
    this.powerInputKeyUp();
    this.exeDeletePassword();
    this.exeSelectPassword();
    this.exeFrozenPassword();
    this.exeUnfrozenPassword();

    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.navChange = function () {
    var _this = this;
    $(document).on('click', this.TAB_BTN, function () {
        $(_this.TAB_BTN).removeClass(_this.ACTIVE);
        $(this).addClass(_this.ACTIVE);
        console.log($(this).index());
        switch ($(this).index()) {
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
 *
 * @returns {Management}
 */
Management.prototype.tabChange = function () {
    var _this = this;
    /**
     *
     * @type {TabComponent}
     */
    var tabComponent = new TabComponent({
        changeEnd: function (obj) {
            var NAV_INDEX = parseInt($('.tab-bar .active').index());
            var TEMP_SELECTOR = '.panel-lg .panel-modal:eq(' + NAV_INDEX + ') .tab.active';
            var TAB_INDEX = parseInt($(TEMP_SELECTOR).index());
            var $_BLOCK_CONTENT = $('.panel-lg .panel-modal').eq(NAV_INDEX).find('.block-content');
            $_BLOCK_CONTENT.addClass('hide');
            $_BLOCK_CONTENT.eq(TAB_INDEX).removeClass('hide');
            switch (NAV_INDEX) {
                case 0:
                    switch (TAB_INDEX) {
                        case 0:
                            _this.exeLockDetail();
                            break;
                        case 1:
                            _this.exeLockPassword();
                            break;
                        case 2:
                            _this.exeLockOpenRecord();
                            break;
                        case 3:
                            _this.exeLockOperRecord();
                            break;
                    }
                    break;
                case 1:
                    switch (TAB_INDEX) {
                        case 0:
                            _this.exePowerDetail();
                            break;
                        case 1:

                            break;
                        case 2:
                            _this.exePowerBuyRecord();
                            break;
                        case 3:
                            _this.exePowerUseRecord();
                            break;
                        case 4:
                            _this.exePowerOperRecord();
                            break;
                    }
                    break;
                case 2:
                    break;
            }
        }
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.dropChange = function () {
    var _this = this;
    webApp.selectDropOption(function (obj) {
        var _obj = $(obj);
        var selector = _obj.parent().attr('data-target');
        _this.DROP_SELECTOR = _obj.parent().attr('id');
        if (selector) {
            switch (selector) {
                case 'EquNumber':
                case 'KeyEquNumber':
                    _this.exeBindFloor(selector);
                    break;
                case 'EquRoom':
                case 'KeyEquRoom':
                    _this.exeBindRooms(selector);
                    break;
            }
        }
    });
    return this;
}
/**
 *
 * @returns {boolean}
 */
Management.prototype.addDevicesNotEmpty = function () {
    var message = '';
    var result = false;
    if (!$('#Add_Type .active').attr('data-value')) {
        message = '请选择设备类型！';
    } else if (!$('#Add_Name').val().trim()) {
        message = '请输入设备名称！';
    } else if (!$('#Add_Number').val().trim()) {
        message = '请输入设备序列号！';
    } else if (!$('#Add_UUID').val().trim()) {
        message = '请输入设备UUID编号！';
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show('提示', message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 *
 * @returns {boolean}
 */
Management.prototype.saveChargeNotEmpty = function () {
    var message = '';
    var result = false;
    var TEMP_PRICE = $('#PowerPrice').val().trim();
    var TEMP_METHOD = $('#ChargePayMethod .active').attr('data-value').trim();
    if (!TEMP_PRICE) {
        message = '请输入充值金额！';
    } else if (regular.check(regular.MONEY_REG_EXP, TEMP_PRICE)) {
        message = '充值金额输入有误！';
    } else if (!TEMP_METHOD) {
        message = '请选择支付方式！';
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show('提示', message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 *
 * @returns {boolean}
 */
Management.prototype.deviceBindNotEmpty = function () {
    var message = '';
    var result = false;
    if (undefined == $('#KeyEquBuilding .active')[0]) {
        message = '请选择楼盘！';
    } else if (undefined == $('#KeyEquNumber .active')[0]) {
        message = '请选择层号！';
    } else if (undefined == $('#KeyEquRoom .active')[0]) {
        message = '请选择房间！';
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show('提示', message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 *
 * @returns {boolean}
 */
Management.prototype.updateDevicesNotEmpty = function () {
    var message = '';
    var result = false;
    if (!$('#Update_Device_Name').val().trim()) {
        message = '请输入设备名称！';
    } else if (!$('#Update_Device_Number').val().trim()) {
        message = '请输入设备序列号！';
    } else if (!$('#Update_Device_Uuid').val().trim()) {
        message = '请输入设备UUID！';
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show('提示', message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 *
 * @returns {boolean}
 */
Management.prototype.resetPasswordNotEmpty = function () {
    var message = '';
    var result = false;
    if (!$('#Reset_Password').val().trim()) {
        message = '请输入管理员密码！';
    } else if ($('#Reset_Password').val().trim().length != 6) {
        message = '密码长度必须为6位！';
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show('提示', message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}

/**
 *
 * @returns {boolean}
 */
Management.prototype.addPasswordNotEmpty = function () {
    var message = '';
    var result = false;
    var SYSTEM_TIME = new Date().getTime();
    var END_TIME = webApp.parseTime($('#Pwd_End').val().trim()) * 1000;
    var BEGIN_TIME = webApp.parseTime($('#Pwd_Begin').val().trim()) * 1000;
    if (!$('#Pwd_Name').val().trim()) {
        message = '请输入密码名称！';
    } else if (!$('#Pwd_Pwd').val().trim()) {
        message = '请输入密码明文！';
    } else if (!$('#Pwd_Begin').val().trim()) {
        message = '请输入密码开始时间！';
    } else if (!$('#Pwd_End').val().trim()) {
        message = '请输入密码结束时间！';
    } else if (BEGIN_TIME >= END_TIME || SYSTEM_TIME >= END_TIME) {
        message = '结束时间必须大于开始时间和系统时间！';
    } else if (!$('#Pwd_Phone').val().trim()) {
        message = '请输入手机号码！';
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show('提示', message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 *
 * @returns {boolean}
 */
Management.prototype.updatePasswordNotEmpty = function () {
    var message = '';
    var result = false;
    var SYSTEM_TIME = new Date().getTime();
    var END_TIME = webApp.parseTime($('#Update_Pwd_End').val().trim()) * 1000;
    var BEGIN_TIME = webApp.parseTime($('#Update_Pwd_Begin').val().trim()) * 1000;
    if (!$('#Update_Pwd_Name').val().trim()) {
        message = '请输入密码名称！';
    } else if (!$('#Update_Pwd_Pwd').val().trim()) {
        message = '请输入密码明文！';
    } else if (!$('#Update_Pwd_Begin').val().trim()) {
        message = '请输入密码开始时间！';
    } else if (!$('#Update_Pwd_End').val().trim()) {
        message = '请输入密码结束时间！';
    } else if (BEGIN_TIME >= END_TIME || SYSTEM_TIME >= END_TIME) {
        message = '结束时间必须大于开始时间和系统时间！';
    } else if (!$('#Update_Pwd_Phone').val().trim()) {
        message = '请输入手机号码！';
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show('提示', message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.powerInputKeyUp = function () {
    $(document).on('keyup', '#PowerPrice', function (ev) {
        ev = ev || window.event;
        var TEMP_FLAG1 = (ev.keyCode == 8);
        var TEMP_FLAG2 = (ev.keyCode >= 48 && ev.keyCode <= 57);
        var TEMP_FLAG3 = (ev.keyCode >= 96 && ev.keyCode <= 105);
        if (TEMP_FLAG1 || TEMP_FLAG2 || TEMP_FLAG3) {
            var TEMP_PRICE = parseFloat($('#PowerPrice').val().trim());
            var TEMP_UNIT = parseFloat($('#Charge_EleUnitPrice').text().trim());
            $('#PowerAmount').val(TEMP_PRICE / TEMP_UNIT);
        } else {
            this.value = this.value.replace(/[^0-9]/g, '')
        }
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.btnDetailClick = function () {
    var _this = this;
    $(document).on('click', this.BTN_DETAIL, function () {
        var that = this;
        var SELECTOR = _this.TAB_BTN + '.' + _this.ACTIVE;
        var TEMP_INDEX = parseInt($(SELECTOR).index());
        _this.DATA_VALUE = $(this).attr('data-value').trim();
        mp.manualShowPanel({
            index: TEMP_INDEX,
            element: '.panel-lg',
            complete: function () {
                _this.switchShowDetail({
                    that: that,
                    index: TEMP_INDEX
                });
            }
        });
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.btnUpdateClick = function () {
    var _this = this;
    $(document).on('click', this.BTN_UPDATE, function () {
        var DATA_NAME = $(this).attr('data-name').trim();
        var DATA_BEGIN = $(this).attr('data-begin').trim();
        var DATA_END = $(this).attr('data-end').trim();
        var DATA_PHONE = $(this).attr('data-phone').trim();
        _this.PASSWORD_ID = $(this).attr('data-value').trim();
        mp.manualShowPanel({
            index: 3,
            element: '.panel-sm',
            complete: function () {
                $('#Update_Pwd_Name').val(DATA_NAME);
                $('#Update_Pwd_Begin').val(DATA_BEGIN);
                $('#Update_Pwd_End').val(DATA_END);
                $('#Update_Pwd_Phone').val(DATA_PHONE);
            }
        });
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.btnResetClick = function () {
    var _this = this;
    $(document).on('click', this.BTN_RESET, function () {
        _this.PASSWORD_ID = $(this).attr('data-value').trim();
        mp.manualShowPanel({
            index: 6,
            element: '.panel-sm',
            complete: function () {
                $('#Reset_Password').val('');
            }
        });
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.btnChargeClick = function () {
    var _this = this;
    $(document).on('click', this.BTN_CHARGE, function () {
        mp.manualShowPanel({
            index: 4,
            element: '.panel-sm',
            complete: function () {
                var params = _this.getParams(_this.API_CONFIG.POWER_RECHARGE);
                _this.ajaxRequestPowerRecharge(params);
            }
        });
    });
    return this;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.switchShowDetail = function (params) {
    this['DATA_UUID'] = $(params['that']).attr('data-uuid').trim();
    switch (params['index']) {
        case 0:
            this.exeLockDetail();
            break;
        case 1:
            this.exePowerDetail();
            break;
        case 2:
            break;
    }
    return this;
}
/**
 *
 * @param params
 * @returns {string}
 */
Management.prototype.getTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_CLASS = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_CLASS = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_CLASS + ' row">'
            + '<div class="column col-xs-12 col-md-3">设备名称</div><div class="column col-xs-12 col-md-3">设备类型</div>'
            + '<div class="column col-xs-12 col-md-3">房间号</div><div class="column col-xs-12 col-md-3">操作</div>'
            + '</div></div><div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Name'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Bind'] + '</div><div class="column col-xs-12 col-md-3">'
            + '<a data-uuid="' + JSON_DATA['UUID'] + '" data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-detail">查看</a>'
            + '</div></div></div></div></div>';
    }
    return TEMP_HTML;
}

/**
 * Author:LIYONG
 * Date:2017-9-27
 *维修申请 模板
 * @param params
 * @returns {string}n
 */
Management.prototype.applicationTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_CLASS = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_CLASS = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_CLASS + ' row">'
            + '<div class="column col-xs-12 col-md-1">处理状态</div><div class="column col-xs-12 col-md-1">维修设备</div>'
            + '<div class="column col-xs-12 col-md-1">故障原因</div><div class="column col-xs-12 col-md-1">物业房号</div>'
            + '<div class="column col-xs-12 col-md-1">姓名</div><div class="column col-xs-12 col-md-3">手机号</div>'
            + '<div class="column col-xs-12 col-md-3">维修日期</div><div class="column col-xs-12 col-md-1">操作</div>'
            + '</div></div><div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Name'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Bind'] + '</div><div class="column col-xs-12 col-md-1">'
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
 * @returns {string}n
 */
Management.prototype.feedbackTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_CLASS = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_CLASS = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_CLASS + ' row">'
            + '<div class="column col-xs-12 col-md-1">回复状态</div><div class="column col-xs-12 col-md-1">反馈类型</div>'
            + '<div class="column col-xs-12 col-md-2">反馈内容</div>'
            + '<div class="column col-xs-12 col-md-1">姓名</div><div class="column col-xs-12 col-md-3">手机号</div>'
            + '<div class="column col-xs-12 col-md-3">反馈时间</div><div class="column col-xs-12 col-md-1">操作</div>'
            + '</div></div><div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Name'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Bind'] + '</div><div class="column col-xs-12 col-md-1">'
            + '<a data-uuid="' + JSON_DATA['UUID'] + '" data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-detail">查看</a>'
            + '</div></div></div></div></div>';
    }
    return TEMP_HTML;
}

/**
 * Author:LIYONG
 * Date:2017-9-27
 *通知提醒 模板
 * @param params
 * @returns {string}n
 */
Management.prototype.informWarmTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_CLASS = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_CLASS = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_CLASS + ' row">'
            + '<div class="column col-xs-12 col-md-2">类型</div><div class="column col-xs-12 col-md-2">内容</div>'
            + '<div class="column col-xs-12 col-md-2">对象</div><div class="column col-xs-12 col-md-2">时间</div>'
            + '<div class="column col-xs-12 col-md-2">创建人</div><div class="column col-xs-12 col-md-2">操作</div>'
            + '</div></div><div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Name'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Bind'] + '</div><div class="column col-xs-12 col-md-1">'
            + '<a data-uuid="' + JSON_DATA['UUID'] + '" data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-detail">删除</a>'
            + '</div></div></div></div></div>';
    }
    return TEMP_HTML;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestBindFloor = function (params, selector) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_FLOOR'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = '';
                var TEMP_DATA = null;
                var JSON_DATA = data['data'];
                if ('KeyEquNumber' != selector) JSON_DATA.unshift({CharId: '', Name: '不限'});
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_DATA = JSON_DATA[i];
                    TEMP_HTML += '<li class="drop-option" data-value="' + TEMP_DATA['CharId'] + '">' + TEMP_DATA['Name'] + '</li>';
                }
                TEMP_DATA = null;
                $('#' + selector).html(TEMP_HTML);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestBindRooms = function (params, selector) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_ROOMS'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = '';
                var TEMP_DATA = null;
                var JSON_DATA = data['data'];
                if ('KeyEquRoom' != selector) JSON_DATA.unshift({Key: '', Value: '不限'});
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_DATA = JSON_DATA[i];
                    TEMP_HTML += '<li class="drop-option" data-value="' + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
                }
                TEMP_DATA = null;
                $('#' + selector).html(TEMP_HTML);
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
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestBindDevices = function (params) {
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
                var TEMP_HTML = JSON_DATA.length != 0 ? _this.applicationTemplate(JSON_DATA) : webApp['NO_RESULT'];
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
 * 维修申请
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestBindDevicesApply = function (params) {
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
 * @returns {Management}
 */
Management.prototype.ajaxRequestBindfeedback = function (params) {
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
 * @returns {Management}
 */
Management.prototype.ajaxRequestBindInformWarm = function (params) {
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestChangePageDevices = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_DEVICES'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $(".main .table-body").html(_this.getTemplate(JSON_DATA));
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestAddDevices = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['ADD_DEVICES'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                _this.exeBindDevices();
                messageBox.show("提示", '设备新增成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestDeleteDevices = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG.DELETE_DEVICES,
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                _this.exeBindDevices();
                messageBox.show("提示", '设备删除成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestUpdateDevices = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG.UPDATE_DEVICES,
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                _this.exeBindDevices();
                messageBox.show("提示", '设备修改成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestBindLoad = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_LOAD'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var TEMP_DATA = null;
                var JSON_DATA = data['data'];
                var TEMP_HTML = '', TYPE_HTML = '';

                JSON_DATA['Bind'].unshift({Key: '0', Value: '不限'});
                JSON_DATA['Building'].unshift({CharId: '', Name: '不限'});
                for (var i = 0; i < JSON_DATA['Type'].length; i++) {
                    var TEMP_NAME = i == 0 ? ' class="active"' : '';
                    TEMP_DATA = JSON_DATA['Type'][i];
                    TEMP_HTML += '<li' + TEMP_NAME + ' data-value="' + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
                    TYPE_HTML += '<li class="drop-option" data-value="' + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
                }
                $('#EquType').html(TEMP_HTML);
                $('#Add_Type').html(TYPE_HTML);

                TEMP_HTML = '';
                for (var i = 0; i < JSON_DATA['Bind'].length; i++) {
                    var TEMP_NAME = i == 0 ? ' active' : '';
                    TEMP_DATA = JSON_DATA['Bind'][i];
                    TEMP_HTML += '<li class="drop-option' + TEMP_NAME + '" data-value="' + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
                }
                $('#EquBind').html(TEMP_HTML);

                TEMP_HTML = '';
                for (var i = 0; i < JSON_DATA['Building'].length; i++) {
                    var TEMP_NAME = i == 0 ? ' active' : '';
                    TEMP_DATA = JSON_DATA['Building'][i];
                    TEMP_HTML += '<li class="drop-option' + TEMP_NAME + '" data-value="' + TEMP_DATA['CharId'] + '">' + TEMP_DATA['Name'] + '</li>';
                }
                $('#EquBuilding').html(TEMP_HTML);

                TEMP_HTML = '';
                JSON_DATA['Building'].splice(0, 1);
                for (var i = 0; i < JSON_DATA['Building'].length; i++) {
                    TEMP_DATA = JSON_DATA['Building'][i];
                    TEMP_HTML += '<li class="drop-option" data-value="' + TEMP_DATA['CharId'] + '">' + TEMP_DATA['Name'] + '</li>';
                }
                $('#KeyEquBuilding').html(TEMP_HTML);
                _this.exeBindDevices();
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestLockDetail = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['LOCK_DETAIL'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var TEMP_BUTTONS = '<button class="btn cancel">取消</button>';
                var BIND_BUTTON = '<button class="btn confirm" data-panel="panel-sm" data-index="2">绑定</button>';
                var UNBIND_BUTTON = '<button class="btn confirm" onclick="mg.exeDeviceUnbind();">解绑</button>';
                var JSON_DATA = data['data'];
                TEMP_BUTTONS = 1 == JSON_DATA['IsBind'] ? TEMP_BUTTONS + UNBIND_BUTTON : TEMP_BUTTONS + BIND_BUTTON;
                $('#Lock_Bind_Btn').html(TEMP_BUTTONS);
                JSON_DATA['IsBind'] = 1 == JSON_DATA['IsBind'] ? '是' : '否';
                for (var KEY in JSON_DATA) {
                    $('#Lock_' + KEY).text(JSON_DATA[KEY]);
                }
                $('#Update_Device_Uuid').val(_this.DATA_UUID);
                $('#Update_Device_Name').val($('#Lock_Name').text().trim());
                $('#Update_Device_Number').val($('#Lock_SerialNumber').text().trim());
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestPowerDetail = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['POWER_DETAIL'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var TEMP_BUTTONS = '<button class="btn cancel">取消</button>';
                var BIND_BUTTON = '<button class="btn confirm" data-panel="panel-sm" data-index="2">绑定</button>';
                var UNBIND_BUTTON = '<button class="btn confirm" onclick="mg.exeDeviceUnbind();">解绑</button>';
                var JSON_DATA = data['data'];
                TEMP_BUTTONS = 1 == JSON_DATA['IsBind'] ? TEMP_BUTTONS + UNBIND_BUTTON : TEMP_BUTTONS + BIND_BUTTON;
                $('#Power_Bind_Btn').html(TEMP_BUTTONS);
                JSON_DATA['IsBind'] = 1 == JSON_DATA['IsBind'] ? '是' : '否';
                JSON_DATA['CapacityUpdateTime'] = webApp.parseDate(JSON_DATA['CapacityUpdateTime']);
                JSON_DATA['OverdraftUpdateTime'] = webApp.parseDate(JSON_DATA['OverdraftUpdateTime']);
                JSON_DATA['PowerTotalUpdateTime'] = webApp.parseDate(JSON_DATA['PowerTotalUpdateTime']);
                JSON_DATA['EnableStateUpdateTime'] = webApp.parseDate(JSON_DATA['EnableStateUpdateTime']);
                JSON_DATA['ConsumeAmountUpdateTime'] = webApp.parseDate(JSON_DATA['ConsumeAmountUpdateTime']);
                JSON_DATA['OnOffStateLastUpdateTime'] = webApp.parseDate(JSON_DATA['OnOffStateLastUpdateTime']);

                for (var KEY in JSON_DATA) {
                    $('#Power_' + KEY).text(JSON_DATA[KEY]);
                }
                $('#Update_Device_Uuid').val(_this.DATA_UUID);
                $('#Update_Device_Name').val($('#Power_Name').text().trim());
                $('#Update_Device_Number').val($('#Power_SerialNumber').text().trim());
                $(_this.POWER_STATUS).html(JSON_DATA['EnableState']);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestLockPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['LOCK_PASSWORD'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendChangePageLockPasswordTemplate(webApp.pageGetDataSet({
                    pageData: JSON_DATA,
                    pageSize: _this.PAGE_SIZE,
                    pageCode: _this.PAGE_INDEX
                }));
                new Pagination({
                    PAGINATION: '#PagPassword',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: JSON_DATA.length,
                    CHANGE_PAGE: function (pageCode) {
                        _this.appendChangePageLockPasswordTemplate(webApp.pageGetDataSet({
                            pageCode: pageCode,
                            pageData: JSON_DATA,
                            pageSize: _this.PAGE_SIZE
                        }));
                    }
                });
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestPowerBuyRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['POWER_BUY_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendPowerBuyRecordTemplate(JSON_DATA);
                new Pagination({
                    PAGINATION: '#PagPowerBuy',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG.POWER_BUY_REC);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestChangePagePowerBuyRecord(params);
                    }
                });
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.appendPowerBuyRecordTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-2">充值手机号</div>'
            + '<div class="column col-xs-12 col-md-1">充值金额</div>'
            + '<div class="column col-xs-12 col-md-1">购电量</div>'
            + '<div class="column col-xs-12 col-md-1">充值单价</div>'
            + '<div class="column col-xs-12 col-md-2">支付方式</div>'
            + '<div class="column col-xs-12 col-md-2">支付凭证</div>'
            + '<div class="column col-xs-12 col-md-3">购电时间</div>'
            + '</div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Phone'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Price'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Amount'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['UnitPrice'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['PayType'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['SerialNumber'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['PayTime'] + '</div>'
            + '</div></div></div></div>';
    }
    JSON_DATA = null;
    $('#PowerBuyRecord').html(TEMP_HTML);
    return this;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestChangePagePowerBuyRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['POWER_BUY_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendPowerBuyRecordTemplate(JSON_DATA);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestPowerUseRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['POWER_USE_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendPowerUseRecordTemplate(JSON_DATA);
                new Pagination({
                    PAGINATION: '#PagPowerUse',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG.POWER_USE_REC);
                        params['offset'] = _this.PAGE_SIZE * (pageCode - 1);
                        _this.ajaxRequestChangePagePowerUseRecord(params);
                    }
                });
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestChangePagePowerUseRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['POWER_USE_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendPowerUseRecordTemplate(JSON_DATA);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.appendPowerUseRecordTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        JSON_DATA['Time'] = webApp.parseDate(JSON_DATA['Time']);
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        JSON_DATA['TotalAmount'] = JSON_DATA['TotalAmount'] == -1 ? '未知' : JSON_DATA['TotalAmount'];
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-4">房间用电量</div>'
            + '<div class="column col-xs-12 col-md-4">剩余总量</div>'
            + '<div class="column col-xs-12 col-md-4">时间</div>'
            + '</div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['ConsumeAmount'] + '</div>'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['TotalAmount'] + '</div>'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['Time'] + '</div>'
            + '</div></div></div></div>';
    }
    JSON_DATA = null;
    $('#PowerUseRecord').html(TEMP_HTML);
    return this;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestPowerOperRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['POWER_OPER_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            // webApp.loading($(webApp.BLOCK_BODY));
            if (data['succ']) {
                var JSON_DATA = data['data']['op_list'];
                _this.appendPowerOperRecordTemplate(JSON_DATA);
                new Pagination({
                    PAGINATION: '#PagPowerOper',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.POWER_OPER_REC);
                        params['offset'] = _this.PAGE_SIZE * (pageCode - 1);
                        _this.ajaxRequestChangePagePowerOperRecord(params);
                    }
                });
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestChangePagePowerOperRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['POWER_OPER_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data']['op_list'];
                _this.appendPowerOperRecordTemplate(JSON_DATA);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.appendPowerOperRecordTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        JSON_DATA['timestamp'] = webApp.parseDate(JSON_DATA['timestamp']);
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-3">操作时间</div>'
            + '<div class="column col-xs-12 col-md-2">操作人</div>'
            + '<div class="column col-xs-12 col-md-2">操作人账号</div>'
            + '<div class="column col-xs-12 col-md-2">操作类型</div>'
            + '<div class="column col-xs-12 col-md-3">操作事件</div>'
            + '</div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['timestamp'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['operator']['name'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['operator']['id'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['op_id'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['description'] + '</div>'
            + '</div></div></div></div>';
    }
    JSON_DATA = null;
    $('#PowerOperRecord').html(TEMP_HTML);
    return this;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.appendChangePageLockPasswordTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        var TEMP_GRANT = JSON_DATA['Operation'].split('|');
        var TEMP_ISMANAGE = 1 == JSON_DATA['IsManage'] ? '管理密码' : '租客';
        var TEMP_END = webApp.parseDate(JSON_DATA['PasswordEndTime'] * 1000);
        var TEMP_BEGIN = webApp.parseDate(JSON_DATA['PasswordBeginTime'] * 1000);
        var TEMP_TIME = 1 == JSON_DATA['IsManage'] ? '永久有效'
            : ((0 == JSON_DATA['PasswordBeginTime'] || 0 == JSON_DATA['PasswordEndTime']) ? '永久有效' : TEMP_BEGIN + '至' + TEMP_END);
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12">'
            + '<div class="row-content row"><div class="row-header col-xs-6 col-md-12">'
            + '<div class="row-title' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-1">编号</div>'
            + '<div class="column col-xs-12 col-md-1">密码类型</div>'
            + '<div class="column col-xs-12 col-md-1">状态</div>'
            + '<div class="column col-xs-12 col-md-2">最近操作</div>'
            + '<div class="column col-xs-12 col-md-2">密码有效期</div>'
            + '<div class="column col-xs-12 col-md-1">姓名</div>'
            + '<div class="column col-xs-12 col-md-2">发送给（电话）</div>'
            + '<div class="column col-xs-12 col-md-2">操作</div></div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Id'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + TEMP_ISMANAGE + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['StateText'] + '</div>'
            + '<div class="column col-xs-12 col-md-2 cleanfont">'
            + '<span class="vertical">' + JSON_DATA['Description'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2 cleanfont">'
            + '<span class="vertical">' + TEMP_TIME + '</span></div>'
            + '<div class="column col-xs-12 col-md-1 cleanfont">'
            + '<span class="vertical">' + JSON_DATA['SendToName'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['SendToPhone'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">';
        for (var j = 0; j < TEMP_GRANT.length; j++) {
            var TEMP_SPLIT = j > 0 ? '/' : '';
            if ('' != TEMP_GRANT[j].trim()) {
                var TEMP_VALUE = this.GRANT_CONFIG[TEMP_GRANT[j]]['value'];
                var TEMP_CLASS = this.GRANT_CONFIG[TEMP_GRANT[j]]['class'];
                TEMP_HTML += TEMP_SPLIT + '<a href="javascript:void(0)" class="btn-' +
                    TEMP_CLASS + '" data-name="' + JSON_DATA['SendToName'] + '" data-begin="' + TEMP_BEGIN + '" ' +
                    ' data-end="' + TEMP_END + '" data-phone="' + JSON_DATA['SendToPhone'] + '" data-value="' +
                    JSON_DATA['Id'] + '">' + TEMP_VALUE + '</a>';
            }
        }
        TEMP_HTML += '</div></div></div></div></div>';
    }
    JSON_DATA = null;
    $('#Passwords').html(TEMP_HTML);
    return this;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestLockOpenRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['LOCK_OPEN_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                new Pagination({
                    PAGINATION: '#PageOpenLock',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG.LOCK_OPEN_REC);
                        params['offset'] = _this.PAGE_SIZE * (pageCode - 1);
                        _this.ajaxRequestChangePageLockOpenRecord(params);
                    }
                });
                _this.appendLockOpenRecordTemplate(JSON_DATA);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestChangePageLockOpenRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['LOCK_OPEN_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendLockOpenRecordTemplate(JSON_DATA);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.appendLockOpenRecordTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        JSON_DATA['Time'] = webApp.parseDate(JSON_DATA['Time']);
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12">'
            + '<div class="row-content row"><div class="row-header col-xs-6 col-md-12">'
            + '<div class="row-title ' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-4">密码编号</div>'
            + '<div class="column col-xs-12 col-md-4">开锁时间</div>'
            + '<div class="column col-xs-12 col-md-4">开门人</div></div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['PasswordId'] + '</div>'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['Time'] + '</div>'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['PasswordName'] + '</div>'
            + '</div></div></div></div>';
    }
    JSON_DATA = null;
    $('#LockOpenRecord').html(TEMP_HTML);
    return this;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestLockOperRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['LOCK_OPER_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                new Pagination({
                    PAGINATION: '#PageOperLock',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.LOCK_OPER_REC);
                        params['offset'] = _this.PAGE_SIZE * (pageCode - 1);
                        _this.ajaxRequestChangePageLockOperRecord(params);
                    }
                });
                _this.appendLockOperRecordTemplate(JSON_DATA);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestChangePageLockOperRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['LOCK_OPER_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendLockOperRecordTemplate(JSON_DATA);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.appendLockOperRecordTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var i = 0; i < params['op_list'].length; i++) {
        JSON_DATA = params['op_list'][i];
        JSON_DATA['timestamp'] = webApp.parseDate(JSON_DATA['timestamp']);
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-3">操作时间</div>'
            + '<div class="column col-xs-12 col-md-2">操作人</div>'
            + '<div class="column col-xs-12 col-md-2">操作人账号</div>'
            + '<div class="column col-xs-12 col-md-2">操作类型</div>'
            + '<div class="column col-xs-12 col-md-3">操作事件</div></div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['timestamp'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['operator']['name'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['operator']['id'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['op_id'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['description'] + '</div></div></div></div></div>';
    }
    JSON_DATA = null;
    $('#LockOperRecord').html(TEMP_HTML);
    return this;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestAddPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['ADD_PASSWORD'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeLockPassword();
                $('.panel-sm .show input').val('');
                messageBox.show("提示", '密码新增成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestDeletePassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['DELETE_PASSWORD'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", '密码删除成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
                _this.exeLockPassword();
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestUpdatePassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['UPDATE_PASSWORD'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeLockPassword();
                $('#Update_Pwd_Pwd').val('');
                messageBox.show("提示", '密码修改成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestResetPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG.RESET_PASSWORD,
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeLockPassword();
                messageBox.show("提示", '管理员密码重置成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestSelectPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['SELECT_PASSWORD'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_INFO = '密码:' + data['data'] + '(若管理密码在本地被修改，此密码值将无效，可通过重置设置新密码!)';
                messageBox.show("提示", JSON_INFO, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestFrozenPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['FROZEN_PASSWORD'],
        type: "POST",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", '密码冻结成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
                _this.exeLockPassword();
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestUnfrozenPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['UNFROZEN_PASSWORD'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", '密码解冻成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
                _this.exeLockPassword();
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestDeviceBind = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['DEVICE_BIND'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeBindCallBack();
                messageBox.show("提示", '绑定成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestPowerReset = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG.POWER_RESET,
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", '剩余电量清空成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestPowerSwitchOn = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG.POWER_SWITCH_ON,
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                $(_this.POWER_STATUS).html('合闸');
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestPowerSwitchOff = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG.POWER_SWITCH_OFF,
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                $(_this.POWER_STATUS).html('断电');
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestPowerRecharge = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG.POWER_RECHARGE,
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = '';
                var JSON_DATA = data['data'];
                for (var KEY in JSON_DATA) {
                    $('#Charge_' + KEY).text(JSON_DATA[KEY]);
                }
                JSON_DATA = data['exted'];
                for (var i = 0; i < JSON_DATA.length; i++) {
                    var TEMP_ACTIVE = i == 0 ? ' active' : '';
                    TEMP_HTML += '<li class="drop-option' + TEMP_ACTIVE + '" data-value="'
                        + JSON_DATA[i]['Key'] + '">' + JSON_DATA[i]['Value'] + '</li>';
                }
                $('#ChargePayMethod').html(TEMP_HTML);
                $('#ChargePayMethodResult').text($('#ChargePayMethod .active').text());
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestSavePowerRecharge = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG.POWER_RECHARGE,
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                messageBox.show("提示", '电费充值成功!', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestDeviceUnbind = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['DEVICE_UNBIND'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                _this.exeBindCallBack();
                messageBox.show("提示", '门锁解绑成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestGetDynamicPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['DYNAMIC_PASSWORD'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_DATE = webApp.parseDate(JSON_DATA['invalid_time'] * 1000);
                var TEMP_INFO = '动态密码为：' + JSON_DATA['password'] + ',有效期至' + TEMP_DATE;
                messageBox.show('提示', TEMP_INFO, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestGetNewPower = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG.GETNEW_POWER,
        type: "POST",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_INFO = '获取电量命令下达成功，等待设备返回...';
                messageBox.show('提示', TEMP_INFO, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @returns {Management}
 */
Management.prototype.exeGetNewPower = function () {
    var params = this.getParams(this.API_CONFIG.GETNEW_POWER);
    this.ajaxRequestGetNewPower(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeSavePowerRecharge = function () {
    if (this.saveChargeNotEmpty()) {
        var params = this.getParams(this.POWER_RECHARGE);
        this.ajaxRequestSavePowerRecharge(params);
    }
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exePowerReset = function () {
    var _this = this;
    messageBox.show('确认', '确认将剩余电量清零吗？', MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        var params = _this.getParams(_this.API_CONFIG.POWER_RESET);
        _this.ajaxRequestPowerReset(params);
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exePowerSwitch = function () {
    var _this = this;
    var TEMP_STATUS = $(_this.POWER_STATUS).text();
    var TEMP_SWITCH = '合闸' == TEMP_STATUS ? '断电' : '合闸';
    var TEMP_MESSAGE = '当前状态：' + TEMP_STATUS + '，确认' + TEMP_SWITCH + '吗？'
    messageBox.show('确认', TEMP_MESSAGE, MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        var params = null;
        if ('合闸' != TEMP_STATUS) {
            params = _this.getParams(_this.API_CONFIG.POWER_SWITCH_ON);
            _this.ajaxRequestPowerSwitchOn(params);
        } else {
            params = _this.getParams(_this.API_CONFIG.POWER_SWITCH_OFF);
            _this.ajaxRequestPowerSwitchOff(params);
        }
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeGetDynamicPassword = function () {
    var params = this.getParams(this.API_CONFIG.DYNAMIC_PASSWORD);
    this.ajaxRequestGetDynamicPassword(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exePowerOperRecord = function () {
    var params = this.getParams(this.POWER_OPER_REC);
    this.ajaxRequestPowerOperRecord(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeLockOpenRecord = function () {
    var params = this.getParams(this.API_CONFIG.LOCK_OPEN_REC);
    this.ajaxRequestLockOpenRecord(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeLockOperRecord = function () {
    var params = this.getParams(this.LOCK_OPER_REC);
    this.ajaxRequestLockOperRecord(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeLockPassword = function () {
    var params = this.getParams(this.API_CONFIG.LOCK_PASSWORD);
    this.ajaxRequestLockPassword(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeLockDetail = function () {
    var params = this.getParams(this.API_CONFIG.LOCK_DETAIL);
    this.ajaxRequestLockDetail(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exePowerDetail = function () {
    var params = this.getParams(this.API_CONFIG.POWER_DETAIL);
    this.ajaxRequestPowerDetail(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exePowerBuyRecord = function () {
    var params = this.getParams(this.API_CONFIG.POWER_BUY_REC);
    this.ajaxRequestPowerBuyRecord(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exePowerUseRecord = function () {
    var params = this.getParams(this.API_CONFIG.POWER_USE_REC);
    this.ajaxRequestPowerUseRecord(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeBindDevices = function () {
    var params = this.getParams(this.API_CONFIG.BIND_DEVICES);
    this.ajaxRequestBindDevices(params);
    return this;
}

/**
 *维修申请
 * @returns {Management}
 */
Management.prototype.feedback = function () {
    var params = this.getParams(this.API_CONFIG.BIND_DEVICES);
    this.ajaxRequestBindfeedback(params);
    return this;
}

/**
 *意见反馈
 * @returns {Management}
 */
Management.prototype.devicesApply = function () {
    var params = this.getParams(this.API_CONFIG.BIND_DEVICES);
    this.ajaxRequestBindDevicesApply(params);
    return this;
}

/**
 *通知提醒
 * @returns {Management}
 */
Management.prototype.informWarm = function () {
    var params = this.getParams(this.API_CONFIG.BIND_DEVICES);
    this.ajaxRequestBindInformWarm(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeBindFloor = function (selector) {
    var params = this.getParams(this.API_CONFIG.BIND_FLOOR);
    this.ajaxRequestBindFloor(params, selector);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeBindRooms = function (selector) {
    var params = this.getParams(this.API_CONFIG.BIND_ROOMS);
    this.ajaxRequestBindRooms(params, selector);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeAddDevices = function () {
    if (this.addDevicesNotEmpty()) {
        var params = this.getParams(this.API_CONFIG.ADD_DEVICES);
        this.ajaxRequestAddDevices(params);
        mp.hideSmPanel();
    }
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeBindLoad = function () {
    var params = this.getParams(this.API_CONFIG.BIND_LOAD);
    this.ajaxRequestBindLoad(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeAddPassword = function () {
    if (this.addPasswordNotEmpty()) {
        var params = this.getParams(this.API_CONFIG.ADD_PASSWORD);
        this.ajaxRequestAddPassword(params);
    }
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeDeletePassword = function () {
    var _this = this;
    $(document).on('click', '.btn-delete', function () {
        _this.PASSWORD_ID = $(this).attr('data-value').trim();
        messageBox.show('确认', '确认删除该密码吗？', MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            var params = _this.getParams(_this.API_CONFIG.DELETE_PASSWORD);
            _this.ajaxRequestDeletePassword(params);
        });
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeUpdatePassword = function () {
    if (this.updatePasswordNotEmpty()) {
        var params = this.getParams(this.API_CONFIG.UPDATE_PASSWORD);
        this.ajaxRequestUpdatePassword(params);
    }
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeResetPassword = function () {
    if (this.resetPasswordNotEmpty()) {
        var params = this.getParams(this.API_CONFIG.RESET_PASSWORD);
        this.ajaxRequestResetPassword(params);
    }
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeSelectPassword = function () {
    var _this = this;
    $(document).on('click', '.btn-select', function () {
        var params = _this.getParams(_this.API_CONFIG.SELECT_PASSWORD);
        _this.ajaxRequestSelectPassword(params);
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeFrozenPassword = function () {
    var _this = this;
    $(document).on('click', '.btn-frozen', function () {
        _this.PASSWORD_ID = $(this).attr('data-value').trim();
        messageBox.show('确认', '确认冻结该密码吗？', MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            var params = _this.getParams(_this.API_CONFIG.FROZEN_PASSWORD);
            _this.ajaxRequestFrozenPassword(params);
        });
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeUnfrozenPassword = function () {
    var _this = this;
    $(document).on('click', '.btn-unfrozen', function () {
        _this.PASSWORD_ID = $(this).attr('data-value').trim();
        messageBox.show('确认', '确认解冻该密码吗？', MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            var params = _this.getParams(_this.API_CONFIG.UNFROZEN_PASSWORD);
            _this.ajaxRequestUnfrozenPassword(params);
        });
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeDeviceBind = function () {
    if (this.deviceBindNotEmpty()) {
        var params = this.getParams(this.API_CONFIG.DEVICE_BIND);
        this.ajaxRequestDeviceBind(params);
    }
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeDeviceUnbind = function () {
    var _this = this;
    messageBox.show("确认", "确认解除绑定吗？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        var params = _this.getParams(_this.API_CONFIG.DEVICE_UNBIND);
        _this.ajaxRequestDeviceUnbind(params);
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeDeleteDevices = function () {
    var _this = this;
    messageBox.show("确认", "确认删除设备并解除绑定？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        mp.hideLgPanel();
        var params = _this.getParams(_this.API_CONFIG.DELETE_DEVICES);
        _this.ajaxRequestDeleteDevices(params);
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeUpdateDevices = function () {
    if (this.updateDevicesNotEmpty()) {
        var params = this.getParams(this.API_CONFIG.UPDATE_DEVICES);
        this.ajaxRequestUpdateDevices(params);
    }
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeBindCallBack = function () {
    $('#KeyEquRoom').html('');
    $('#KeyEquNumber').html('');
    $('.reset').html('请选择');
    this.exeBindLoad();
    var TAB_INDEX = $('#EquType .active').index();
    switch (TAB_INDEX) {
        case 0:
            this.exeLockDetail();
            break;
        case 1:
            this.exePowerDetail();
            break;
    }
    return this;
}
/**
 *
 * @param name
 * @returns {number}
 */
Management.prototype.getResult = function (name) {
    var TEMP_RESULT = 0;
    switch (name) {
        case this.ADD_PWD_START:
            TEMP_RESULT = $('#Pwd_Begin').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.ADD_PWD_END:
            TEMP_RESULT = $('#Pwd_End').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.UPDATE_PWD_START:
            TEMP_RESULT = $('#Update_Pwd_Begin').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.UPDATE_PWD_END:
            TEMP_RESULT = $('#Update_Pwd_End').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.LOCK_OPEN_START:
            TEMP_RESULT = $('#Lock_Open_Start').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.LOCK_OPEN_END:
            TEMP_RESULT = $('#Lock_Open_End').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.LOCK_OPER_START:
            TEMP_RESULT = $('#Lock_Oper_Start').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.LOCK_OPER_END:
            TEMP_RESULT = $('#Lock_Oper_End').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.POWER_BUY_START:
            TEMP_RESULT = $('#Power_Buy_Start').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.POWER_BUY_END:
            TEMP_RESULT = $('#Power_Buy_End').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.POWER_OPER_START:
            TEMP_RESULT = $('#Power_Oper_Start').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.POWER_OPER_END:
            TEMP_RESULT = $('#Power_Oper_End').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.POWER_USE_START:
            TEMP_RESULT = $('#Power_Use_Start').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.POWER_USE_END:
            TEMP_RESULT = $('#Power_Use_End').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.BUILDING_CHARID:
            var TEMP_OBJ = $('#EquBuilding .active');
            TEMP_RESULT = TEMP_OBJ[0] ? TEMP_OBJ.attr('data-value') : '';
            break;
        case this.BUILDROOM_CHARID:
            var TEMP_OBJ = $('#EquRoom .active');
            TEMP_RESULT = TEMP_OBJ[0] ? TEMP_OBJ.attr('data-value') : '';
            break;
        case this.BUILDFLOOR_CHARID:
            var TEMP_OBJ = $('#EquNumber .active');
            TEMP_RESULT = TEMP_OBJ[0] ? TEMP_OBJ.attr('data-value') : '';
            break;
    }
    return TEMP_RESULT;
}
/**
 *
 * @param name
 * @returns {*}
 */
Management.prototype.getParams = function (name) {
    var _this = this;
    var params = null;
    var TEMP_SELECTOR = '#' + _this.DROP_SELECTOR + ' .active';
    switch (name) {
        case this.API_CONFIG.BIND_LOAD:
            params = {
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.BIND_FLOOR:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingCharId: $(TEMP_SELECTOR).attr('data-value').trim()
            }
            break;
        case this.API_CONFIG.BIND_ROOMS:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingFloorCharId: $(TEMP_SELECTOR).attr('data-value').trim()
            }
            break;
        case this.API_CONFIG.ADD_DEVICES:
            params = {
                uuid: $('#Add_UUID').val().trim(),
                deviceName: $('#Add_Name').val().trim(),
                serialNumber: $('#Add_Number').val().trim(),
                requestKey: localStorage.getItem("requestKey"),
                deviceType: parseInt($('#Add_Type .active').attr('data-value').trim())
            }
            break;
        case this.API_CONFIG.BIND_DEVICES:
            params = {
                type: parseInt($(_this.TAB_BTN + '.active').attr('data-value')),
                isBind: parseInt($('#EquBind .active').attr('data-value')),
                pageSize: _this.PAGE_SIZE,
                pageIndex: _this.PAGE_INDEX,
                requestKey: localStorage.getItem("requestKey"),
                buildingCharId: _this.getResult(_this.BUILDING_CHARID),
                buildingRoomCharId: _this.getResult(_this.BUILDROOM_CHARID),
                buildingFloorCharId: _this.getResult(_this.BUILDFLOOR_CHARID),
            }
            break;
        case this.API_CONFIG.LOCK_DETAIL:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.LOCK_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.LOCK_OPEN_REC:
            params = {
                uuid: _this.DATA_UUID,
                count: _this.PAGE_SIZE,
                requestKey: localStorage.getItem("requestKey"),
                offset: _this.PAGE_SIZE * (_this.PAGE_INDEX - 1),
                end_time: _this.getResult(_this.LOCK_OPEN_END),
                start_time: _this.getResult(_this.LOCK_OPEN_START)
            }
            break;
        case this.LOCK_OPER_REC:
            params = {
                uuid: _this.DATA_UUID,
                count: _this.PAGE_SIZE,
                requestKey: localStorage.getItem("requestKey"),
                offset: _this.PAGE_SIZE * (_this.PAGE_INDEX - 1),
                end_time: _this.getResult(_this.LOCK_OPER_END),
                start_time: _this.getResult(_this.LOCK_OPER_START)
            }
            break;
        case this.API_CONFIG.POWER_DETAIL:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.POWER_BUY_REC:
            params = {
                uuid: _this.DATA_UUID,
                pageSize: _this.PAGE_SIZE,
                pageIndex: _this.PAGE_INDEX,
                requestKey: localStorage.getItem("requestKey"),
                endTime: _this.getResult(_this.POWER_BUY_END),
                startTime: _this.getResult(_this.POWER_BUY_START)
            }
            break;
        case this.API_CONFIG.POWER_USE_REC:
            params = {
                count: _this.PAGE_SIZE,
                uuid: _this.DATA_UUID,
                start_time: _this.getResult(_this.POWER_USE_START),
                end_time: _this.getResult(_this.POWER_USE_END),
                offset: _this.PAGE_SIZE * (_this.PAGE_INDEX - 1),
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.POWER_OPER_REC:
            params = {
                uuid: _this.DATA_UUID,
                count: _this.PAGE_SIZE,
                requestKey: localStorage.getItem("requestKey"),
                offset: _this.PAGE_SIZE * (_this.PAGE_INDEX - 1),
                end_time: _this.getResult(_this.POWER_OPER_END),
                start_time: _this.getResult(_this.POWER_OPER_START)
            }
            break;
        case this.API_CONFIG.ADD_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                name: $('#Pwd_Name').val().trim(),
                password: $('#Pwd_Pwd').val().trim(),
                phonenumber: $('#Pwd_Phone').val().trim(),
                requestKey: localStorage.getItem("requestKey"),
                permission_end: _this.getResult(_this.ADD_PWD_END),
                permission_begin: _this.getResult(_this.ADD_PWD_START)
            }
            break;
        case this.API_CONFIG.UPDATE_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                password_id: _this.PASSWORD_ID,
                name: $('#Update_Pwd_Name').val().trim(),
                password: $('#Update_Pwd_Pwd').val().trim(),
                phonenumber: $('#Update_Pwd_Phone').val().trim(),
                permission_end: _this.getResult(_this.UPDATE_PWD_END),
                permission_begin: _this.getResult(_this.UPDATE_PWD_START),
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.DELETE_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                password_id: _this.PASSWORD_ID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.SELECT_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.FROZEN_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                password_id: _this.PASSWORD_ID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.UNFROZEN_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                password_id: _this.PASSWORD_ID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.DEVICE_BIND:
            params = {
                deviceCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $('#KeyEquRoom .active').attr('data-value').trim()
            }
            break;
        case this.API_CONFIG.DEVICE_UNBIND:
            params = {
                deviceCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.DYNAMIC_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.POWER_RESET:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.POWER_SWITCH_ON:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.POWER_SWITCH_OFF:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.POWER_RECHARGE:
            params = {
                deviceCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.POWER_RECHARGE:
            params = {
                contractCharId: '',
                uuid: _this.DATA_UUID,
                deviceCharId: _this.DATA_VALUE,
                price: $('#PowerPrice').val().trim(),
                amount: $('#PowerAmount').val().trim(),
                phone: $('#Charge_Phone').text().trim(),
                serialNumber: $('#PowerNumber').val().trim(),
                requestKey: localStorage.getItem("requestKey"),
                description: $('#PowerDescription').val().trim(),
                unitPrice: $('#Charge_EleUnitPrice').text().trim(),
                payParameterCharId: $('#ChargePayMethod .active').attr('data-value').trim(),
            }
            break;
        case this.API_CONFIG.UPDATE_DEVICES:
            params = {
                uuid: _this.DATA_UUID,
                serialNumber: '',
                deviceCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.DELETE_DEVICES:
            params = {
                deviceCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.GETNEW_POWER:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.RESET_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                password: $('#Reset_Password').val().trim(),
                requestKey: localStorage.getItem("requestKey")
            }
            break;
    }
    return params;
}
/**
 *
 * @type {Management}
 */
var mg = new Management();


