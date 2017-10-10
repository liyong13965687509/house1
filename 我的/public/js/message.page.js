/**
 * 构造函数
 * Author:LiYong
 * Date:2017-09-19
 * @constructor
 */
function MessagePage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.MARK_READ= arguments['MARK_READ'] ? arguments['MARK_READ'] : '.mark-read';
    this.ALL_READ= arguments['ALL_READ'] ? arguments['ALL_READ'] : '.all-read';
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {

    }
    this.init();
}

/**
 *初始化函数
 * Author:LiYong
 * Date:2017-09-19
 * @returns {MessagePage}
 */
MessagePage.prototype.init = function () {
    //移除本地缓存
    localStorage.removeItem("isAlert");
    App.init();
    ComponentsPickers.init();

    this.markRead();
    return this;
}

/**
 * 参数
 * Author:LiYong
 * Date:2017-09-19
 * @param name
 * @returns {*}
 */
MessagePage.prototype.getParams = function (name) {


    return params;
}


/**
 *标记已读
 * Author:LiYong
 * Date:2017-09-19
 * @returns {MessagePage}
 */
MessagePage.prototype.markRead=function () {
    $(document).on('click',this.ALL_READ,function () {
        $('.right-body ul li i').removeClass('hide');
        $('.mark-read').removeClass('mark-blue');

    });

    $(document).on('click',this.MARK_READ,function () {
        $(this).toggleClass('mark-blue').parents('.body-right')
            .prev('.body-left').find('i').toggleClass('hide');
    });
    return this;
}

var mgp = new MessagePage();
