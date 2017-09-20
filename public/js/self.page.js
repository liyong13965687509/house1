/**
 *构造函数
 * Author:LIYONG
 * Date:2017-9-20
 * @constructor
 */
function PersonalPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;

    this.GET_CODE = arguments['GET_CODE'] ? arguments['GET_CODE'] : "GET_CODE";
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        GET_CHECKCODE: "/identity/phonevalidcode",
        PWD_CHANGE: "/identity/pwdresetuser",
        VALID: "/identity/phonevalid"
    };
    this.init();
}

/**
 *页面初始化
 * @returns {PersonalPage}
 */
PersonalPage.prototype.init = function () {

    this.checkTab();
    this.validBind();
    this.exeGetCheckCode();
    return this;
}

/**
 * Author:LIYONG
 * Date:2017-9-20
 * 选项卡选择
 * @returns {PersonalPage}
 */
PersonalPage.prototype.checkTab = function () {
    $('.person-list li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var INDEX = $('.person-list li').index($(this));
        $('.righr-content>.form-body').eq(INDEX).removeClass('hide')
            .siblings('.form-body').addClass('hide');
        $('.right-title .form-group').eq(INDEX).removeClass('hide')
            .siblings('.form-group').addClass('hide');
        $('#empPhone').val('');
        $('#validYzm').val('');
        $('#OldPwd').val('');
        $('#NewPwd1').val('');
        $('#NewPwd2').val('');
    });
    $("#now-phone").text(localStorage.getItem("phone"));
    return this;
}
/**
 *参数
 * @param name
 * @returns {*}
 */
PersonalPage.prototype.getParams = function (name) {
    var _this = this;
    var params = null;
    switch (name) {
        case _this.GET_CODE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                phone: $("#empPhone").val().trim()
            }
            break;
        // 密码修改
        case this.API_CONFIG['PWD_CHANGE']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                employeeCharId: localStorage.getItem("employeeCharId"),
                oldPwd: $("#OldPwd").val(),
                newPwd1: $("#NewPwd1").val(),
                newPwd2: $("#NewPwd2").val()
            };
            break;
        // 手机验证
        case this.API_CONFIG['VALID']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                phone: $("#empPhone").val(),
                code: $('#validYzm').val()
            };
            break;
    }
    return params;

}


/**
 *认证基础数据绑定
 * @returns {PersonalPage}
 */
PersonalPage.prototype.validBind = function () {
    var _this = this;
    var txt = "";
    if (localStorage.getItem("isValid") != 1) {
        txt = "（未认证）";
        $(".unapprove").text(txt);
    }
    else {
        txt = "（已认证）";
        $('.none-approve').addClass('hide').prev('.already-approve').removeClass('hide');
        // _this.certified();
    }
    $(".unapprove").text(txt);
    return this;
}

/**
 * 手机认证
 * @returns {PersonalPage}
 */
PersonalPage.prototype.valid = function () {
    var _this = this;
    if (localStorage.getItem('code') == $('#validYzm').val()) {//zhrong0303判断验证码是否正确
        _this.ajaxRequestValid(_this.getParams(_this.API_CONFIG['VALID']));
    }
    else {
        messageBox.show("错误", "验证码不正确 ！", MessageBoxButtons.OK, MessageBoxIcons.error);
    }
    return this;
}

/**
 * 密码修改
 * @returns {PersonalPage}
 */
PersonalPage.prototype.pwdChange = function () {
    var params = {
        oldPassword: $("#OldPwd").val(),
        newPassword: $("#NewPwd1").val().trim()
    }
    var _this = this;
    if (params.oldPassword == '') {
        messageBox.show("警告", "请输入旧密码！", MessageBoxButtons.OK, MessageBoxIcons.warning);
    } else if (regular.check(regular.PWD_REG_EXP, params.newPassword)) {
        messageBox.show("警告", "请输入8-16位新密码！", MessageBoxButtons.OK, MessageBoxIcons.warning);
    } else if (params.oldPassword == params.newPassword) {
        messageBox.show("提示", "新密码不能与当前密码相同！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
    } else {
        _this.ajaxRequestPwdChange(_this.getParams(_this.API_CONFIG['PWD_CHANGE']))
    }
    return this;
}

/**
 * 密码修改ajax
 * @param params
 * @returns {PersonalPage}
 */
PersonalPage.prototype.ajaxRequestPwdChange = function (params) {
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['PWD_CHANGE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var msg = data['msg'] + ",请重新登录!";
                messageBox.show("提示", msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                messageBox.confirm(function () {
                    params['oldPwd'] = '';
                    params = webApp.getParams(webApp.LOGIN_OUT);
                    webApp.ajaxRequestWebAppExit(params);
                });
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
 * 手机认证ajax
 * @param params
 * @returns {PersonalPage}
 */
PersonalPage.prototype.ajaxRequestValid = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['VALID'],
        type: "POST",
        data: params,
        success: function (data) {
            console.log(params);
            console.log(data);
            if (data['succ']) {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
//                        liyong认证成功后刷新页面
                localStorage.setItem("isValid", 1);
                _this.validBind();
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
 *触发获取验证码按钮
 * @returns {PersonalPage}
 */
PersonalPage.prototype.exeGetCheckCode = function () {
    var _this = this;
    $(document).on("click", ".get-code", function () {
        new TimerComponent({
            element: ".get-code",
            initTime: 60,
            complete: function () {
            }
        });
        var params = _this.getParams(_this.GET_CODE);
        _this.ajaxRequestCodeCheck(params);
    });
    return this;
}


/**
 * Author:liyong
 * Date:2017-8-15
 * 获取验证码
 * @param params
 * @returns {PersonalPage}
 */
PersonalPage.prototype.ajaxRequestCodeCheck = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['GET_CHECKCODE'],
        type: "POST",
        data: params,
        success: function (data) {
            console.log(data);
            console.log(params);
            if (data['succ']) {
                localStorage.setItem("code", data['data']['code']);
                messageBox.show("提示", "验证码获取成功 ! 请查看您的手机 ! ", MessageBoxButtons.OK, MessageBoxIcons.infomation);
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

var personal = new PersonalPage();



