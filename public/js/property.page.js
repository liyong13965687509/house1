/**
 *
 * @constructor
 */
function PropertyPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.ACTIVE = arguments['ACTIVE'] ? arguments['ACTIVE'] : ' active';
    this.SELECTOR = arguments['SELECTOR'] ? arguments['SELECTOR'] : '';
    this.PAGE_SIZE = arguments['PAGE_SIZE'] ? arguments['PAGE_SIZE'] : 10;
    this.PAGE_INDEX = arguments['PAGE_INDEX'] ? arguments['PAGE_INDEX'] : 1;
    this.DATA_VALUE = arguments['DATA_VALUE'] ? arguments['DATA_VALUE'] : '';
    this.COMM_VALUE = arguments['COMM_VALUE'] ? arguments['COMM_VALUE'] : '';
    this.PAGINATION = arguments['PAGINATION'] ? arguments['PAGINATION'] : null;
    this.BTN_BUILD = arguments['BTN_BUILD'] ? arguments['BTN_BUILD'] : '.btn-build';
    this.HOUSE_ADD = arguments['HOUSE_ADD'] ? arguments['HOUSE_ADD'] : '.house-add';
    this.tabComponent = arguments['tabComponent'] ? arguments['tabComponent'] : null;
    this.HOUSE_EDIT = arguments['HOUSE_EDIT'] ? arguments['HOUSE_EDIT'] : '.house-edit';
    this.BUILD_ITEM = arguments['BUILD_ITEM'] ? arguments['BUILD_ITEM'] : '.build-item>a';
    this.UPDATE_ROOM = arguments['UPDATE_ROOM'] ? arguments['UPDATE_ROOM'] : 'UPDATE_ROOM';
    this.HOUSE_BLOCK = arguments['HOUSE_BLOCK'] ? arguments['HOUSE_BLOCK'] : '.house-block';
    this.ADD_RECORD = arguments['ADD_RECORD'] ? arguments['ADD_RECORD'] : 'ADD_RECORD';
    this.BIND_RECORD = arguments['BIND_RECORD'] ? arguments['BIND_RECORD'] : 'BIND_RECORD';
    this.ADD_SERVICE = arguments['ADD_SERVICE'] ? arguments['ADD_SERVICE'] : 'ADD_SERVICE';
    this.BIND_SERVICE = arguments['BIND_SERVICE'] ? arguments['BIND_SERVICE'] : 'BIND_SERVICE';
    this.KEYWORDS = arguments['KEYWORDS'] ? arguments['KEYWORDS'] : $('#keywords').val().trim();
    this.FILTER_STATE = arguments['FILTER_STATE'] ? arguments['FILTER_STATE'] : '#RoomState>li';
    this.WATER_RECORDS = arguments['WATER_RECORDS'] ? arguments['WATER_RECORDS'] : 'WATER_RECORDS';
    this.POWER_RECORDS = arguments['POWER_RECORDS'] ? arguments['POWER_RECORDS'] : 'POWER_RECORDS';
    this.BIND_EDITROOM = arguments['BIND_EDITROOM'] ? arguments['BIND_EDITROOM'] : 'BIND_EDITROOM';
    this.ADD_CONTRACT = arguments['ADD_CONTRACT'] ? arguments['ADD_CONTRACT'] : 'ADD_CONTRACT';
    this.BIND_CONTRACT = arguments['BIND_CONTRACT'] ? arguments['BIND_CONTRACT'] : 'BIND_CONTRACT';
    this.DELETE_RECORD = arguments['DELETE_RECORD'] ? arguments['DELETE_RECORD'] : '.delete-record';
    this.DELETE_SERVICE = arguments['DELETE_SERVICE'] ? arguments['DELETE_SERVICE'] : '.delete-service';
    this.CHECK_CONTRACT = arguments['CHECK_CONTRACT'] ? arguments['CHECK_CONTRACT'] : '.check-contract';
    this.STATE = arguments['STATE'] ? arguments['STATE'] : $('#RoomState .active').attr('data-value').trim();

    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        BIND_BUILDING: '/building/buildings',
        BUILDING_DETAIL: '/building',
        ADD_BUILDING: '/building/add',
        DELETE_BUILDING: '/building/delete',
        UPDATE_BUILDING: '/building/update',
        BIND_PROVINCE: '/building/province',
        BIND_CITY: '/building/city',
        BIND_DISTRICT: '/building/district',
        EDIT_BUILDING: '/building/Update',
        BIND_FLOORS: '/building/floors',
        ADD_FLOOR: '/building/floor/add',
        DELETE_FLOOR: '/building/floor/delete',
        UPDATE_FLOOR: '/building/floor/update',
        BIND_ROOMS: '/building/rooms',
        ADD_ROOM: '/building/room/add',
        DELETE_ROOM: '/building/room/delete',
        UPDATE_ROOM: '/building/room/update',
        ROOM_DETAIL: '/building/room',
        SERVICE_RECORDS: '/building/servicerecords',
        READ_RECORDS: '/building/readrecords',
        ROOM_STATE: '/building/room/state',
        HISTORY_CONTRACTS: '/contract/historycontracts',
        ADD_SERVICE: '/building/servicerecord/add',
        DELETE_SERVICE: '/building/servicerecord/delete',
        ADD_RECORD: '/building/readrecord/add',
        DELETE_RECORD: '/building/readrecord/delete',
        CHECK_CONTRACT: '/contract',
        ADD_CONTRACT: '/contract/add',
        BIND_EMPLOYEE: '/employee/employees'
    };

    this.init();
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.init = function () {
    var _this = this;
    ComponentsPickers.init();
    App.init();

    this.startMove();
    this.tabChange();
    this.selectTag();
    this.exeAddRoom();
    this.filterRooms();
    this.buildItemClick();
    this.exeBindBuilding();
    this.exeBindProvince();
    this.selectDropOption();
    this.clickBtnBuildDetail();
    this.showHouseBlockModal();
    this.showFloorEditModal();
    this.exeDeleteService();
    this.exeDeleteRecord();
    this.showCheckContractModal();

    tm.customerClickTreeItem(function () {
        _this.exeBindEmployee();
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.startMove = function () {
    $(document).on('click', '#floors>li', function () {
        var index = $(this).index();
        var iHeight = $('.room-header').outerHeight() + 25;
        var scrollTop = $('.house-group').eq(index).position().top - iHeight;
        var totalScrollTop = scrollTop + $('#Rooms').scrollTop();
        $('#Rooms').animate({
            scrollTop: totalScrollTop
        });
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.filterRooms = function () {
    var _this = this;
    $(document).on('click', this.FILTER_STATE, function () {
        _this.DATA_VALUE = $('#Buildings .active a').attr('data-value').trim();
        $(_this.FILTER_STATE).removeClass(_this.ACTIVE.trim());
        $(this).addClass(_this.ACTIVE.trim());
        _this.STATE = $(this).attr('data-value').trim();
        _this.exeBindRooms();
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.buildItemClick = function () {
    var _this = this;
    $(document).on('click', this.BUILD_ITEM, function () {
        var TEMP_PARENT = '.' + $(this).parent().attr('class');
        $(TEMP_PARENT).removeClass(_this.ACTIVE);
        $(this).parent().addClass(_this.ACTIVE);
        _this.DATA_VALUE = $(this).attr('data-value');
        _this.exeBindFloors();
        _this.exeBindRooms();
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.showFloorEditModal = function () {
    var _this = this;
    $(document).on('click', this.HOUSE_EDIT, function () {
        var that = this;
        _this.DATA_VALUE = $(this).attr('data-value');
        mp.manualShowPanel({
            index: 2,
            element: '.panel-sm',
            complete: function () {
                $('#BuildName').val($(that).attr('data-build'));
                $('#FloorName').val($(that).attr('data-floor'));
            }
        });
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.showAddBuildModal = function () {
    mp.manualShowPanel({
        index: 0,
        element: '.panel-sm',
        complete: function () {

        }
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.showEditBuildModal = function () {
    var _this = this;
    mp.manualShowPanel({
        index: 1,
        element: '.panel-sm',
        complete: function () {
            _this.exeEditBuilding();
        }
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.showHouseBlockModal = function () {
    var _this = this;
    $(document).on('click', this.HOUSE_BLOCK, function () {
        var that = this;
        mp.manualShowPanel({
            index: 0,
            element: '.panel-lg',
            complete: function () {
                _this.DATA_VALUE = $(that).attr('data-value');
                _this.tabComponent.tabReset();
            }
        });
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.showUpdateRoomModal = function () {
    var _this = this;
    mp.manualShowPanel({
        index: 3,
        element: '.panel-sm',
        complete: function () {
            _this.exeBindEditRoom();
        }
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.showAddServiceModal = function () {
    var _this = this;
    mp.manualShowPanel({
        index: 4,
        element: '.panel-sm',
        complete: function () {
            _this.exeBindService();
        }
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.showAddRecordModal = function () {
    var _this = this;
    mp.manualShowPanel({
        index: 5,
        element: '.panel-sm',
        complete: function () {
            _this.exeBindRecord();
        }
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.showAddContractModal = function () {
    var _this = this;
    mp.manualShowPanel({
        index: 7,
        element: '.panel-sm',
        complete: function () {
            _this.exeBindContract();
        }
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.customerSele = function () {
    var TEMP_STYLE = 'width=500,height=600,top=50,left=300, scrollbars=no,' +
        ' status=no,toolbar=no,menubar=no,location=no,resizable=no,titlebar=no';
    window.open("customersel.html", '', TEMP_STYLE);
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.historyContactAdd = function () {
    var TEMP_STYLE = 'width=500,height=600,top=50,left=300, scrollbars=no,' +
        ' status=no,toolbar=no,menubar=no,location=no,resizable=no,titlebar=no';
    window.open("historyAdd.html?curRoomCharId=" + this.DATA_VALUE, '', TEMP_STYLE);
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.showCheckContractModal = function () {
    var _this = this;
    $(document).on('click', this.CHECK_CONTRACT, function () {
        _this.COMM_VALUE = $(this).attr('data-value').trim();
        mp.manualShowPanel({
            index: 8,
            element: '.panel-sm',
            complete: function () {
                _this.exeCheckContract();
            }
        });
    });
    return this;
}
/**
 *
 * @returns {boolean}
 */
PropertyPage.prototype.addContractNotEmpty = function () {
    var CHECK_MESSAGE = "";
    var CHECK_RESULT = false;
    if ('' == $('#AddContract_Name').val().trim()) {
        CHECK_MESSAGE = "请选择客户！";
    } else if ('' == $('#AddContract_Price').val().trim()) {
        CHECK_MESSAGE = "请输入租金！";
    } else if ('' == $('#AddContract_Deposit').val().trim()) {
        CHECK_MESSAGE = "请输入押金！";
    } else if ('' == $('#AddContract_InDate').val().trim()) {
        CHECK_MESSAGE = "请选择起租日期！";
    } else if ('' == $('#AddContract_OutDate').val().trim()) {
        CHECK_MESSAGE = "请选择退租日期！";
    } else if ('' == $('#AddContract_Persons').val().trim()) {
        CHECK_MESSAGE = "请输入入住人数！";
    } else if (undefined == $('#AddContract_Dpts .active')[0]) {
        CHECK_MESSAGE = "请选择签约部门！";
    } else if (undefined == $('#AddContract_Employee .active')[0]) {
        CHECK_MESSAGE = "请选择签约员工！";
    } else if ('' == $('#BargainDate').val().trim()) {
        CHECK_MESSAGE = "请选择签约日期！";
    } else {
        CHECK_RESULT = true;
    }
    if (!CHECK_RESULT) {
        messageBox.show("提示", CHECK_MESSAGE, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return CHECK_RESULT;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestAddContract = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.ADD_CONTRACT,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeBindBuilding();
                _this.exeBindRooms();
                messageBox.show("提示", '合同新增成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeAddContract = function () {
    if (this.addContractNotEmpty()) {
        var params = this.getParams(this.ADD_CONTRACT);
        this.ajaxRequestAddContract(params);
    }
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestBindEmployee = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.BIND_EMPLOYEE,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlBindEmployee(data);
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
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlBindEmployee = function (data) {
    var TEMP_HTML = '';
    var TEMP_DATA = null;
    var JSON_DATA = data['data'];
    for (var i = 0; i < JSON_DATA.length; i++) {
        TEMP_DATA = JSON_DATA[i];
        TEMP_HTML += '<li class="drop-option" data-value="'
            + TEMP_DATA['CharId'] + '">' + TEMP_DATA['Name'] + '</li>';
    }
    $('#AddContract_Employee').html(TEMP_HTML);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeBindEmployee = function () {
    this.COMM_VALUE = $('#AddContract_Dpts .active').attr('data-value').trim();
    var params = this.getParams(this.API_CONFIG.BIND_EMPLOYEE);
    this.ajaxRequestBindEmployee(params);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestBindContract = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.ADD_CONTRACT,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlBindContract(data);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeBindContract = function () {
    var params = this.getParams(this.BIND_CONTRACT);
    this.ajaxRequestBindContract(params);
    return this;
}
/**
 *
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlBindContract = function (data) {
    var TEMP_DATA = null;
    var JSON_DATA = data['data'];
    var TEMP_HTML = '', TEMP_NAME = '';
    $('#AddContract_Number').val(JSON_DATA['ContractNum']);
    for (var i = 0; i < JSON_DATA['PayType'].length; i++) {
        TEMP_DATA = JSON_DATA['PayType'][i];
        TEMP_NAME = i == 0 ? this.ACTIVE : '';
        TEMP_HTML += '<li class="drop-option' + TEMP_NAME + '" data-value="'
            + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
    }
    $('#AddContract_Payment').html(TEMP_HTML);
    $('#AddContract_PaymentResult').text($('#AddContract_Payment .active').text().trim());

    JSON_DATA = data['data']['Dpts'];
    TEMP_HTML = tm.customerGetTemplate(JSON_DATA);
    $(".tree-menu").html(TEMP_HTML);

    JSON_DATA = data['data']['Room'];
    var TEMP_BUILD = JSON_DATA['BuildingName']
        + JSON_DATA['FloorName'] + '楼'
        + JSON_DATA['RoomName'] + '室';
    var TEMP_LAYOUT = JSON_DATA['Div1'] + '室'
        + JSON_DATA['Div2'] + '厅'
        + JSON_DATA['Div3'] + '卫';
    $('#AddContract_BuildingName').val(TEMP_BUILD);
    $('#AddContract_Layout').val(TEMP_LAYOUT);
    $('#AddContract_Square').val(JSON_DATA['Square']);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeCheckContract = function () {
    var params = this.getParams(this.API_CONFIG.CHECK_CONTRACT);
    this.ajaxRequestCheckContract(params);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestCheckContract = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.CHECK_CONTRACT,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlContractDetail(data);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.appendHtmlContractDetail = function (data) {
    var JSON_DATA = data['data'];
    for (var Key in JSON_DATA) {
        $('#' + Key + '_Detail').text(JSON_DATA[Key]);
    }
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeDeleteRecord = function () {
    var _this = this;
    $(document).on('click', this.DELETE_RECORD, function () {
        _this.COMM_VALUE = $(this).attr('data-value').trim();
        messageBox.show('确认', '确认删除当前抄表记录？', MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            var params = _this.getParams(_this.API_CONFIG.DELETE_RECORD);
            _this.ajaxRequestDeleteRecord(params);
        });
    });
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestDeleteRecord = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.DELETE_RECORD,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.exeWaterReadRecords();
                _this.exePowerReadRecords();
                messageBox.show("提示", '抄表记录删除成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeAddRecord = function () {
    var params = this.getParams(this.ADD_RECORD);
    this.ajaxRequestAddRecord(params);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestAddRecord = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.ADD_RECORD,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeWaterReadRecords();
                _this.exePowerReadRecords();
                messageBox.show("提示", '抄表记录新增成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeBindRecord = function () {
    var params = this.getParams(this.BIND_RECORD);
    this.ajaxRequestBindRecord(params);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestBindRecord = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.ADD_RECORD,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlBindRecord(data);
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
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlBindRecord = function (data) {
    var TEMP_DATA = null;
    var JSON_DATA = data['data'];
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var i = 0; i < JSON_DATA.length; i++) {
        TEMP_DATA = JSON_DATA[i];
        TEMP_NAME = i == 0 ? this.ACTIVE : '';
        TEMP_HTML += '<li class="drop-option' + TEMP_NAME + '" data-value="'
            + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
    }
    $('#RecordProject').html(TEMP_HTML);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeDeleteService = function () {
    var _this = this;
    $(document).on('click', this.DELETE_SERVICE, function () {
        _this.COMM_VALUE = $(this).attr('data-value').trim();
        messageBox.show('确认', '确认删除当前维修记录？', MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            var params = _this.getParams(_this.API_CONFIG.DELETE_SERVICE);
            _this.ajaxRequestDeleteService(params);
        });
    });
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestDeleteService = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.DELETE_SERVICE,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.exeServiceRecords();
                messageBox.show("提示", '维修记录删除成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeAddService = function () {
    var params = this.getParams(this.ADD_SERVICE);
    this.ajaxRequestAddService(params);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestAddService = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.ADD_SERVICE,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeServiceRecords();
                messageBox.show("提示", '维修新增成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeBindService = function () {
    var params = this.getParams(this.BIND_SERVICE);
    this.ajaxRequestBindService(params);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestBindService = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.ADD_SERVICE,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlBindService(data);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.appendHtmlBindService = function (data) {
    var TEMP_DATA = null;
    var JSON_DATA = data['data'];
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var Key in JSON_DATA) {
        for (var i = 0; i < JSON_DATA[Key].length; i++) {
            TEMP_DATA = JSON_DATA[Key][i];
            TEMP_NAME = i == 0 ? this.ACTIVE : '';
            TEMP_HTML += '<li class="drop-option' + TEMP_NAME + '" data-value="'
                + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
        }
        $('#Add' + Key).html(TEMP_HTML);
        TEMP_HTML = '';
    }
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeAddRoom = function () {
    var _this = this;
    $(document).on('click', this.HOUSE_ADD, function () {
        _this.DATA_VALUE = $(this).attr('data-value').trim();
        var params = _this.getParams(_this.API_CONFIG.ADD_ROOM);
        _this.ajaxRequestAddRoom(params);
    });
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestAddRoom = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.ADD_ROOM,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlAddRoom(data);
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
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlAddRoom = function (data) {
    var JSON_DATA = data['data'];
    var TEMP_SELECTOR = '.house-add[data-value="' + this.DATA_VALUE + '"]';
    var TEMP_HTML = '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 house-item state1">'
        + '<h4 class="house-number">' + JSON_DATA['roomName'] + '室</h4>'
        + '<div class="house-block" data-value="' + JSON_DATA['charId'] + '">'
        + '<span>' + JSON_DATA['state'] + '</span></div></div>';
    $(TEMP_SELECTOR).parents('.house-item').before(TEMP_HTML);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeUpdateRoom = function () {
    var params = this.getParams(this.UPDATE_ROOM);
    this.ajaxRequestUpdateRoom(params);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestUpdateRoom = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.UPDATE_ROOM,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeRoomDetail();
                messageBox.show("提示", '房间信息更新成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestBindEditRoom = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.UPDATE_ROOM,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlBindEditRoom(data);
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
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlBindEditRoom = function (data) {
    var TEMP_HTML = '';
    var TEMP_DATA = null;
    var JSON_DATA = data['data'];
    JSON_DATA['Name'] = JSON_DATA['BuildingName']
        + JSON_DATA['FloorName'] + '层';
    for (var Key in JSON_DATA) {
        $('#Update' + Key).val(JSON_DATA[Key]);
    }

    JSON_DATA = data['exted'];
    for (var Key in JSON_DATA) {
        for (var i = 0; i < JSON_DATA[Key].length; i++) {
            TEMP_DATA = JSON_DATA[Key][i];
            TEMP_HTML += '<li class="tag" data-value="'
                + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
        }
        $('#Update' + Key).html(TEMP_HTML);
        TEMP_HTML = '';
    }

    JSON_DATA = data['data'];
    TEMP_DATA = JSON_DATA['Alloc'].split('|');
    for (var i = 0; i < TEMP_DATA.length; i++) {
        var TEMP_SELECTOR = '#UpdateRoomAlloc li[data-value="' + TEMP_DATA[i] + '"]';
        $(TEMP_SELECTOR).addClass(this.ACTIVE);
    }

    TEMP_DATA = JSON_DATA['Tag'].split('|');
    for (var i = 0; i < TEMP_DATA.length; i++) {
        var TEMP_SELECTOR = '#UpdateRoomTag li[data-value="' + TEMP_DATA[i] + '"]';
        $(TEMP_SELECTOR).addClass(this.ACTIVE);
    }
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeBindEditRoom = function () {
    var params = this.getParams(this.BIND_EDITROOM);
    this.ajaxRequestBindEditRoom(params);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestDeleteRoom = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.DELETE_ROOM,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                mp.hideLgPanel();
                _this.exeBindBuilding();
                messageBox.show("提示", '房间删除成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeDeleteRoom = function () {
    var _this = this;
    messageBox.show('确认', '确认删除当前房间吗？', MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        var params = _this.getParams(_this.API_CONFIG.DELETE_ROOM);
        _this.ajaxRequestDeleteRoom(params);
    });
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestHistoryContracts = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.HISTORY_CONTRACTS,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendHtmlHistoryContracts(JSON_DATA);
                _this.PAGINATION = new Pagination({
                    PAGINATION: '#History_Pagination',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        _this.PAGE_INDEX = pageCode;
                        params = _this.getParams(_this.API_CONFIG.HISTORY_CONTRACTS);
                        _this.ajaxRequestChangePageHistoryContracts(params);
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
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeHistoryContracts = function () {
    var params = this.getParams(this.API_CONFIG.HISTORY_CONTRACTS);
    this.ajaxRequestHistoryContracts(params);
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlHistoryContracts = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12">'
            + '<div class="row-content row"><div class="row-header col-xs-6 col-md-12">'
            + '<div class="row-title ' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-2">租客</div>'
            + '<div class="column col-xs-12 col-md-3">周期</div>'
            + '<div class="column col-xs-12 col-md-2">租金</div>'
            + '<div class="column col-xs-12 col-md-3">退租时间</div>'
            + '<div class="column col-xs-12 col-md-2">操作</div></div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['CustomerName'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['InDate'] + '~' + JSON_DATA['OutDate'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Price'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['EndDate'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">'
            + '<a href="javascript:void(0);" class="check-contract" data-value="'
            + JSON_DATA['CharId'] + '">查看</a></div></div></div></div></div>';
    }
    $('#History_Record').html(TEMP_HTML);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestChangePageHistoryContracts = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.HISTORY_CONTRACTS,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendHtmlHistoryContracts(JSON_DATA);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestRoomState = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.ROOM_STATE,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                for (var Key in JSON_DATA) {
                    $('#Contract_' + Key).text(JSON_DATA[Key]);
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
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeRoomState = function () {
    var params = this.getParams(this.API_CONFIG.ROOM_STATE);
    this.ajaxRequestRoomState(params);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestWaterReadRecords = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.READ_RECORDS,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendHtmlWaterReadRecords(JSON_DATA);
                _this.PAGINATION = new Pagination({
                    PAGINATION: '#Water_Pagination',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        _this.PAGE_INDEX = pageCode;
                        params = _this.getParams(_this.WATER_RECORDS);
                        _this.ajaxRequestChangePageWaterReadRecords(params);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestChangePageWaterReadRecords = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.READ_RECORDS,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendHtmlWaterReadRecords(JSON_DATA);
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
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlWaterReadRecords = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '',TEMP_DEL;
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        TEMP_DEL=webApp.grantControl($(".readrecord_delete"), "readrecord_delete")?'删除':'';
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12">'
            + '<div class="row-content row"><div class="row-header col-xs-6 col-md-12">'
            + '<div class="row-title ' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-4">日期</div>'
            + '<div class="column col-xs-12 col-md-4">水（吨）</div>'
            + '<div class="column col-xs-12 col-md-4">操作</div></div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['RecordDate'] + '</div>'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['Mark'] + '</div>'
            + '<div class="column col-xs-12 col-md-4">'
            + '<a href="javascript:void(0);" class="delete-record" data-value="'
            + JSON_DATA['CharId'] + '">'+TEMP_DEL+'</a></div></div></div></div></div>';
    }
    $('#Water_Record').html(TEMP_HTML);
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeWaterReadRecords = function () {
    var params = this.getParams(this.WATER_RECORDS);
    this.ajaxRequestWaterReadRecords(params);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestPowerReadRecords = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.READ_RECORDS,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendHtmlPowerReadRecords(JSON_DATA);
                _this.PAGINATION = new Pagination({
                    PAGINATION: '#Power_Pagination',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        _this.PAGE_INDEX = pageCode;
                        params = _this.getParams(_this.POWER_RECORDS);
                        _this.ajaxRequestChangePagePowerReadRecords(params);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestChangePagePowerReadRecords = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.READ_RECORDS,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendHtmlPowerReadRecords(JSON_DATA);
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
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlPowerReadRecords = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '',TEMP_DEL;
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        TEMP_DEL=webApp.grantControl($(".readrecord_delete"), "readrecord_delete")?'删除':'';
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12">'
            + '<div class="row-content row"><div class="row-header col-xs-6 col-md-12">'
            + '<div class="row-title ' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-4">日期</div>'
            + '<div class="column col-xs-12 col-md-4">电（度）</div>'
            + '<div class="column col-xs-12 col-md-4">操作</div></div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['RecordDate'] + '</div>'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['Mark'] + '</div>'
            + '<div class="column col-xs-12 col-md-4">'
            + '<a href="javascript:void(0);" class="delete-record" data-value="'
            + JSON_DATA['CharId'] + '">'+TEMP_DEL+'</a></div></div></div></div></div>';
    }
    $('#Power_Record').html(TEMP_HTML);
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exePowerReadRecords = function () {
    var params = this.getParams(this.POWER_RECORDS);
    this.ajaxRequestPowerReadRecords(params);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestServiceRecords = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.SERVICE_RECORDS,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendHtmlServiceRecords(JSON_DATA);
                _this.PAGINATION = new Pagination({
                    PAGINATION: '#Repair_Pagination',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: parseInt(data['exted']['totalNum']),
                    CHANGE_PAGE: function (pageCode) {
                        _this.PAGE_INDEX = pageCode;
                        params = _this.getParams(_this.API_CONFIG.SERVICE_RECORDS);
                        _this.ajaxRequestChangePageServiceRecords(params);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestChangePageServiceRecords = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.SERVICE_RECORDS,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendHtmlServiceRecords(JSON_DATA);
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
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlServiceRecords = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '', TEMP_DEL;
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_DEL = webApp.grantControl($(".servicerecord_delete"), "servicerecord_delete") ? '删除' : '';
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12">'
            + '<div class="row-content row"><div class="row-header col-xs-6 col-md-12">'
            + '<div class="row-title ' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-3">维修项目</div>'
            + '<div class="column col-xs-12 col-md-2">维修费（元）</div>'
            + '<div class="column col-xs-12 col-md-2">承担方</div>'
            + '<div class="column col-xs-12 col-md-3">日期</div>'
            + '<div class="column col-xs-12 col-md-2">操作</div></div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['ServiceValue'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Price'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Object'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['CreateTime'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">'
            + '<a href="javascript:void(0);" class="delete-service" data-value="'
            + JSON_DATA['CharId'] + '">'+TEMP_DEL+'</a></div></div></div></div></div>';
    }
    $('#Repair_Record').html(TEMP_HTML);
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeServiceRecords = function () {
    var params = this.getParams(this.API_CONFIG.SERVICE_RECORDS);
    this.ajaxRequestServiceRecords(params);
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestDeleteFloor = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.DELETE_FLOOR,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeBindBuilding();
                messageBox.show("提示", '楼层删除成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestUpdateFloor = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.UPDATE_FLOOR,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.DATA_VALUE=$('#Buildings .active a').attr('data-value').trim();
                _this.exeBindFloors();
                _this.exeBindRooms();
                messageBox.show("提示", '楼层更新成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 执行绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param data 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeUpdateFloor = function () {
    var params = this.getParams(this.API_CONFIG.UPDATE_FLOOR);
    this.ajaxRequestUpdateFloor(params);
    return this;
}
/**
 * BEGIN 执行绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param data 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeDeleteFloor = function () {
    var _this = this;
    messageBox.show('确认', '确认删除当前楼层吗？', MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        var params = _this.getParams(_this.API_CONFIG.DELETE_FLOOR);
        _this.ajaxRequestDeleteFloor(params);
    });
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestBindFloors = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.BIND_FLOORS,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlBindFloors(data);
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
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestBindRooms = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.BIND_ROOMS,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlBindRooms(data);
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
 * @returns {PropertyPage}
 */
PropertyPage.prototype.ajaxRequestRoomDetail = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.ROOM_DETAIL,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlRoomDetail(data);
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
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlRoomDetail = function (data) {
    var JSON_DATA = data['data'];
    var TEMP_HTML = '<button class="btn cancel">取消</button>';
    TEMP_HTML += '已租' == JSON_DATA['State'] ?
        '' : '<button class="btn confirm" onclick="pt.showAddContractModal();">签约</button>';
    for (var Key in JSON_DATA) {
        $('#Detail_' + Key).text(JSON_DATA[Key]);
    }

    $('#BtnFlag1').html(TEMP_HTML);
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeRoomDetail = function () {
    var params = this.getParams(this.API_CONFIG.ROOM_DETAIL);
    this.ajaxRequestRoomDetail(params);
    return this;
}
/**
 * BEGIN 执行绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param data 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeBindRooms = function () {
    var params = this.getParams(this.API_CONFIG.BIND_ROOMS);
    this.ajaxRequestBindRooms(params);
    return this;
}
/**
 * BEGIN 渲染物业列表模板
 * Author:PengLunJian
 * Date:2017-07-18
 * @param data 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.appendHtmlBindRooms = function (data) {
    var TEMP_HTML = '';
    var JSON_DATA = data['data'];
    var BUILD_NAME = data['exted']['BuildingName'];
    var TEMP_FLOOR = null, TEMP_ROOM = null, TEMP_ROOMS = null, TEMP_EDIT = '';
    for (var i = 0; i < JSON_DATA.length; i++) {
        TEMP_FLOOR = JSON_DATA[i];
        TEMP_EDIT = webApp.grantControl($(".floor_update"), "floor_update") ?
            '<a href="javascript:void(0);" class="house-edit" data-value="' + TEMP_FLOOR['floorCharId']
            + '" data-floor="' + TEMP_FLOOR['floorName'] + '" data-build="' + BUILD_NAME + '">编辑</a>' : '';

        TEMP_HTML += '<div class="house-group"><div class="house-header">'
            + '<h3 class="house-title">' + BUILD_NAME + ' .<span data-value="' + TEMP_FLOOR['floorCharId']
            + '">' + TEMP_FLOOR['floorName'] + '</span>楼</h3>'
            + TEMP_EDIT
            + '</div><div class="house-body"><div class="row house-row">';

        TEMP_ROOMS = JSON_DATA[i]['rooms'];
        for (var j = 0; j < TEMP_ROOMS.length; j++) {
            TEMP_ROOM = TEMP_ROOMS[j];
            TEMP_HTML += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 house-item state' + TEMP_ROOM['State'] + '">'
                + '<h4 class="house-number">' + TEMP_ROOM['Name'] + '室</h4>'
                + '<div class="house-block" data-value="' + TEMP_ROOM['CharId'] + '">'
                + '<span>' + TEMP_ROOM['Text'] + '</span></div></div>';
        }
        if (webApp.grantControl($(".room_add"), "room_add"))
            TEMP_HTML += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 house-item">'
                + '<h4 class="house-number">添加房间</h4><div class="house-add" data-value="'
                + TEMP_FLOOR['floorCharId'] + '"><span>+</span></div></div>';

        TEMP_HTML += '</div></div><div class="house-footer"></div></div>';
    }

    $('#Rooms').html(TEMP_HTML);

    JSON_DATA = data['exted'];
    for (var Key in JSON_DATA) {
        $('#State_' + Key).text(JSON_DATA[Key]);
    }
    return this;
}
/**
 * BEGIN 渲染物业列表模板
 * Author:PengLunJian
 * Date:2017-07-18
 * @param data 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.appendHtmlBindFloors = function (data) {
    var TEMP_HTML = '';
    var JSON_DATA = data['data'];
    var TEMP_VALUE = $('#Buildings .active a').attr('data-value');
    for (var i = 0; i < JSON_DATA.length; i++) {
        TEMP_HTML += '<li class="floor" data-value="'
            + JSON_DATA[i]['CharId'] + '">' + JSON_DATA[i]['Name'] + '</li>';
    }
    $('#floors').html(TEMP_HTML);
    TEMP_HTML = '<button class="btn add" data-value="'
        + TEMP_VALUE + '" onclick="pt.exeAddFloor();">+</button>';
    if (webApp.grantControl($(".floor_add"), "floor_add")) $('.floor-footer').html(TEMP_HTML);

    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestBindBuilding = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.BIND_BUILDING,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var SELECTOR = '.build-item.active a';
                _this.appendHtmlBindBuilding(data);
                _this.DATA_VALUE = $(SELECTOR).attr('data-value').trim();
                _this.exeBindFloors();
                _this.exeBindRooms();
            } else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            var isAlert = localStorage.getItem("isAlert");
            if (!isAlert) localStorage.setItem("isAlert", true);
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}
/**
 * BEGIN 绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param params 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.ajaxRequestAddFloor = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.ADD_FLOOR,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.exeBindFloors();
                _this.exeBindRooms();
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
 * BEGIN 执行绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param data 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeAddFloor = function () {
    this.DATA_VALUE = $('.btn.add').attr('data-value').trim();
    var params = this.getParams(this.API_CONFIG.ADD_FLOOR);
    this.ajaxRequestAddFloor(params);
    return this;
}
/**
 * BEGIN 执行绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param data 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeBindFloors = function () {
    var params = this.getParams(this.API_CONFIG.BIND_FLOORS);
    this.ajaxRequestBindFloors(params);
    return this;
}
/**
 * BEGIN 渲染物业列表模板
 * Author:PengLunJian
 * Date:2017-07-18
 * @param data 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.appendHtmlBindBuilding = function (data) {
    var TEMP_DATA = null;
    var JSON_DATA = data['data'];
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var i = 0; i < JSON_DATA['Buildings'].length; i++) {
        TEMP_DATA = JSON_DATA['Buildings'][i];
        TEMP_NAME = i == 0 ? this.ACTIVE : '';
        TEMP_HTML += '<li class="build-item' + TEMP_NAME + '">'
            + '<a data-value="' + TEMP_DATA['CharId'] + '">' + TEMP_DATA['Name'] + '（<span>'
            + TEMP_DATA['Number'] + '</span>）</a><i class="icon-Param btn-build"></i> </li>';
    }
    $("#Buildings").html(TEMP_HTML);
    return this;
}
/**
 * BEGIN 执行绑定物业列表
 * Author:PengLunJian
 * Date:2017-07-18
 * @param data 对象形参
 * @returns {PropertyPage} 返回当前对象实现连缀调用
 */
PropertyPage.prototype.exeBindBuilding = function () {
    var params = this.getParams(this.API_CONFIG.BIND_BUILDING);
    this.ajaxRequestBindBuilding(params);
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.clickBtnBuildDetail = function () {
    var _this = this;
    $(document).on('click', this.BTN_BUILD, function () {
        _this.DATA_VALUE = $(this).prev().attr('data-value').trim();
        mp.manualShowPanel({
            index: 1,
            element: '.panel-lg',
            complete: function () {
                _this.exeBindBuildDetail();
            }
        });
    });
    return this;
}
/**
 *
 * @param params
 * @returns {PropertyPage}
 */
PropertyPage.prototype.ajaxRequestBuildDetail = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.BUILDING_DETAIL,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_ROOM = data['exted']['RoomNum'];
                var TEMP_FLOOR = data['exted']['FloorNum'];
                JSON_DATA['Room'] = TEMP_ROOM + '间（共' + TEMP_FLOOR + '层）';
                for (var KEY in JSON_DATA) {
                    $('#Build_' + KEY).text(JSON_DATA[KEY]);
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
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeBindBuildDetail = function () {
    var params = this.getParams(this.API_CONFIG.BUILDING_DETAIL);
    this.ajaxRequestBuildDetail(params);
    return this;
}
/**
 *
 * @param params
 * @returns {PropertyPage}
 */
PropertyPage.prototype.ajaxRequestDeleteBuild = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.DELETE_BUILDING,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                mp.hideLgPanel();
                _this.exeBindBuilding();
                messageBox.show("提示", '物业删除成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * @returns {PropertyPage}
 */
PropertyPage.prototype.ajaxRequestAddBuild = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.ADD_BUILDING,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeBindBuilding();
                messageBox.show("提示", '物业新增成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * @returns {PropertyPage}
 */
PropertyPage.prototype.ajaxRequestUpdateBuild = function (params) {
    var _this = this;
    $.ajax({
        type: 'POST',
        url: host + _this.API_CONFIG.UPDATE_BUILDING,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeBindBuilding();
                _this.exeBindBuildDetail();
                messageBox.show("提示", '物业修改成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * @returns {PropertyPage}
 */
PropertyPage.prototype.ajaxRequestBindProvince = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.BIND_PROVINCE,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlBindTags(data);
                _this.appendHtmlBindProvince(data);
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
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlBindProvince = function (data) {
    var TEMP_HTML = '';
    var TEMP_DATA = null;
    var JSON_DATA = data['data']['data2'];
    for (var i = 0; i < JSON_DATA.length; i++) {
        TEMP_DATA = JSON_DATA[i];
        TEMP_HTML += '<li class="drop-option" data-value="'
            + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
    }
    $("#Add_Province").html(TEMP_HTML);
    $("#Edit_Province").html(TEMP_HTML);
    return this;
}
/**
 *
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlBindTags = function (data) {
    var TEMP_HTML = '';
    var TEMP_DATA = null;
    var JSON_DATA = data['data']['data1'];
    for (var Key in JSON_DATA) {
        for (var i = 0; i < JSON_DATA[Key].length; i++) {
            TEMP_DATA = JSON_DATA[Key][i];
            TEMP_HTML += '<li class="tag" data-value="'
                + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
        }
        $("#Add_" + Key).html(TEMP_HTML);
        $("#Edit_" + Key).html(TEMP_HTML);
        TEMP_HTML = '';
    }
    return this;
}
/**
 *
 * @param params
 * @returns {PropertyPage}
 */
PropertyPage.prototype.ajaxRequestBindCity = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.BIND_CITY,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlBindCity(data);
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
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlBindCity = function (data) {
    var TEMP_HTML = '';
    var TEMP_DATA = null;
    var JSON_DATA = data['data'];
    for (var i = 0; i < JSON_DATA.length; i++) {
        TEMP_DATA = JSON_DATA[i];
        TEMP_HTML += '<li class="drop-option" data-value="'
            + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
    }
    $(this.SELECTOR).html(TEMP_HTML);
    return this;
}
/**
 *
 * @param params
 * @returns {PropertyPage}
 */
PropertyPage.prototype.ajaxRequestBindDistrict = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.BIND_DISTRICT,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlBindDistrict(data);
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
 * @returns {PropertyPage}
 */
PropertyPage.prototype.ajaxRequestEditBuilding = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + _this.API_CONFIG.EDIT_BUILDING,
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                _this.appendHtmlEditBuilding(data);
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
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlEditBuilding = function (data) {
    var TEMP_RESULT = null, DROP_DATA = null;
    var JSON_DATA = data['data']['building'];
    for (var Key in JSON_DATA) {
        $('#Edit_' + Key).val(JSON_DATA[Key]);
    }

    DROP_DATA = data['data']['provinces'];
    TEMP_RESULT = webApp.dropItemBind(DROP_DATA, JSON_DATA['ProvinceCharId']);
    $('#Edit_Province').html(TEMP_RESULT['template']);
    $('#Edit_Province_Result').text(TEMP_RESULT['result']);

    DROP_DATA = data['data']['citys'];
    TEMP_RESULT = webApp.dropItemBind(DROP_DATA, JSON_DATA['CityCharId']);
    $('#Edit_City').html(TEMP_RESULT['template']);
    $('#Edit_City_Result').text(TEMP_RESULT['result']);

    DROP_DATA = data['data']['districts'];
    TEMP_RESULT = webApp.dropItemBind(DROP_DATA, JSON_DATA['DistrictCharId']);
    $('#Edit_Area').html(TEMP_RESULT['template']);
    $('#Edit_Area_Result').text(TEMP_RESULT['result']);

    TEMP_RESULT = JSON_DATA['Alloc'].split('|');
    for (var i = 0; i < TEMP_RESULT.length; i++) {
        var TEMP_SELECTOR = '#Edit_BuildingAlloc li[data-value="' + TEMP_RESULT[i] + '"]';
        $(TEMP_SELECTOR).addClass(this.ACTIVE);
    }

    TEMP_RESULT = JSON_DATA['Tag'].split('|');
    for (var i = 0; i < TEMP_RESULT.length; i++) {
        var TEMP_SELECTOR = '#Edit_BuildingTag li[data-value="' + TEMP_RESULT[i] + '"]';
        $(TEMP_SELECTOR).addClass(this.ACTIVE);
    }
    return this;
}
/**
 *
 * @param data
 * @returns {PropertyPage}
 */
PropertyPage.prototype.appendHtmlBindDistrict = function (data) {
    var TEMP_HTML = '';
    var TEMP_DATA = null;
    var JSON_DATA = data['data'];
    for (var i = 0; i < JSON_DATA.length; i++) {
        TEMP_DATA = JSON_DATA[i];
        TEMP_HTML += '<li class="drop-option" data-value="'
            + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
    }
    $(this.SELECTOR).html(TEMP_HTML);
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.selectDropOption = function () {
    var _this = this;
    webApp.selectDropOption(function (that) {
        var parent = $(that).parent().attr('id').trim();
        var TEMP_SELECTOR = '#' + parent + ' .active';
        _this.COMM_VALUE = $(TEMP_SELECTOR).attr('data-value').trim();
        switch (parent) {
            case 'Add_Province':
                _this.SELECTOR = '#Add_City';
                _this.exeBindCity();
                break;
            case 'Add_City':
                _this.SELECTOR = '#Add_Area';
                _this.exeBindDistrict();
                break;
            case 'Edit_Province':
                _this.SELECTOR = '#Edit_City';
                _this.exeBindCity();
                break;
            case 'Edit_City':
                _this.SELECTOR = '#Edit_Area';
                _this.exeBindDistrict();
                break;
        }
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeBindCity = function () {
    var params = this.getParams(this.API_CONFIG.BIND_CITY);
    this.ajaxRequestBindCity(params);
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeBindDistrict = function () {
    var params = this.getParams(this.API_CONFIG.BIND_DISTRICT);
    this.ajaxRequestBindDistrict(params);
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeEditBuilding = function () {
    var params = this.getParams(this.API_CONFIG.EDIT_BUILDING);
    this.ajaxRequestEditBuilding(params);
    return this;
}
/**
 *
 * @returns {boolean}
 */
PropertyPage.prototype.addBuildNotEmpty = function () {
    var message = '';
    var result = false;
    if (!$('#Add_Name').val().trim()) {
        message = '请输入物业名称！';
    } else if (!$('#Add_Province .active')[0]) {
        message = '请选择所在省份！';
    } else if (!$('#Add_City .active')[0]) {
        message = '请选择所在城市！';
    } else if (!$('#Add_Area .active')[0]) {
        message = '请选择所在区域！';
    } else if (!$('#Add_Address').val().trim()) {
        message = '请输入详细地址！';
    } else if (!$('#Add_Layer').val().trim()) {
        message = '请输入总层数！';
    } else if (!$('#Add_Door').val().trim()) {
        message = '请输入层户数！';
    } else if (!$('#Add_Water').val().trim()) {
        message = '请输入水费价格！';
    } else if (!$('#Add_Power').val().trim()) {
        message = '请输入电费价格！';
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
PropertyPage.prototype.updateBuildNotEmpty = function () {
    var message = '';
    var result = false;
    if (!$('#Edit_Name').val().trim()) {
        message = '请输入物业名称！';
    } else if (!$('#Edit_Province .active')[0]) {
        message = '请选择所在省份！';
    } else if (!$('#Edit_City .active')[0]) {
        message = '请选择所在城市！';
    } else if (!$('#Edit_Area .active')[0]) {
        message = '请选择所在区域！';
    } else if (!$('#Edit_Address').val().trim()) {
        message = '请输入详细地址！';
    } else if (!$('#Edit_WaterUnitPrice').val().trim()) {
        message = '请输入水费价格！';
    } else if (!$('#Edit_EleUnitPrice').val().trim()) {
        message = '请输入电费价格！';
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
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeAddBuild = function () {
    if (this.addBuildNotEmpty()) {
        var params = this.getParams(this.API_CONFIG.ADD_BUILDING);
        this.ajaxRequestAddBuild(params);
    }
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeDeleteBuild = function () {
    var _this = this;
    messageBox.show('确认', '确认删除当前物业吗？', MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        var params = _this.getParams(_this.API_CONFIG.DELETE_BUILDING);
        _this.ajaxRequestDeleteBuild(params);
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeUpdateBuild = function () {
    if (this.updateBuildNotEmpty()) {
        var params = this.getParams(this.API_CONFIG.UPDATE_BUILDING);
        this.ajaxRequestUpdateBuild(params);
    }
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.exeBindProvince = function () {
    var params = this.getParams(this.API_CONFIG.BIND_PROVINCE);
    this.ajaxRequestBindProvince(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
PropertyPage.prototype.tabChange = function () {
    var _this = this;
    /**
     *
     * @type {TabComponent}
     */
    this.tabComponent = new TabComponent({
        index: 0,
        target: '.panel-modal.show .block-content',
        changeEnd: function () {
            $(this.target).addClass('hide');
            $(this.target).eq(this.index).removeClass('hide');
            switch (this.index) {
                case 0:
                    _this.exeRoomDetail();
                    break;
                case 1:
                    _this.exeServiceRecords();
                    break;
                case 2:
                    _this.exeWaterReadRecords();
                    _this.exePowerReadRecords();
                    break;
                case 3:
                    _this.exeRoomState();
                    _this.exeHistoryContracts();
                    break;
            }
        }
    });
    return this;
}
/**
 *
 * @returns {PropertyPage}
 */
PropertyPage.prototype.selectTag = function () {
    var _this = this;
    $(document).on('click', '.tag', function () {
        if ($(this).hasClass(_this.ACTIVE.trim())) {
            $(this).removeClass(_this.ACTIVE.trim());
        } else {
            $(this).addClass(_this.ACTIVE.trim());
        }
    });
    return this;
}
/**
 *
 * @param parent
 * @returns {string}
 */
PropertyPage.prototype.getResult = function (parent) {
    var result = '';
    var SELECTOR = parent + ' .tag.active';
    for (var i = 0; i < $(SELECTOR).length; i++) {
        var splitLine = i > 0 ? '|' : '';
        result += splitLine + $(SELECTOR).eq(i).attr('data-value').trim();
    }
    return result;
}
/**
 *
 * @param name
 * @returns {*}
 */
PropertyPage.prototype.getParams = function (name) {
    var _this = this;
    var params = null;
    switch (name) {
        case this.API_CONFIG.BIND_BUILDING:
            params = {
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.BUILDING_DETAIL:
            params = {
                buildingCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.DELETE_BUILDING:
            params = {
                charId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.BIND_PROVINCE:
            params = {
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.ADD_BUILDING:
            params = {
                address: $('#Add_Address').val().trim(),
                alloc: _this.getResult('#Add_BuildingAlloc'),
                cityCharId: $('#Add_City .active').attr('data-value'),
                districtCharId: $('#Add_Area .active').attr('data-value'),
                eleUnitPrice: $('#Add_Power').val().trim(),
                floorCount: $('#Add_Layer').val().trim(),
                name: $('#Add_Name').val().trim(),
                provinceCharId: $('#Add_Province .active').attr('data-value'),
                requestKey: localStorage.getItem("requestKey"),
                roomCount: $('#Add_Door').val().trim(),
                tag: _this.getResult('#Add_BuildingTag'),
                waterUnitPrice: $('#Add_Water').val().trim()
            }
            break;
        case this.API_CONFIG.UPDATE_BUILDING:
            params = {
                address: $('#Edit_Address').val().trim(),
                alloc: _this.getResult('#Edit_BuildingAlloc'),
                charId: _this.DATA_VALUE,
                cityCharId: $('#Edit_City .active').attr('data-value'),
                districtCharId: $('#Edit_Area .active').attr('data-value'),
                eleUnitPrice: $('#Edit_EleUnitPrice').val().trim(),
                name: $('#Edit_Name').val().trim(),
                provinceCharId: $('#Edit_Province .active').attr('data-value'),
                requestKey: localStorage.getItem("requestKey"),
                tag: _this.getResult('#Edit_BuildingTag'),
                waterUnitPrice: $('#Edit_WaterUnitPrice').val().trim()
            }
            break;
        case this.API_CONFIG.BIND_CITY:
            params = {
                provinceCharId: _this.COMM_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.BIND_DISTRICT:
            params = {
                cityCharId: _this.COMM_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.EDIT_BUILDING:
            params = {
                buildingCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.BIND_FLOORS:
            params = {
                buildingCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.ADD_FLOOR:
            params = {
                buildingCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.DELETE_FLOOR:
            params = {
                charId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.UPDATE_FLOOR:
            params = {
                charId: _this.DATA_VALUE,
                name: $('#FloorName').val().trim(),
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.BIND_ROOMS:
            params = {
                state: _this.STATE,
                key: _this.KEYWORDS,
                buildingCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.ROOM_DETAIL:
            params = {
                buildingRoomCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.SERVICE_RECORDS:
            params = {
                pageSize: _this.PAGE_SIZE,
                pageIndex: _this.PAGE_INDEX,
                buildingRoomCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.WATER_RECORDS:
            params = {
                Source: '1',
                pageSize: _this.PAGE_SIZE,
                pageIndex: _this.PAGE_INDEX,
                buildingRoomCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.POWER_RECORDS:
            params = {
                Source: '2',
                pageSize: _this.PAGE_SIZE,
                pageIndex: _this.PAGE_INDEX,
                buildingRoomCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.ROOM_STATE:
            params = {
                roomCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.HISTORY_CONTRACTS:
            params = {
                pageSize: _this.PAGE_SIZE,
                pageIndex: _this.PAGE_INDEX,
                buildingRoomCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.DELETE_ROOM:
            params = {
                charId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.BIND_EDITROOM:
            params = {
                buildingRoomCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.UPDATE_ROOM:
            params = {
                alloc: _this.getResult('#UpdateRoomAlloc'),
                charId: _this.DATA_VALUE,
                div1: parseInt($('#UpdateDiv1').val().trim()),
                div2: parseInt($('#UpdateDiv2').val().trim()),
                div3: parseInt($('#UpdateDiv3').val().trim()),
                eleUnitPrice: parseInt($('#UpdateEleUnitPrice').val().trim()),
                name: $('#UpdateRoomName').val().trim(),
                price: parseInt($('#UpdatePrice').val().trim()),
                requestKey: localStorage.getItem("requestKey"),
                square: parseInt($('#UpdateSquare').val().trim()),
                tag: _this.getResult('#UpdateRoomTag'),
                waterUnitPrice: parseInt($('#UpdateWaterUnitPrice').val().trim())
            }
            break;
        case this.API_CONFIG.ADD_ROOM:
            params = {
                buildingFloorCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.BIND_SERVICE:
            params = {
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.ADD_SERVICE:
            params = {
                price: $('#AddPrice').val().trim(),
                buildingRoomCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey"),
                description: $('#AddServiceDescription').val().trim(),
                obj: $('#AddServiceObject .active').attr('data-value').trim(),
                serviceParameterCharId: $('#AddServiceItem .active').attr('data-value').trim(),
            }
            break;
        case this.API_CONFIG.DELETE_SERVICE:
            params = {
                charId: _this.COMM_VALUE,
                requestKey: localStorage.getItem("requestKey"),
            }
            break;
        case this.BIND_RECORD:
            params = {
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.ADD_RECORD:
            params = {
                buildingRoomCharId: _this.DATA_VALUE,
                description: $('#RecordDescription').val().trim(),
                mark: $('#RecordMark').val().trim(),
                recordDate: $('#RecordDate').val().trim(),
                requestKey: localStorage.getItem("requestKey"),
                source: $('#RecordProject .active').attr('data-value').trim()
            }
            break;
        case this.API_CONFIG.DELETE_RECORD:
            params = {
                charId: _this.COMM_VALUE,
                requestKey: localStorage.getItem("requestKey"),
            }
            break;
        case this.API_CONFIG.CHECK_CONTRACT:
            params = {
                charId: _this.COMM_VALUE,
                requestKey: localStorage.getItem("requestKey"),
            }
            break;
        case this.ADD_CONTRACT:
            params = {
                bargainDate: $('#BargainDate').val().trim(),
                buildingRoomCharId: _this.DATA_VALUE,
                cardID: $('#AddContract_Id').val().trim(),
                customerCharId: $('#CustomerCharId').val().trim(),
                deposit: $('#AddContract_Deposit').val().trim(),
                description: $('#AddContract_Description').val().trim(),
                inDate: $('#AddContract_InDate').val().trim(),
                number: $('#AddContract_Number').val().trim(),
                outDate: $('#AddContract_OutDate').val().trim(),
                ownerDepartmentCharId: $('#AddContract_Dpts .active').attr('data-value').trim(),
                ownerEmployeeCharId: $('#AddContract_Employee .active').attr('data-value').trim(),
                payType: $('#AddContract_Payment .active').attr('data-value').trim(),
                phone: $('#AddContract_Phone').val().trim(),
                price: $('#AddContract_Price').val().trim(),
                total: $('#AddContract_Persons').val().trim(),
                requestKey: localStorage.getItem("requestKey"),
            }
            break;
        case this.BIND_CONTRACT:
            params = {
                buildingRoomCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey"),
            }
            break;
        case this.API_CONFIG.BIND_EMPLOYEE:
            params = {
                departmentCharId: _this.COMM_VALUE,
                requestKey: localStorage.getItem("requestKey"),
            }
            break;
    }
    return params;
}
/**
 *
 * @type {PropertyPage}
 */
var pt = new PropertyPage();
