var LOGIN_DATA = JSON.parse(localStorage.getItem('loginData'));
/**
 * BEGIN 权限控制功能
 * Author:LiYong
 * Date:2017-06-20
 * @constructor 权限构造函数
 */
function Grant() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.result = arguments['result'] ? arguments['result'] : false;
    this.config = arguments['config'] ? arguments['config'] : null;
    this.errorHTML = arguments['errorHTML'] ? arguments['errorHTML'] : "error.html";
    this.grantCheck();
}
/**
 * BEGIN 获取客户端请求的HTML文件名
 * Author:LiYong
 * Date:2017-06-20
 * @returns {string} 返回URI
 */
Grant.prototype.getRequestHtml = function () {
    const CONST_EXNAME = '.html';
    var url = window.location.href;
    var BEGIN_INDEX = url.lastIndexOf('/') + 1;
    var END_INDEX = url.lastIndexOf(CONST_EXNAME) + CONST_EXNAME.length;
    var URI = url.substring(BEGIN_INDEX, END_INDEX);
    return URI;
}
/**
 * BEGIN 匹配访问的HTML是否存在权限配置文件中
 * Author:LiYong
 * Date:2017-06-20
 * @returns {boolean|*} 返回布尔类型
 */
Grant.prototype.getResult = function () {
    var URI = this.getRequestHtml();
    var regExp = new RegExp(URI, 'g');
    if (regExp.test(this.config)) {
        this.result = true;
    }
    return this.result;
}
/**
 * BEGIN 根据匹配结果实现相应操作
 * Author:LiYong
 * Date:2017-06-20
 * @returns {Grant} 返回权限对象实现连缀调用
 */
Grant.prototype.grantCheck = function () {
    var TEMP_OBJ = LOGIN_DATA['Menus'];
    var RESULT = this.getResult();
    var URI = this.getRequestHtml();
    if (RESULT) {
        var FLAG = false;
        for (var i = 0; i < TEMP_OBJ.length; i++) {
            if (URI == TEMP_OBJ[i]['Url'].trim()) {
                FLAG = true;
            }
        }
        if (!FLAG) {
            window.location.href = this.errorHTML;
        }
    }
    return this;
}
/**
 * BEGIN 匹配访问的HTML是否存在权限配置文件中
 * Author:LiYong
 * Date:2017-06-20
 */
if (LOGIN_DATA) {
    new Grant({
        result: false,
        config: "desktop.html,property.html," +
        "customer.html,contract.html,bill.html," +
        "count.html,grant.html,employee.html," +
        "system.html,log.html"
    });
}
/**
 * BEGIN 编写计时器插件
 * Author:PengLunJian
 * Date:2017-05-10
 * @constructor 计时器构造函数
 */
function TimerComponent() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.timer = arguments['timer'] ? arguments['timer'] : null;
    this.element = arguments['element'] ? arguments['element'] : "";
    this.initTime = arguments['initTime'] ? arguments['initTime'] : 60;
    this.flagTime = arguments['initTime'] ? arguments['initTime'] : 60;
    this.complete = arguments['complete'] ? arguments['complete'] : null;

    this.init();
}
/**
 * BEGIN 计时器初始化方法
 * Author:PengLunJian
 * Date:2017-05-10
 * @returns {TimerComponent}
 */
TimerComponent.prototype.init = function () {
    this.startTimer();
    return this;
}
/**
 * BEGIN 启动计时器
 * Author:PengLunJian
 * Date:2017-05-10
 * @returns {TimerComponent}
 */
TimerComponent.prototype.startTimer = function () {
    var _this = this;
    $(_this.element).addClass("disabled");
    $(_this.element).attr("disabled", "disabled");
    _this.timer = setTimeout(function () {
        _this.initTime--;
        $(_this.element).html(_this.initTime + " 秒");
        _this.startTimer();
        if (_this.initTime <= 0) _this.stopTimer();
    }, 1000);
    return this;
}
/**
 * BEGIN 关闭计时器
 * Author:PengLunJian
 * Date:2017-05-10
 * @returns {TimerComponent}
 */
TimerComponent.prototype.stopTimer = function () {
    clearInterval(this.timer);
    this.initTime = this.flagTime;
    $(this.element).html("重新获取");
    $(this.element).removeClass("disabled");
    $(this.element).removeAttr("disabled");
    if ('function' == typeof this.complete) this.complete();
    return this;
}
/**
 *
 * @constructor
 */
function TabComponent() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.index = arguments['index'] ? arguments['index'] : 0;
    this.active = arguments['active'] ? arguments['active'] : 'active';
    this.element = arguments['element'] ? arguments['element'] : '.tab';
    this.target = arguments['target'] ? arguments['target'] : '.block-content';
    this.changeEnd = arguments['changeEnd'] ? arguments['changeEnd'] : function () {

    }

    this.init();
}
/**
 *
 * @returns {TabComponent}
 */
TabComponent.prototype.init = function () {
    this.tabClick();
    return this;
}
/**
 *
 * @returns {TabComponent}
 */
TabComponent.prototype.tabClick = function () {
    var _this = this;
    $(document).on('click', this.element, function () {
        _this.index = $(this).index();
        $(this).parent().find(_this.element).removeClass(_this.active);
        $(this).addClass(_this.active);
        if ('function' == typeof _this.changeEnd) {
            _this.changeEnd(this);
        }
    });
    return this;
}
/**
 *
 * @returns {TabComponent}
 */
TabComponent.prototype.tabReset = function () {
    $(this.element).first().click();
    return this;
}
/**
 *
 * @constructor
 */
