/**
 * 工作信息页
 */

;
(function() {
    var personInfo = {
        years:0, // 工作年限
        Income:0, //年收入
        init: function() { // 初始化
            this.getWorkInfo();
        },
        bindEvent: function() { //事件绑定
            var self = this;
            var $cityBtn = $('#city');
            var $showDom = $('.city-show');
            //本单位工作年限select
            $('#time').on('click', function() {
                var timeSelect = new IosSelect(1, [timeData], {
                    container: '.container',
                    title: '',
                    itemHeight: 50,
                    itemShowCount: 5,
                    oneLevelId: '3',
                    callback: function(data) {
                        $('.time-show').html(data.value);
                        self.years = data.id;
                    }
                });
            });
            //本单位工作年收入select
            $('#aftertx').on('click', function() {
                var timeSelect = new IosSelect(1, [timeData1], {
                    container: '.container',
                    title: '',
                    itemHeight: 50,
                    itemShowCount: 5,
                    oneLevelId: '10003',
                    callback: function(data) {
                        $('.time-show1').html(data.value);
                        self.Income = data.id;
                    }
                });
            });
            //现居城市select
            $cityBtn.bind('click', function() {
                var oneLevelId = $showDom.attr('data-province-code');
                var twoLevelId = $showDom.attr('data-city-code');
                var threeLevelId = $showDom.attr('data-district-code');
                var iosSelect = new IosSelect(3, [iosProvinces, iosCitys, iosCountys], {
                    title: '地址选择',
                    itemHeight: 35,
                    relation: [1, 1, 0, 0],
                    oneLevelId: "130000",
                    twoLevelId: "130300",
                    threeLevelId: "130304",
                    callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
                        $showDom.attr('data-province-code', selectOneObj.id);
                        $showDom.attr('data-city-code', selectTwoObj.id);
                        $showDom.attr('data-district-code', selectThreeObj.id);
                        $showDom.html(selectOneObj.value + ',' + selectTwoObj.value + ',' + selectThreeObj.value);
                    }
                });
            });
        },
        getWorkInfo: function() { //初始化默认信息
            var self = this;
            var options = {
                url: '/member/workinfo',
                success: function(res) {
                    // 返回成功状态
                    if (res.code == 1) {
                        var data = res.data;
                        var userid = data.id; // 会员id
                        var workyears = data.total_work_years;
                        var yearIncome = data.year_income;
                        (workyears) ? self.years = workyears :  '';
                        (yearIncome) ? self.Income = yearIncome : '';
                        // console.log('工作年限：'+self.years+'----年收入：'+self.Income);
                        switch(workyears){
                            case "1":
                                workyears = "0-1年";
                                break;
                            case "2":
                                workyears = "1-2年";
                                break;
                            case "3":
                                workyears = "3-5年";
                                break;
                            case "4":
                                workyears = "5-10年";
                                break;
                            case "5":
                                workyears = "10年以上";
                                break;
                            default:;
                        }
                        $('#WorkTime').html(workyears); // 工作年限
                        switch(yearIncome){
                            case "10001":
                                yearIncome = "2万以下";
                                break;
                            case "10002":
                                yearIncome = "2-4万";
                                break;
                            case "10003":
                                yearIncome = "4-6万";
                                break;
                            case "10004":
                                yearIncome = "6-10万";
                                break;
                            case "10005":
                                yearIncome = "8-10万";
                                break;
                            case "10006":
                                yearIncome = "10-15万";
                                break;
                            case "10007":
                                yearIncome = "15-30万";
                                break;
                            case "10008":
                                yearIncome = "30万以上";
                                break;
                            default:;
                        }
                        $('#Income').html(yearIncome); // 税后年收入
                        $("#WorkUnit").val(data.unit_name);
                        $("#JobTitle").val(data.work_title);
                        $('#WorkCity').html(data.unit_province+' '+data.unit_city+' '+data.unit_distinct); // 单位所在地
                        $('#DetailedAddress').val(data.unit_street); // 详细地址
                        $('#phone').val(data.unit_phone); //单位电话

                        // 如果返回会员数据
                        if (data.issubmit == 1) {
                            // 禁止修改数据
                            $(".page-button").css("display", "none");
                            $(".change").css("display","block");
                            $(".page-form input").each(function() {
                                $(this).prop('disabled', true)
                            });
                        }
                        //如未保存过数据，择可编辑，提交
                        else {
                                self.checkForm(userid);
                                self.bindEvent();
                                $(".page-form input").each(function() {
                                $(this).prop('disabled', false)
                            });
                        }
                        $(".change").on('click',function(){
                                self.checkForm(userid);
                                self.bindEvent();
                                $(".page-form input").each(function() {
                                $(this).prop('disabled', false)
                            });
                        })
                    }
                    //返回失败状态
                    else if (res.code ==2){
                        
                    }
                    else {
                        util.toast("请求失败，请重试");
                        return false;
                    }
                }
            }
            sendRequest('post', options)
        },
        submit: function(url, data) { //提交信息
            var options = {
                url: '/member/editworkinfo',
                data: data,
                success: function(res) {
                    if (res.code == 1) {
                        window.location.href = url
                    }
                }
            }
            sendRequest('post', options)
        },
        checkForm: function(userid) { // 验证
            var self = this;
            var isMobile = /^1(3|4|5|7|8)\d{9}$/;
            var isPhone=/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
            $('.submit-btn,.page-button').on('click', function() {
                var url = '';
                var WorkUnit = $('#WorkUnit').val();
                var JobTitle = $('#JobTitle').val();
                var WorkTime = $('#WorkTime').html();
                var Income = $('#Income').html();
                var WorkCity = $('#WorkCity').html();
                var DetailedAddress = $('#DetailedAddress').val();
                var phone = $('#phone').val();
                var data = {
                    id: userid,
                    unit_name: WorkUnit,
                    work_title: JobTitle,
                    total_work_years: self.years,
                    year_income: self.Income,
                    unit_province: WorkCity,
                    unit_street: DetailedAddress,
                    unit_phone: phone
                }
                
                
                if (WorkUnit.length < 4) {
                    util.toast("请输入您的工作单位");
                    return false;
                }
                if (JobTitle.length < 2 || /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/.test(JobTitle)) {
                    util.toast("请输入您的职务名称");
                    return false;
                }
                if (!WorkTime) {
                    util.toast("请输入您的工作年限");
                    return false;
                }
                if (!Income) {
                    util.toast("请输入您的税后年收入");
                    return false;
                }
                if (!WorkCity) {
                    util.toast("请输入您的单位所在地");
                    return false;
                }
                if (DetailedAddress.length<4) {
                    util.toast("请输入您的详细地址");
                    return false;
                }
                if(phone.length > 0){
                    // alert(phone);
                    if(isMobile.test(phone) || isPhone.test(phone)){
                        // alert('验证通过');
                        // return false;
                    }else{
                        util.toast('请输入正确的电话号码');
                        return false;
                    }
                }
                /**
                 * submit-btn => authcenter.html
                 * else => personinfo.html
                 */
                
                if ($(this).hasClass('.submit-btn')) {
                    url = 'authcenter.html'
                } else {
                    url = 'personinfo.html'
                }
                self.submit(url, data)
            });
        }
    }
    personInfo.init();
    
})();