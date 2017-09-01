/**
 * 身份认证页
 */
;
(function() {	
	var selectDateDom = $('#selectDate');
    var showDateDom = $('#IdentityStatus');
    // 初始化时间
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();
    showDateDom.attr('data-year', nowYear);
    showDateDom.attr('data-month', nowMonth);
    showDateDom.attr('data-date', nowDate);
    // 数据初始化
    function formatYear (nowYear) {
        var arr = [];
        for (var i = nowYear - 20; i <= nowYear + 20; i++) {
            arr.push({
                id: i + '',
                value: i + '年'
            });
        }
        return arr;
    }
    function formatMonth () {
        var arr = [];
        for (var i = 1; i <= 12; i++) {
            arr.push({
                id: i + '',
                value: i + '月'
            });
        }
        return arr;
    }
    function formatDate (count) {
        var arr = [];
        for (var i = 1; i <= count; i++) {
            arr.push({
                id: i + '',
                value: i + '日'
            });
        }
        return arr;
    }
    var yearData = function(callback) {
      /*  setTimeout(function() {*/
            callback(formatYear(nowYear))
     /*   }, 2000)*/
    }
    var monthData = function (year, callback) {
        /*setTimeout(function() {*/
            callback(formatMonth());
   /*     }, 2000);*/
    };
    var dateData = function (year, month, callback) {
            if (/^1|3|5|7|8|10|12$/.test(month)) {
                callback(formatDate(31));
            }
            else if (/^4|6|9|11$/.test(month)) {
                callback(formatDate(30));
            }
            else if (/^2$/.test(month)) {
                if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
                    callback(formatDate(29));
                }
                else {
                    callback(formatDate(28));
                }
            }
            else {
                throw new Error('month is illegal');
            }
    };
    
indexside("#indexside","#imgBox");
indexside("#otherside","#imgBox2");
function indexside(upload,imgbox){
    var j = 1;
    $(function () {
        // 单张
        $(upload).on('change', function (e) {
            new html5ImgCompress(e.target.files[0], {
                before: function(file) {
                //console.log('单张: 压缩前...');
                },
                done: function (file, base64) {
                //console.log('单张: 压缩成功...');
                //insertImg(file, j); // 显示原图
                insertImg(base64, j++); // 显示压缩后
                },
                fail: function(file) {
                //console.log('单张: 压缩失败...');
                },
                complete: function(file) {
                //console.log('单张: 压缩完成...');
                },
                notSupport: function(file) {
                alert('浏览器不支持！');
                }
            });
        });
    })
    // html中插入图片
    function insertImg(file, j) {
        var
        img = new Image(),
        title, src, size, base;

        if (typeof file === 'object') {
        title = '前';
        size = file.size;
        src = URL.createObjectURL(file);
        base = 1024;
        } else {
        title = '后';
        size = file.length;
        src = file;
        base = 1333;
        }

        // if (!$('.box_' + j).length) {
        //     $(imgbox).prepend('<div class="box_' + j + '" />'); // 逆序，方便demo多次上传预览
        // }

        img.onload = function() {
            $(imgbox).prepend(img);
        };

        img.src = src;

        file = null; // 处理完后记得清缓存
    };
}
    var idcard = {
            url:'/member/idcard',
            success: function(res){
                var IdentityName = $('#IdentityName').val();
                var IdentityStatus = $('#IdentityStatus').html();
                var IdCard = $('#IdCard').val();
                var indexsideVal = $("#indexside").val();
                var othersideVal = $("#otherside").val();
                var userid = res.data.id;
                var username = res.data.name;
                var userdate = res.data.expiry_date;
                var userapic = res.data.idcard_apic;
                var userbpic = res.data.idcard_bpic;
                var useridcard = res.data.idcard;
                if(res.code == 1){
                    $('#IdentityName').val(username);
                    $('#IdentityStatus').html(userdate);
                    $('#IdCard').val(useridcard);
                    $("#imgBox").prepend('<img src=\''+userapic+'\'/>');
                    $("#imgBox2").prepend('<img src=\''+userbpic+'\'/>');
                    if( res.data.isidcard == 1){
                        $("#page-submit,.page-button").css("display","none");
                        $(".page-form input").each(function(){
                            $(this).prop('disabled',true)
                        });
                    }else{
                        $("#page-submit,.page-button").css("display","block");
                        $(".page-form input").each(function(){
                            $(this).prop('disabled',false)
                        });
                        selectDateDom.bind('click', function () {
                            var oneLevelId = showDateDom.attr('data-year');
                            var twoLevelId = showDateDom.attr('data-month');
                            var threeLevelId = showDateDom.attr('data-date');
                            var iosSelect = new IosSelect(3, 
                                [yearData, monthData, dateData],
                                {
                                    title: '身份有效期',
                                    itemHeight: 35,
                                    relation: [1, 1],
                                    oneLevelId: oneLevelId,
                                    twoLevelId: twoLevelId,
                                    threeLevelId: threeLevelId,
                                    showLoading: true,
                                    callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                                        showDateDom.attr('data-year', selectOneObj.id);
                                        showDateDom.attr('data-month', selectTwoObj.id);
                                        showDateDom.attr('data-date', selectThreeObj.id);
                                        showDateDom.html(selectOneObj.id + '-' + selectTwoObj.id + '-' + selectThreeObj.id);
                                    }
                            });
                        });
                    }
                    //验证JS
                    $('#page-submit,.page-button').on('click',function(){
                        var IdentityName = $('#IdentityName').val();
                        var IdentityStatus = $('#IdentityStatus').html();
                        var IdCard = $('#IdCard').val();
                        var indexsideVal = $("#indexside").val();
                        var othersideVal = $("#otherside").val();
                        if(IdentityName.length <= 2 ){
                            util.toast("姓名至少2个字符,最多4个中文字符");
                            return false;
                        }else if(/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/.test(IdentityName)){
                            util.toast("姓名至少2个字符,最多4个中文字符");
                            return false;
                        }
                        else if(IdentityStatus.indexOf("如") > -1 || IdentityStatus == ''){
                            util.toast("请选择您的有效期");
                            return false;
                        }else if(IdCard == ''){
                            util.toast("您输入您身份证号码");
                            return false;
                        }else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(IdCard))){
                            util.toast("您输入身份证格式有错误！");
                            return false;	 
                        }else if(!indexsideVal){
                            util.toast("请上传身份证正面照");
                            return false;
                        }else if(!othersideVal){
                            util.toast("请上传身份证反面照");
                            return false;
                        }else if($(this).hasClass('.page-button')){
                            submit("workinfo.html");
                        }else{
                            submit("authcenter.html");
                        }
                
                    });
                    function submit(URL){
                        // 数据请求
                        var next = {
                                url:'/member/editidcard',
                                data:{
                                    name: $('#IdentityName').val(),
                                    expiry_date: $('#IdentityStatus').html(),
                                    idcard_apic: $("#imgBox img").attr('src'),
                                    idcard_bpic: $("#imgBox2 img").attr('src'),
                                    idcard: $('#IdCard').val(),
                                    id: userid
                                },
                                success: function(res){
                                    if(res.code == 1){
                                        window.location.href = URL
                                    }else{
                                        util.toast(res.msg);
                                    }
                                }
                        }
                        sendRequest('post',next)
                    };
                }
                
                
            }
    }
    sendRequest('post',idcard)

    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };
    
})();