function ModalPanel() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.panelSm = arguments['panelSm'] ? arguments['panelSm'] : ".panel-sm";
    this.panelLg = arguments['panelLg'] ? arguments['panelLg'] : ".panel-lg";
    this.panelBg = arguments['panelBg'] ? arguments['panelBg'] : ".panel-bg";
    this.btnCancel = arguments['btnCancel'] ? arguments['btnCancel'] : ".panel .btn.cancel";

    this.init();
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.init = function () {
    this.autoShowPanel();
    this.panelBgClick();
    this.btnCancelClick();
    return this;
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.autoShowPanel = function () {
    var _this = this;
    $(document).on("click", "[data-panel='panel-sm']", function () {
        var PANEL_INDEX = parseInt($(this).attr("data-index").trim());
        _this.manualShowPanel({
            index: PANEL_INDEX,
            element: ".panel-sm"
        });
    });
    return this;
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.manualShowPanel = function () {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    var SELECTOR = arguments['element'] + " .panel-modal:eq(" + arguments['index'] + ")";
    $(arguments['element'] + " .panel-modal").removeClass("show");
    $(SELECTOR).addClass("show");
    $(arguments['element']).removeClass("hide");
    if ("function" == typeof arguments['complete']) arguments['complete']();
    return this;
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.hideSmPanel = function () {
    $(this.panelSm).addClass("hide");
    return this;
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.hideLgPanel = function () {
    $(this.panelLg).addClass("hide");
    return this;
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.btnCancelClick = function () {
    var _this = this;
    $(document).on("click", this.btnCancel, function () {
        if ($(this).parents(".panel").hasClass("panel-sm")) {
            _this.hideSmPanel();
        } else if ($(this).parents(".panel").hasClass("panel-lg")) {
            _this.hideLgPanel();
        }
    });
    return this;
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.panelBgClick = function () {
    var _this = this;
    $(document).on("click", this.panelBg, function () {
        if ($(this).parents(".panel").hasClass(_this.panelLg.substring(1))) {
            _this.hideLgPanel();
        } else {
            _this.hideSmPanel();
        }
    });
    return this;
}
/**
 *
 * @type {ModalPanel}
 */
var mp = new ModalPanel();
/**
 *
 * @constructor
 */
function TreeMenu() {
    this.ACTIVE = arguments['ACTIVE'] ? arguments['ACTIVE'] : "active";
    this.TREE_ITEM = arguments['TREE_ITEM'] ? arguments['TREE_ITEM'] : ".tree-item";
    this.TREE_MENU = arguments['TREE_MENU'] ? arguments['TREE_MENU'] : ".tree-menu";
    this.TREE_TEXT = arguments['TREE_TEXT'] ? arguments['TREE_TEXT'] : ".tree-text";
    this.FORM_SELECT = arguments['FORM_SELECT'] ? arguments['FORM_SELECT'] : ".form-select";
    this.SELECT_OPTION = arguments['SELECT_OPTION'] ? arguments['SELECT_OPTION'] : ".select-option";
    this.SELECT_RESULT = arguments['SELECT_RESULT'] ? arguments['SELECT_RESULT'] : ".select-result";
    this.TREE_CONTAINER = arguments['TREE_CONTAINER'] ? arguments['TREE_CONTAINER'] : ".tree-container";

    this.init();
}
/**
 *
 * @returns {TreeMenu}
 */
TreeMenu.prototype.init = function () {
    this.showFormSelect();
    this.formSelectBlur();
    return this;
}
/**
 *
 * @returns {TreeMenu}
 */
TreeMenu.prototype.clickTreeItem = function (fn) {
    var _this = this;
    $(document).on("click", this.TREE_ITEM, function (ev) {
        ev = ev || window.event;
        if ($(this).hasClass("show")) {
            $(this).removeClass("show");
        } else {
            $(this).addClass("show");
        }
        var $_parent = $(this).parents(_this.TREE_CONTAINER).eq(0);
        $_parent.find(_this.TREE_ITEM).removeClass(_this.ACTIVE);
        $(this).addClass(_this.ACTIVE);
        var $_select = $(this).parents(_this.SELECT_OPTION).prev().eq(0);
        if (undefined != $_select[0]) {
            $_select.text($(this).find(_this.TREE_TEXT).eq(0).text().trim());
        } else {
            if ('function' == typeof fn) fn();
        }
        ev.stopPropagation();
    });
    return this;
}
/**
 *
 * @returns {TreeMenu}
 */
TreeMenu.prototype.customerClickTreeItem = function (fn) {
    var _this = this;
    $(document).on("click", this.TREE_ITEM, function (ev) {
        ev = ev || window.event;
        if ($(this).hasClass("show")) {
            $(this).removeClass("show");
        } else {
            $(this).addClass("show");
        }
        var $_parent = $(this).parents(_this.TREE_CONTAINER).eq(0);
        $_parent.find(_this.TREE_ITEM).removeClass(_this.ACTIVE);
        $(this).addClass(_this.ACTIVE);
        var $_select = $(this).parents(_this.SELECT_OPTION).prev().eq(0);
        $_select.text($(this).find(_this.TREE_TEXT).eq(0).text().trim());
        if ('function' == typeof fn) fn();
        ev.stopPropagation();
    });
    return this;
}
/**
 *
 * @returns {TreeMenu}
 */
TreeMenu.prototype.showFormSelect = function () {
    $(this.SELECT_RESULT).on("click", function () {
        var $_parent = $(this).parent();
        if ($_parent.hasClass("hide")) {
            $_parent.removeClass("hide");
        } else {
            $_parent.addClass("hide");
        }
    });
    return this;
}
/**
 *
 * @returns {TreeMenu}
 */
TreeMenu.prototype.formSelectBlur = function () {
    $(this.FORM_SELECT).on("blur", function () {
        $(this).addClass("hide");
    });
    return this;
}
/**
 *
 * @param params
 * @returns {string}
 */
TreeMenu.prototype.getTemplate = function (params) {
    var TEMP_HTML = '<ul class="tree-block show">';
    $(params).each(function () {
        var JSON_LEVEL_ONE = this;
        TEMP_HTML += '<li data-value="' + JSON_LEVEL_ONE['CharId'] + '" data-level="' + JSON_LEVEL_ONE['LevelIn'] + '" class="tree-item show">' +
            '<i class="tree-icon icon-right-triangle"></i><span class="tree-text">' + JSON_LEVEL_ONE['Name'] + '</span>' +
            '<div class="tree-menu"><ul class="tree-block">';
        for (var j = 0; j < JSON_LEVEL_ONE['ChildDpts'].length; j++) {
            var JSON_LEVEL_TWO = params['ChildDpts'][j];
            TEMP_HTML += '<li data-value="' + JSON_LEVEL_TWO['CharId'] + '" data-level="' + JSON_LEVEL_TWO['LevelIn'] + '" class="tree-item">' +
                '<i class="tree-icon icon-right-triangle"></i><span class="tree-text">' + JSON_LEVEL_TWO['Name'] + '</span>' +
                '<div class="tree-menu"><ul class="tree-block">';
            for (var k = 0; k < JSON_LEVEL_TWO['ChildDpts'].length; k++) {
                var JSON_LEVEL_THREE = JSON_LEVEL_TWO['ChildDpts'][k];
                TEMP_HTML += '<li data-value="' + JSON_LEVEL_THREE['CharId'] + '" data-level="' + JSON_LEVEL_THREE['LevelIn'] + '" class="tree-item">' +
                    '<i class="tree-icon icon-organize"></i><span class="tree-text">' + JSON_LEVEL_THREE['Name'] + '</span></li>';
            }
            TEMP_HTML += '</ul></div></li>';
        }
        TEMP_HTML += '</ul></div></li>';
    });
    TEMP_HTML += '</ul>';
    return TEMP_HTML;
}
/**
 *LIYONG
 * Date:2017-8-31
 * 客户模板
 * @param params
 * @returns {string}
 */
TreeMenu.prototype.customerGetTemplate = function (params) {
    var TEMP_HTML = '<ul class="tree-block show">';
    for (var j = 0; j < params.length; j++) {
        var JSON_LEVEL_TWO = params[j];
        TEMP_HTML += '<li data-value="' + JSON_LEVEL_TWO['CharId'] + '" data-level="' + JSON_LEVEL_TWO['LevelIn'] + '" class="tree-item">' +
            '<i class="tree-icon icon-right-triangle"></i><span class="tree-text">' + JSON_LEVEL_TWO['Name'] + '</span>' +
            '<div class="tree-menu"><ul class="tree-block">';
        for (var k = 0; k < JSON_LEVEL_TWO['ChildDpts'].length; k++) {
            var JSON_LEVEL_THREE = JSON_LEVEL_TWO['ChildDpts'][k];
            TEMP_HTML += '<li data-value="' + JSON_LEVEL_THREE['CharId'] + '" data-level="' + JSON_LEVEL_THREE['LevelIn'] + '" class="tree-item">' +
                '<i class="tree-icon icon-organize"></i><span class="tree-text">' + JSON_LEVEL_THREE['Name'] + '</span></li>';
        }
        TEMP_HTML += '</ul></div></li>';
    }
    TEMP_HTML += '</ul>';
    return TEMP_HTML;
}
/**
 *
 * @type {TreeMenu}
 */
var tm = new TreeMenu();
/**
 *
 * @constructor
 */
function Tools() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.flag = arguments['flag'] ? arguments['flag'] : false;
    this.context = arguments['context'] ? arguments['context'] : "收起日历";
    this.element = arguments['element'] ? arguments['element'] : ".btn-drop";
    this.targetElement = arguments['targetElement'] ? arguments['targetElement'] : ".group-drop";

    this.init();
}
/**
 *
 * @returns {Tools}
 */
Tools.prototype.init = function () {
    var _this = this;
    $(this.element).on("click", function () {
        if (_this.flag) {
            _this.flag = false;
            _this.context = "收起日历";
            $(_this.targetElement).removeClass("hide");
        } else {
            _this.flag = true;
            _this.context = "打开日历";
            $(_this.targetElement).addClass("hide");
        }
        $(this).text(_this.context);
    });
    return this;
}
/**
 *
 * @constructor
 */
function WebApp() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.ACTIVE = arguments['ACTIVE'] ? arguments['ACTIVE'] : " active";
    this.APP_BG = arguments['APP_BG'] ? arguments['APP_BG'] : ".app-bg";
    this.LOGIN_OUT = arguments['LOGIN_OUT'] ? arguments['LOGIN_OUT'] : "LOGIN_OUT";
    this.LG_NAV_BAR = arguments['LG_NAV_BAR'] ? arguments['LG_NAV_BAR'] : ".lg-nav";
    this.SM_NAV_BAR = arguments['SM_NAV_BAR'] ? arguments['SM_NAV_BAR'] : ".sm-nav";
    this.DROP_BODY = arguments['DROP_BODY'] ? arguments['DROP_BODY'] : ".drop-body";
    this.DROP_RESULT = arguments['DROP_RESULT'] ? arguments['DROP_RESULT'] : ".drop-result";
    this.DROP_OPTION = arguments['DROP_OPTION'] ? arguments['DROP_OPTION'] : ".drop-option";
    this.COMPANY_NAME = arguments['COMPANY_NAME'] ? arguments['COMPANY_NAME'] : ".header h1";
    this.BTN_EXIT = arguments['BTN_EXIT'] ? arguments['BTN_EXIT'] : ".right-oprea>li:eq(1)>a";
    this.BIND_COMPANY = arguments['BIND_COMPANY'] ? arguments['BIND_COMPANY'] : "BIND_COMPANY";
    this.TEMPLATE = arguments['TEMPLATE'] ? arguments['TEMPLATE'] : "<div class='app-bg'></div>";
    this.DROP_CONTAINER = arguments['DROP_CONTAINER'] ? arguments['DROP_CONTAINER'] : ".drop-container";
    this.DATE_TIME_PICKER = arguments['DATE_TIME_PICKER'] ? arguments['DATE_TIME_PICKER'] : ".dateTimePicker";
    /**code with liyong*/
    this.RIGHT_CONTENT = arguments['RIGHT_CONTENT'] ? arguments['RIGHT_CONTENT'] : ".main  .right-content";
    this.BLOCK_BODY = arguments['BLOCK_BODY'] ? arguments['BLOCK_BODY'] : ".panel-lg .block-body";
    this.PANEL_BODY = arguments['PANEL_BODY'] ? arguments['PANEL_BODY'] : ".panel-sm .panel-modal .panel-body";
    this.PAGINATION_CODE = arguments['PAGINATION_CODE'] ? arguments['PAGINATION_CODE'] : ".main .right-content .pagination-box .pagination-code";
    this.PAGINATION_PREV = arguments['PAGINATION_PREV'] ? arguments['PAGINATION_PREV'] : ".main .right-content .pagination-box .pagination-prev";
    this.PAGINATION_NEXT = arguments['PAGINATION_NEXT'] ? arguments['PAGINATION_NEXT'] : ".main .right-content .pagination-box .pagination-next";
    this.LEFT_FULL = arguments['LEFT_FULL'] ? arguments['LEFT_FULL'] : ".main .pull-left .full";
    this.TAB_CHECK = arguments['TAB_CHECK'] ? arguments['TAB_CHECK'] : ".main .right-table a";
    this.TABS_LI = arguments['TABS_LI'] ? arguments['TABS_LI'] : ".tab-header>.tabs>li";
    this.LG_BUTTON = arguments['LG_BUTTON'] ? arguments['LG_BUTTON'] : ".panel-lg .block-footer button";
    this.LG_PANEL = arguments['LG_PANEL'] ? arguments['LG_PANEL'] : ".panel-lg .panel-footer button";
    this.LG_BILLADD = arguments['LG_BILLADD'] ? arguments['LG_BILLADD'] : ".panel-lg .bill-add";
    this.LG_A = arguments['LG_A'] ? arguments['LG_A'] : ".panel-lg a";
    this.LG_CODE = arguments['LG_CODE'] ? arguments['LG_CODE'] : ".panel-lg .pagination-code";
    this.LG_PREV = arguments['LG_PREV'] ? arguments['LG_PREV'] : ".panel-lg .pagination-prev";
    this.LG_NEXT = arguments['LG_NEXT'] ? arguments['LG_NEXT'] : ".panel-lg .pagination-next";
    this.LG_PASSWORD = arguments['LG_PASSWORD'] ? arguments['LG_PASSWORD'] : ".panel-lg .btn-password";
    this.SM_BUTTON = arguments['SM_BUTTON'] ? arguments['SM_BUTTON'] : ".panel-sm .panel-footer button";
    this.TEMP_LOAD = arguments['TEMP_LOAD'] ? arguments['TEMP_LOAD'] :
        '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';

    this.NO_RESULT = arguments['NO_RESULT'] ? arguments['NO_RESULT'] :
        "<div class='no-result'><img src='images/no_result.png' /><p>抱歉~，暂无数据</p></div>";
    this.API_CONFOG = arguments['API_CONFOG'] ? arguments['API_CONFOG'] : {
        LOGIN_OUT: "/identity/logout",
        BIND_COMPANY: "/param/company"
    };

    this.init();
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.init = function () {
    this.initDateTimePicker();
    this.showLgNavMenu();
    this.hideLgNavMenu();
    this.bindAccount()
    this.webAppExit();
    this.bindCompany();
    this.showSmNavMenu();
    this.showDropOption();
    this.dropMenuBlur();
    this.selectDropOption();
    this.keyUpRequireNumber();
    this.propertyGrantControl();
    this.customerGrantControl();
    this.contractGrantControl();
    this.employeeGrantControl();
    this.checkLoading();
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.initDateTimePicker = function () {
    if (undefined != $(this.DATE_TIME_PICKER)[0]) {
        $(this.DATE_TIME_PICKER).datetimepicker({
            autoclose: true,
            language: 'zh-CN',
            format: 'yyyy-mm-dd hh:ii'
        });
    }
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.showLgNavMenu = function () {
    var _this = this;
    $(this.LG_NAV_BAR).on("click", function () {
        var $_WEB_APP = $('#webApp', parent.document);
        $(_this.APP_BG).remove();
        $_WEB_APP.append(_this.TEMPLATE);
        setTimeout(function () {
            $_WEB_APP.addClass("show");
        }, 100);
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.showSmNavMenu = function () {
    $(this.SM_NAV_BAR).on("click", function () {
        var $_main = $(".main .pull-left");
        if ($_main.hasClass("show")) {
            $_main.removeClass("show");
        } else {
            $_main.addClass("show");
        }
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.showDropOption = function () {
    $(document).on("click", this.DROP_CONTAINER, function () {
        if ($(this).hasClass("hide")) {
            $(this).removeClass("hide");
        } else {
            $(this).addClass("hide");
        }
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.dropMenuBlur = function () {
    $(document).on("blur", this.DROP_CONTAINER, function () {
        $(this).addClass("hide");
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.selectDropOption = function (fn) {
    var _this = this;
    $(_this.DROP_CONTAINER).off().on("click", this.DROP_OPTION, function () {
        var TEXT = $(this).text().trim();
        $(this).parents(_this.DROP_CONTAINER).find(_this.DROP_OPTION).removeClass("active");
        $(this).addClass("active");
        $(this).parents(_this.DROP_CONTAINER).find(_this.DROP_RESULT).text(TEXT);
        if ('function' == typeof fn) fn(this);
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.defaultSelectOption = function () {
    var _this = this;
    $(this.DROP_RESULT).each(function () {
        var _This_Container = $(this).parents(_this.DROP_CONTAINER);
        var _Temp_Text = _This_Container.find(_this.DROP_OPTION).eq(0).text();
        $(this).text(_Temp_Text);
    });
    return this;
}
/**
 *
 * @param data
 * @param charId
 * @returns {{template: string, result: string}}
 */
WebApp.prototype.dropItemBind = function (data, charId) {
    var TEMP_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '', TEMP_RESULT = '';
    for (var i = 0; i < data.length; i++) {
        TEMP_DATA = data[i];
        TEMP_NAME = charId == TEMP_DATA['Key'] ? this.ACTIVE : '';
        if (charId == TEMP_DATA['Key']) TEMP_RESULT = TEMP_DATA['Value'];
        TEMP_HTML += '<li class="drop-option' + TEMP_NAME + '" data-value="'
            + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
    }
    return {template: TEMP_HTML, result: TEMP_RESULT};
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.hideLgNavMenu = function () {
    var _this = this;
    $(document).on("click", this.APP_BG, function () {
        var $_WEB_APP = $("#webApp");
        $_WEB_APP.removeClass("show");
        setTimeout(function () {
            $(_this.APP_BG).remove();
        }, 300);
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.webAppExit = function () {
    var _this = this;
    $(this.BTN_EXIT).on("click", function () {
        var params = _this.getParams(_this.LOGIN_OUT);
        _this.ajaxRequestWebAppExit(params);
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.removeLocalStorage = function () {
    localStorage.setItem('isLogin', false);
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("employeeCharId");
    localStorage.removeItem("requestKey");
    window.parent.location.href = 'login.html';
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.bindAccount = function () {
    var SELECTOR = ".header .right>li:eq(0)";
    var ACCOUNT = localStorage.getItem("account");
    var ISVALID = localStorage.getItem("isValid");
    var TEMP_HTML = "<p class='right-valid'>手机未认证</p>";
    if (ACCOUNT) $('.right-phone').html(ACCOUNT);
    if (ISVALID != 1) $(SELECTOR).html(TEMP_HTML);
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.bindCompany = function () {
    var result = sessionStorage.getItem('status');
    if ('true' != result) {
        var params = this.getParams(this.BIND_COMPANY);
        this.ajaxRequestCompany(params);
    }
    return this;
}
/**
 *
 * @param params
 * @returns {WebApp}
 */
WebApp.prototype.ajaxRequestWebAppExit = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFOG['LOGIN_OUT'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data != null) {
                try {
                    if (data['succ']) {
                        _this.removeLocalStorage();
                        return true;
                    } else {
                        messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    }
                } catch (e) {

                }
            }
        },
        error: function (e) {
            if (e.readyState > 0) {
                messageBox.show("错误", e, MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        }
    });
    return this;
}
/**
 *
 * @param params
 * @returns {WebApp}
 */
WebApp.prototype.ajaxRequestCompany = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFOG['BIND_COMPANY'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $(_this.COMPANY_NAME).text(JSON_DATA['FullName']);
            } else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (e) {
            if (e.readyState > 0) {
                messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        }
    });
    return this;
}
/**
 *
 * @param name
 * @returns {*}
 */
WebApp.prototype.getParams = function (name) {
    var params = null;
    switch (name) {
        case this.LOGIN_OUT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                employeeCharId: localStorage.getItem("employeeCharId")
            }
            break;
        case this.BIND_COMPANY:
            params = {
                requestKey: localStorage.getItem("requestKey")
            }
            break;
    }
    return params;
}
/**
 *
 * @param e
 * @param data
 * @returns {boolean}
 */
WebApp.prototype.grantControl = function (e, data) {
    var result = false;
    if (LOGIN_DATA) {
        var str = LOGIN_DATA['Operations'];
        if (str.indexOf(data) != -1) {
            e.show();
            result = true;
        }
    }
    return result;
}
/**
 * 物业固定按钮权限
 * @returns {WebApp}
 */
WebApp.prototype.propertyGrantControl = function () {
    // 物业查看
    this.grantControl($("#Buildings"), "building_select");
    // 物业新增
    this.grantControl($(".building_add"), "building_add");
    // 物业删除
    this.grantControl($(".building_delete"), "building_delete");
    // 物业
    this.grantControl($(".building_update"), "building_update");
    // 楼层删除
    this.grantControl($(".floor_delete"), "floor_delete");
    // 房间编辑
    this.grantControl($(".room_update"), "room_update");
    // 房间删除
    this.grantControl($(".room_delete"), "room_delete");
    //维修记录查看
    this.grantControl($(".servicerecord_select"), "servicerecord_select");
    //维修记录新增
    this.grantControl($(".servicerecord_add"), "servicerecord_add");
    //抄表记录查看
    this.grantControl($(".readrecord_select"), "readrecord_select");
    //抄表记录新增
    this.grantControl($(".readrecord_add"), "readrecord_add");
    // 部门新增
    this.grantControl($(".department_add"), "department_add");
    // 部门编辑
    this.grantControl($(".department_update"), "department_update");
    // 部门删除
    this.grantControl($(".department_delete"), "department_delete");
    // 员工新增
    this.grantControl($(".employee-add"), "employee_add");
    // 员工编辑
    this.grantControl($(".employee_update"), "employee_update");
    // 员工删除
    this.grantControl($(".employee_delete"), "employee_delete");
    // 账务删除
    this.grantControl($(".billrecord_delete"), "billrecord_delete");
    // 角色查看
    this.grantControl($("#roles"), "role_select");
    // 角色新增
    this.grantControl($(".role_add"), "role_add");
    // 权限编辑
    this.grantControl($(".post-edit"), "auth_update");
    //角色删除
    this.grantControl($(".role-del"), "role_delete");

    return this;
}
/**
 * 客户固定按钮权限
 * @returns {WebApp}
 */
WebApp.prototype.customerGrantControl = function () {
    // 客户新增
    this.grantControl($(".customer_add"), "customer_add");
    // 客户编辑
    this.grantControl($(".btn-edit"), "customer_update");
    // 客户废弃
    this.grantControl($(".repeal"), "customer_abandon");
    // 客户删除
    this.grantControl($(".customer_delete"), "customer_delete");
    // 跟进查看
    this.grantControl($(".follow_select"), "follow_select");
    //跟进新增
    this.grantControl($(".follow_add"), "follow_add");
    return this;

}
/**
 * Author:LIYONG
 * Date:2017-9-12
 *合同固定按钮权限
 * @returns {WebApp}
 */
WebApp.prototype.contractGrantControl = function () {
    // 账单（列表）查看
    this.grantControl($(".bill-list"), "bill_select");
    // 合同编辑
    this.grantControl($(".btn-edit"), "contract_update");
    // 退租
    this.grantControl($(".btn-end"), "contract_end");
    // 作废
    this.grantControl($(".btn-abandon"), "contract_abandon");
    //续约
    this.grantControl($(".btn-renewal"), "contract_add");
    return this;
}
/**
 * 员工固定按钮权限
 * @returns {WebApp}
 */
WebApp.prototype.employeeGrantControl = function () {
    // 部门新增
    this.grantControl($(".btn-departmentadd"), "department_add");
    // 部门编辑
    this.grantControl($(".btn-departmentedit"), "department_update");
    // 部门删除
    this.grantControl($(".fq-btn-ul1"), "department_delete");
   // 部门编辑 部门新增的父级
    if (this.grantControl($(".fq-nav2-bottom"), "department_add") || this.grantControl($(".fq-nav2-bottom"), "department_update")) {
        $(".fq-nav2-bottom").show();
    }
// 员工新增
    this.grantControl($(".fq-employee-add-dv"), "employee_add");
    return this;
}
/**
 * 无权限
 * @returns {WebApp}
 */
WebApp.prototype.noGrant = function () {
    var TEMP_HTML = '<div class="fq-contain-dv"><div class="imgs">'
        + '<img src="images/withoutPower.png" alt=""/>'
        + '<p>抱歉，您暂时没有相关权限，请联系管理员！</p></div></div>';
    $(".fq-contain-in").html(TEMP_HTML);
    $(".fq-contain-dv").show();
    return this;
}
/**
 * 没有查看权限
 * @returns {WebApp}
 */
WebApp.prototype.noneGrant = function () {
    var TEMP_HTML = '<div class="imgs">'
        + '<img src="images/withoutPower.png" alt=""/>'
        + '<p>抱歉，您暂时没有相关权限，请联系管理员！</p></div>';
    $(".table-body").html(TEMP_HTML);
    return this;
}
/**
 *
 * @param params
 * @returns {Array}
 */
WebApp.prototype.parseArray = function (params) {
    var arr = [];
    for (var KEY in params) {
        arr.push({
            key: KEY,
            value: params[KEY]
        })
    }
    return arr;
}
/**
 *
 * @param params
 * @returns {Array}
 */
WebApp.prototype.pageGetDataSet = function (params) {
    var DATA_SET = [];
    var PAGE_CODE = params['pageCode'];
    var PAGE_DATA = params['pageData'];
    var PAGE_SIZE = params['pageSize'];
    var BEN_INDEX = (PAGE_CODE - 1) * PAGE_SIZE;
    var END_INDEX = PAGE_CODE * PAGE_SIZE;
    for (var i = BEN_INDEX; i < END_INDEX; i++) {
        if (PAGE_DATA[i]) {
            DATA_SET.push(PAGE_DATA[i]);
        } else {
            return DATA_SET;
        }
    }
    return DATA_SET;
}
/**
 *
 * @param params
 * @returns {string}
 */
WebApp.prototype.parseDate = function (params) {
    var DATE_STRING = '';
    var TEMP_DATE = new Date(params);
    if (params) {
        var TEMP_YEAR = TEMP_DATE.getFullYear();
        var TEMP_MONTH = TEMP_DATE.getMonth() + 1;
        var TEMP_DAY = TEMP_DATE.getDate();
        var TEMP_HOURS = TEMP_DATE.getHours();
        var TEMP_MINUTES = TEMP_DATE.getMinutes();
        var TEMP_SECONDS = TEMP_DATE.getSeconds();

        TEMP_DAY = TEMP_DAY > 9 ? TEMP_DAY : '0' + TEMP_DAY;
        TEMP_MONTH = TEMP_MONTH > 9 ? TEMP_MONTH : '0' + TEMP_MONTH;
        TEMP_HOURS = TEMP_HOURS > 9 ? TEMP_HOURS : '0' + TEMP_HOURS;
        TEMP_MINUTES = TEMP_MINUTES > 9 ? TEMP_MINUTES : '0' + TEMP_MINUTES;
        TEMP_SECONDS = TEMP_SECONDS > 9 ? TEMP_SECONDS : '0' + TEMP_SECONDS;

        DATE_STRING = TEMP_YEAR + '-' + TEMP_MONTH + '-' + TEMP_DAY
            + ' ' + TEMP_HOURS + ':' + TEMP_MINUTES + ':' + TEMP_SECONDS;
    }
    TEMP_DATE = null;
    return DATE_STRING;
}
/**
 *
 * @param params
 * @returns {number}
 */
WebApp.prototype.parseTime = function (params) {
    var TEMP_DATE = new Date(params);
    var TEMP_TIME = TEMP_DATE.getTime() / 1000;
    TEMP_DATE = null;
    return TEMP_TIME;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.keyUpRequireNumber = function () {
    var TEMP_SELECTOR = 'input[data-keyup="number"]';
    $(document).on('keyup', TEMP_SELECTOR, function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    return this;
}
/**
 * Author:LIYONG
 * Date:2017-9-4
 * 获取特殊字符
 * @param str
 * @returns {boolean}
 */
WebApp.prototype.specialCharacter = function (str) {
    var flag = true;
    var forbidChar = ["@", "#", "$", "%", "^", "&", "*", "……", "“", "'", "￥", "×", "\"", "<", ">", "’", "”"];
    for (var i = 0; i < forbidChar.length; i++) {
        if (str.indexOf(forbidChar[i]) >= 0) {
            flag = false;
            messageBox.show("提示", "不能含有特殊字符！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
        }
    }
    return flag;
}
/**
 * Author:LIYONG
 * Date:2017-9-4
 * 获取文本长度
 * @param str
 * @returns {number}
 */
WebApp.prototype.textLength = function (str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
}
/**
 * Author:LIYONG
 * Date:2017-9-21
 * 加载中
 * @returns {WebApp}
 */

WebApp.prototype.loading = function (element) {
    console.log(10);
    var _this = this;
    if (element['selector'] == _this.RIGHT_CONTENT||element['selector']==_this.BLOCK_BODY) {
        element.find(".spinner").removeClass('hide').siblings().addClass('hide');
    } else {
        $(".spinner").addClass('hide').siblings().removeClass('hide');
    }
    ajax();
    function ajax() {
        // ajax加载前
        $(document).ajaxSend(function () {
            $(".spinner").addClass('hide').siblings().removeClass('hide');
            if (element.find(".spinner").length == 0){
                element.append(_this.TEMP_LOAD);
            }
            console.log(1111);
            console.log(typeof element);
            console.log(element.length);
            console.log(element[0]);
            element.find(".spinner").removeClass('hide').siblings().addClass('hide');


        });
        //ajax加载完成后
        $(document).ajaxComplete(function () {
            _this.TIMER = setTimeout(function () {
                element.find(".spinner").addClass('hide').siblings().removeClass('hide');
            }, 1000);
        });
    }

}

/**
 * Author:LIYONG
 * Date:2017-9-21
 * panel加载中 调用
 * @returns {WebApp}
 */

WebApp.prototype.checkLoading = function () {
    var _this = this;
    //第一层
    _this.loading($(_this.RIGHT_CONTENT));
    $(document).on('click', _this.LEFT_FULL, function () {
        _this.loading($(_this.RIGHT_CONTENT));
    })

    $(document).on('click', _this.PAGINATION_CODE, function () {
        _this.loading($(_this.RIGHT_CONTENT));
    })

    $(document).on('click', _this.PAGINATION_PREV, function () {
        var TEMP_ACTIVE = $(this).next('.pagination-item').find('.active').html();
        if (1 != TEMP_ACTIVE) {
            _this.loading($(_this.RIGHT_CONTENT));
        }
    })

    $(document).on('click', _this.PAGINATION_NEXT, function () {
        var LENGTH =Math.ceil($(this).next('.pagination-total').html().replace(/[^0-9]/ig,"")/10);
        var TEMP_ACTIVE = $(this).prev('.pagination-item').find('.active').html();
        if (LENGTH !=TEMP_ACTIVE) {
            _this.loading($(_this.RIGHT_CONTENT));
        }
    })
    //第二层
    $(document).on('click', _this.TAB_CHECK, function () {
        _this.loading($(_this.BLOCK_BODY));
    })

    $(document).on('click', _this.TABS_LI, function () {
        _this.loading($(_this.BLOCK_BODY));
    })

    $(document).on('click', _this.LG_CODE, function () {
        // _this.loading($(_this.BLOCK_BODY));
    })

    $(document).on('click', _this.LG_PREV, function () {
        var TEMP_ACTIVE = $(this).next('.pagination-item').find('.active').html();
        if (1 != TEMP_ACTIVE) {
            _this.loading($(_this.BLOCK_BODY));
        }
    })

    $(document).on('click', _this.LG_NEXT, function () {
        var LENGTH =Math.ceil($(this).next('.pagination-total').html().replace(/[^0-9]/ig,"")/10);
        var TEMP_ACTIVE = $(this).prev('.pagination-item').find('.active').html();
        if (LENGTH !=TEMP_ACTIVE) {
            _this.loading($(_this.BLOCK_BODY));
        }
    })
    // 第三层
    $(document).on('click', _this.LG_BUTTON, function () {
        console.log(1);
        _this.loading($(_this.PANEL_BODY));
    })

    $(document).on('click', _this.LG_PANEL, function () {
        console.log(2);
        _this.loading($(_this.PANEL_BODY));
    })

    $(document).on('click', _this.LG_BILLADD, function () {
        console.log(3);
        _this.loading($(_this.PANEL_BODY));
    })

    $(document).on('click',_this.LG_A, function () {
        console.log(4);
        _this.loading($(_this.PANEL_BODY));
    })

    $(document).on('click', _this.LG_PASSWORD, function () {
        console.log(5);
        _this.loading($(_this.SM_BUTTON).find('a'));
    })

    //第四层
    $(document).on('click', _this.SM_BUTTON, function () {
        _this.loading($(_this.SM_BUTTON).find('a'));
    })

    // $(document).on('click', '.tree-menu li', function () {
    //     console.log(11);
    //
    // })

}
/**
 *
 * @type {WebApp}
 */
var webApp = new WebApp();
/**
 * BEGIN
 * 自定义MessageBox弹窗
 * Author:PengLunJian
 * Data:2017-05-09
 * @constructor MessageBox
 */
function MessageBox() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.iSwitch = arguments['iSwitch'] ? arguments['iSwitch'] : true;
    this.element = arguments['element'] ? arguments['element'] : '#msgModal';
    this.backDrop = arguments['backDrop'] ? arguments['backDrop'] : '.modal-backdrop';
    this.btnConfirm = arguments['btnConfirm'] ? arguments['btnConfirm'] : this.element + ' .btn.confirm';
}
/**
 *
 * @type {{OK: string, CANCEL: string, OKCANCEL: string}}
 */
var MessageBoxButtons = {
    OK: '<button class="btn confirm" data-dismiss="modal">确认</button>',
    CANCEL: '<button class="btn cancel" data-dismiss="modal">取消</button>',
    OKCANCEL: '<button class="btn confirm" data-dismiss="modal">确认</button>'
    + '<button class="btn cancel" data-dismiss="modal">取消</button>',
}
/**
 *
 * @type {{infomation: string, warning: string, question: string, error: string}}
 */
var MessageBoxIcons = {
    infomation: "info_icon.png",
    warning: "warn_icon.png",
    question: "question_icon.png",
    error: "error_icon.png",
}
/**
 *
 * @param title
 * @param message
 * @param MessageBoxButtons
 * @param MessageBoxIcons
 * @returns {MessageBox}
 */
MessageBox.prototype.show = function (title, message, MessageBoxButtons, MessageBoxIcons) {
    $(this.element).remove();
    $(this.backDrop).remove();
    var TEMP_HTML = '<div class="modal fade" id="msgModal">'
        + '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">'
        + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        + '<h4 class="modal-title">' + title + '</h4></div><div class="modal-body"><div class="modal-info row">'
        + '<div class="modal-column col-xs-2"><img src="images/messageBox/' + MessageBoxIcons + '"/></div><div class="modal-column col-xs-10">'
        + '<p class="modal-text">' + message + '</p></div></div></div><div class="modal-footer">' + MessageBoxButtons + '</div></div></div></div>';

    $('body').prepend(TEMP_HTML);
    $(this.element).modal('toggle');
    return this;
}
/**
 *
 * @param fn
 * @returns {MessageBox}
 */
MessageBox.prototype.confirm = function (fn) {
    $(this.btnConfirm).on("click", function () {
        fn();
    });
    return this;
}
/**
 *
 * @type {MessageBox}
 */
var messageBox = new MessageBox();
/**
 * BEGIN 自定义分页插件
 * Author:PengLunJian
 * Date:2017-07-18
 * @constructor 分页插件构造函数
 */
function Pagination() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.ACTIVE = arguments['ACTIVE'] ? arguments['ACTIVE'] : ".active";
    this.PAGE_CODE = arguments['PAGE_CODE'] ? arguments['PAGE_CODE'] : 1;
    this.PAGE_SIZE = arguments['PAGE_SIZE'] ? arguments['PAGE_SIZE'] : 10;
    this.DATA_NUMS = arguments['DATA_NUMS'] ? arguments['DATA_NUMS'] : 0;
    this.PAGINATION = arguments['PAGINATION'] ? arguments['PAGINATION'] : ".pagination";
    this.TOTAL_PAGES = parseInt((parseInt(this.DATA_NUMS) + this.PAGE_SIZE - 1) / this.PAGE_SIZE);
    this.PAGINATION_PREV = arguments['PAGINATION_PREV'] ? arguments['PAGINATION_PREV'] : this.PAGINATION + " .pagination-prev";
    this.PAGINATION_CODE = arguments['PAGINATION_CODE'] ? arguments['PAGINATION_CODE'] : this.PAGINATION + " .pagination-code";
    this.PAGINATION_NEXT = arguments['PAGINATION_NEXT'] ? arguments['PAGINATION_NEXT'] : this.PAGINATION + " .pagination-next";
    this.CHANGE_PAGE = arguments['CHANGE_PAGE'] ? arguments['CHANGE_PAGE'] : null;

    this.init();
}
/**
 * BEGIN 初始化分页插件
 * Author:PengLunJian
 * Date:2017-07-18
 * @returns {Pagination} 返回当前对象实现连缀调用
 */
Pagination.prototype.init = function () {
    this.loadPagination();
    this.codeButtonPress();
    this.prevButtonPress();
    this.nextButtonPress();
    return this;
}
/**
 * BEGIN 加载分页插件方法
 * Author:PengLunJian
 * Date:2017-07-18
 * @returns {Pagination} 返回当前对象实现连缀调用
 */
Pagination.prototype.loadPagination = function () {
    $(this.PAGINATION).html("");
    var TEMP_NUMS = this.TOTAL_PAGES >= 5 ? 5 : this.TOTAL_PAGES;
    if (this.TOTAL_PAGES > 0) {

        var TEMP_HTML = '<div class="pagination-box"><div class="pagination-prev">'
            + '<i class="icon-prev"></i></div><div class="pagination-item">';

        for (var i = 0; i < TEMP_NUMS; i++) {
            var TEMP_ACTIVE = i == 0 ? " active" : "";
            TEMP_HTML += '<div class="pagination-code' + TEMP_ACTIVE + '">' + (i + 1) + '</div>';
        }
        TEMP_HTML += '</div><div class="pagination-next">'
            + '<i class="icon-next"></i> </div><div class="pagination-total">共 ' + this.DATA_NUMS + ' 条</div></div>';

        $(this.PAGINATION).html(TEMP_HTML);
    }
    return this;
}
/**
 * BEGIN 点击分页插件页码功能
 * Author:PengLunJian
 * Date:2017-07-18
 * @returns {Pagination} 返回当前对象实现连缀调用
 */
Pagination.prototype.codeButtonPress = function () {
    var _this = this;
    $(this.PAGINATION_CODE).on("click", function () {
        var ACTIVE_STR = _this.ACTIVE.substring(1);
        $(_this.PAGINATION_CODE).removeClass(ACTIVE_STR);
        $(this).addClass(ACTIVE_STR);

        _this.PAGE_CODE = parseInt($(this).text());
        if ("function" == typeof _this.CHANGE_PAGE) _this.CHANGE_PAGE(_this.PAGE_CODE);
    });
    return this;
}
/**
 * BEGIN 点击分页插件上一页功能
 * Author:PengLunJian
 * Date:2017-07-18
 * @returns {Pagination} 返回当前对象实现连缀调用
 */
Pagination.prototype.prevButtonPress = function () {
    var _this = this;
    $(this.PAGINATION_PREV).on("click", function () {
        _this.PAGE_CODE--;
        _this.MIN_PAGE = _this.PAGE_CODE;
        _this.PAGE_CODE = _this.PAGE_CODE <= 1 ? 1 : _this.PAGE_CODE;
        var FIRST_TEXT = parseInt($(_this.PAGINATION_CODE).eq(0).text().trim());
        if (FIRST_TEXT != 1) {
            $(_this.PAGINATION_CODE).each(function () {
                $(this).text(parseInt($(this).text()) - 1);
            });
        }
        _this.bindStatus(this);
        if ("function" == typeof _this.CHANGE_PAGE && _this.MIN_PAGE != 0) _this.CHANGE_PAGE(_this.PAGE_CODE);
    });
    return this;
}
/**
 * BEGIN 点击分页插件下一页功能
 * Author:PengLunJian
 * Date:2017-07-18
 * @returns {Pagination} 返回当前对象实现连缀调用
 */
Pagination.prototype.nextButtonPress = function () {
    var _this = this;
    $(this.PAGINATION_NEXT).on("click", function () {
        _this.PAGE_CODE++;
        _this.MAX_PAGE = _this.PAGE_CODE;
        _this.PAGE_CODE = _this.PAGE_CODE >= _this.TOTAL_PAGES ? _this.TOTAL_PAGES : _this.PAGE_CODE;
        var FIRST_TEXT = parseInt($(_this.PAGINATION_CODE).eq(0).text().trim());
        var PARAMS_VALUE = _this.TOTAL_PAGES - $(_this.PAGINATION_CODE).length + 1;
        if (_this.PAGE_CODE > Math.ceil($(_this.PAGINATION_CODE).length / 2) && FIRST_TEXT < PARAMS_VALUE) {
            $(_this.PAGINATION_CODE).each(function () {
                $(this).text(parseInt($(this).text()) + 1);
            });
        }
        _this.bindStatus(this);
        if ("function" == typeof _this.CHANGE_PAGE && _this.MAX_PAGE <= _this.TOTAL_PAGES) _this.CHANGE_PAGE(_this.PAGE_CODE);
    });
    return this;
}
/**
 * BEGIN 绑定当前页码状态
 * Author:PengLunJian
 * Date:2017-07-18
 * @param obj 对象形参
 * @returns {Pagination} 返回当前对象实现连缀调用
 */
Pagination.prototype.bindStatus = function (obj) {
    var _this = this;
    var ACTIVE_STR = this.ACTIVE.substring(1);
    $(this.PAGINATION_CODE).removeClass(ACTIVE_STR);
    $(this.PAGINATION_CODE).each(function () {
        if (parseInt($(this).text()) == _this.PAGE_CODE) {
            $(this).addClass(ACTIVE_STR);
        }
    });
    return this;
}
/**
 * BEGIN 绑定当前页码状态
 * Author:PengLunJian
 * Date:2017-07-18
 * @type {Pagination} 分页插件类型
 */
// var pagination = new Pagination();
/**
 *
 * @constructor
 */
function RegularExpress() {
    arguments = arguments.length != 0 ? arguments[0] : arguments;
    // 姓名正则
    this.NAME_REG_EXP = arguments['NAME_REG_EXP'] ? arguments['NAME_REG_EXP'] : /^(([\u4e00-\u9fa5]{1,5})|([a-zA-Z]{1,10}))$/;
    // 密码正则
    this.PWD_REG_EXP = arguments['PWD_REG_EXP'] ? arguments['PWD_REG_EXP'] : /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{8,16}$/;
    // 手机正则
    this.PHONE_REG_EXP = arguments['PHONE_REG_EXP'] ? arguments['PHONE_REG_EXP'] : /^([\d]{11}|[\d]{10})$/;
    // 月份正则
    this.MONTH_REG_EXP = arguments['MONTH_REG_EXP'] ? arguments['MONTH_REG_EXP'] : /^[1-9]\d*$/;
    // 金额正则
    this.MONEY_REG_EXP = arguments['MONEY_REG_EXP'] ? arguments['MONEY_REG_EXP'] : /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
    // 租客数正则
    this.CUSTOMER_REG_EXP = arguments['CUSTOMER_REG_EXP'] ? arguments['CUSTOMER_REG_EXP'] : /^[1-9]\d*$/;
    // 楼层数正则
    this.FLOORCOUNT_REG_EXP = arguments['FLOORCOUNT_REG_EXP'] ? arguments['FLOORCOUNT_REG_EXP'] : /^[1-9]\d*|0$/;
    // 层户数正则
    this.ROOMCOUNT_REG_EXP = arguments['ROOMCOUNT_REG_EXP'] ? arguments['ROOMCOUNT_REG_EXP'] : /^[1-9]\d*|0$/;
    // 面积正则
    this.AREA_REG_EXP = arguments['AREA_REG_EXP'] ? arguments['AREA_REG_EXP'] : /^\d{1,18}(.\d{1,18})?$/;
    // 房型正则
    this.ROOMLAYOUT_REG_EXP = arguments['AREA_REG_EXP'] ? arguments['AREA_REG_EXP'] : /^\d{1,18}(.\d{1,18})?$/;
    //度数正则
    this.DEGREE_REG_EXP = arguments['DEGREE_REG_EXP'] ? arguments['DEGREE_REG_EXP'] : /^([1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/;
    //工号正则
    this.WORKNUMBER_REG_EXP = arguments['WORKNUMBER_REG_EXP'] ? arguments['WORKNUMBER_REG_EXP'] : /^[A-Za-z0-9]{1,10}$/;
    // 费用正则
    this.COST_REG_EXP = arguments['COST_REG_EXP'] ? arguments['COST_REG_EXP'] : /^\d{1,18}(.\d{1,18})?$/;
    // 日期正则
    this.ADVANCE_REG_EXP = arguments['ADVANCE_REG_EXP'] ? arguments['ADVANCE_REG_EXP'] : /^\+?[1-9][0-9]*$/;
    // 角色名称正则
    this.ROLE_REG_EXP = arguments['ROLE_REG_EXP'] ? arguments['ROLE_REG_EXP'] : /^([\u4e00-\u9fa5]||[A-Za-z0-9]){1,6}$/;
    // 验证码正则
    this.CODE_REG_EXP = arguments['CODE_REG_EXP'] ? arguments['CODE_REG_EXP'] : /^(\d{4})$/;
    //标签名正则
    this.LABEL_REG_EXP = arguments['LABEL_REG_EXP'] ? arguments['LABEL_REG_EXP'] : /^[\w\u4E00-\u9FA5\uF900-\uFA2D]{1,10}$/g;
// 部门名
    this.DPT_NAME_REG_EXP = arguments['DPT_NAME_REG_EXP'] ? arguments['DPT_NAME_REG_EXP'] : /^(([\u4e00-\u9fa5]{1,10})|([a-zA-Z0-9]{1,20}))$/;
}
/**
 *
 * @param reg
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.check = function (reg, params) {
    var result = true;
    if (reg.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.nameRegExpCheck = function (params) {
    var result = true;
    if (this.NAME_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.passwordRegExpCheck = function (params) {
    var result = true;
    if (this.PWD_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.phoneRegExpCheck = function (params) {
    var result = true;
    if (this.PHONE_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.monthRegExpCheck = function (params) {
    var result = true;
    if (this.MONTH_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.moneyRegExpCheck = function (params) {
    var result = true;
    if (this.MONEY_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.customerRegExpCheck = function (params) {
    var result = true;
    if (this.CUSTOMER_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.floorCountRegExpCheck = function (params) {
    var result = true;
    if (this.FLOORCOUNT_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.roomCountRegExpCheck = function (params) {
    var result = true;
    if (this.ROOMCOUNT_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.areaRegExpCheck = function (params) {
    var result = true;
    if (this.AREA_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.roomLayoutRegExpCheck = function (params) {
    var result = true;
    if (this.ROOMLAYOUT_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.degreeRegExpCheck = function (params) {
    var result = true;
    if (this.DEGREE_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.worknumberRegExpCheck = function (params) {
    var result = true;
    if (this.WORKNUMBER_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.costRegExpCheck = function (params) {
    var result = true;
    if (this.COST_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.advanceRegExpCheck = function (params) {
    var result = true;
    if (this.ADVANCE_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.roleRegExpCheck = function (params) {
    var result = true;
    if (this.ROLE_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.codeRegExpCheck = function (params) {
    var result = true;
    if (this.CODE_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.labelRegExpCheck = function (params) {
    var result = true;
    if (this.LABEL_REG_EXP.test(params)) result = false;
    return result;
}
/**
 *
 * @type {RegularExpress}
 */
var regular = new RegularExpress();
