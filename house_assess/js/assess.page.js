/**
 * 构造函数
 * Author:liyong
 * Date:2017-11-01
 * @constructor
 */
function AssessPage() {
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
         ASSESS:"http://service.xpchina.com/ashx/AssessAjax.ashx",

    }
    this.init();
}
/**
 *参数
 * Author:liyong
 * Date:2017-11-02
 * @param name
 * @returns {*}
 */
AssessPage.prototype.getParams = function (name) {
    var params = null,
        _this = this;
    switch (name) {
        case this.API_CONFIG['ASSESS']:
            params = {
                method: 'add_assess',
                cus_rowid: "0AB08989-2786-4936-B1E5-5AD5A31A8F1F",
                cus_tel: "15900912480",
                plot_rowid: localStorage.getItem('row_id'),
                plot_name:$(".group-plot a input").val().trim(),
                plot_address:'',
                layout:$("#room").val().trim()+"室"+$("#hall").val().trim()+"厅"+$("#who").val().trim()+"卫",
                size:$("#area").val().trim(),
                fitment:"",
                floor_all:$("#floor_all").val().trim(),
                floor_at:$("#floor_at").val().trim(),
                est_detail:$("#build").val().trim()+"#"+$("#roomNumber").val().trim(),
                est_sit_txt:$(".group-toward a input").val().trim(),
                fran_code:"",
                reg_id:"18",
                city_no:"520"
            };
            break;
    };
    return params;
}


/**
 * 初始化
 * Author:liyong
 * Date:2017-11-01
 * @returns {AssessPage}
 */
AssessPage.prototype.init=function () {
    this.keyUpRequireNumber();
    this.toward();
    this.selectPlot();
    this.lookAssess();
    return this;
}
/**
 * 只能输入数字
 * Author:liyong
 * Date:2017-11-01
 * @returns {AssessPage}
 */
AssessPage.prototype.keyUpRequireNumber=function(){
    var TEMP_SELECTOR = 'input[data-keyup="number"]';
    $(document).on('keyup', TEMP_SELECTOR, function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    return this;
}
/**
 * 朝向弹窗
 * Author:liyong
 * Date:2017-11-01
 * @returns {AssessPage}
 */
AssessPage.prototype.toward=function () {
    $(".group-toward").on("click", function () {
        $(".modal").removeClass("hide");
    });
    $(".modal_bg").on("click", function () {
        $(this).parents(".modal").addClass("hide");
    });

    $(".modal a").on("click", function () {
        $(".modal_addr .modal_body a").removeClass("active");
        $(this).addClass("active");
        $(".group-toward a input").val($(this).html());
        $(this).parents(".modal").addClass("hide");
    })
    return this;
}
/**
 * 选择小区
 * Author:liyong
 * Date:2017-11-02
 * @returns {AssessPage}
 */
AssessPage.prototype.selectPlot=function(){
    if(localStorage.getItem('plot_name')) $(".group-plot a input").val(localStorage.getItem('plot_name'));
    return this;
}
/**
 * 查看评估
 * Author:liyong
 * Date:2017-11-02
 * @returns {AssessPage}
 */
AssessPage.prototype.lookAssess=function(){
    var _this=this;
    $(".btn-primary").click(function() {
        var result = false, flag = false,assessMessage='';
            $('.assess_page input').each(function () {
                if ($(this).val().trim() == "") {
                    flag = true;
                }
            })
            if ($('.group-plot input').val() == "") {
                assessMessage = "请选择小区";
            } else if ($('#area').val().trim() == "") {
                assessMessage = "请输入面积";
            } else if ($('#room').val().trim() == "") {
                assessMessage = "请输入几室";
            } else if ($('#hall').val().trim() == "") {
                assessMessage = "请输入几厅";
            } else if ($('#who').val().trim() == "") {
                assessMessage = "请输入几卫";
            } else if ($('.group-toward input').val() == "") {
                assessMessage = "请选择朝向";
            }else if ($('#floor_at').val().trim() == "") {
                assessMessage = "请输入所在楼层";
            }else if ($('#floor_all').val().trim() == "") {
                assessMessage = "请输入总楼层";
            }else if ($('#build').val().trim() == "") {
                assessMessage = "请输入座幢";
            }else if ($('#roomNumber').val().trim() == "") {
                assessMessage = "请输入房号";
            } else {
                result = true;
            }
            if (result) {
                var params = _this.getParams(_this.API_CONFIG['ASSESS']);
                _this.ajaxRequestAssess(params);
            } else {
                alert(assessMessage);
            }

        })

    return this;
}
/**
 * 查看评估ajax
 * Author:liyong
 * Date:2017-11-02
 * @returns {AssessPage}
 */
AssessPage.prototype.ajaxRequestAssess=function(params){
    $.ajax({
        type: "POST",
        url: this.API_CONFIG['ASSESS'],
        data: params,
        dataType: "text",
        success: function (data) {
           if(data!=0){
               location.href="result.html";
               localStorage.setItem('plot_name', "");
               localStorage.row_id = data;
           }else{

           }

        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            alert("资源请求失败");
        }

    });
    return this;
}


var assess=new AssessPage();