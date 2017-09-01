/**
 * 个人信息页
 */
;
(function() {
	var personInfo = {
		year:0,
		init: function() {
			this.getpersonInfo();
			// this.bindEvent();
		},
		//事件绑定
		bindEvent: function() {
			var self = this;
			var $cityBtn = $('#city');
		    //现居城市select
		    $cityBtn.bind('click', function () {
		    	var $this = $(this);
		    	var $showDom = $this.find('.form-show');
		        var oneLevelId = $showDom.attr('data-province-code');
		        var twoLevelId = $showDom.attr('data-city-code');
		        var threeLevelId = $showDom.attr('data-district-code');
		        var iosSelect = new IosSelect(3, [iosProvinces, iosCitys, iosCountys],{
		                title: '地址选择',
		                itemHeight: 35,      
		                relation: [1, 1, 0, 0],
		                oneLevelId: "130000",
		                twoLevelId: "130300",
		                threeLevelId: "130304",
		                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {		
		                    $showDom.attr('data-province-code', selectOneObj.id);
		                    $showDom.attr('data-city-code', selectTwoObj.id);
		                    $showDom.attr('data-district-code', selectThreeObj.id);
		                    $showDom.html(selectOneObj.value + ',' + selectTwoObj.value + ',' + selectThreeObj.value);
		                }
		        });
		    });
		    //居住时长select
		    $('#time').on('click', function () {
		    	var $this = $(this);
		        var timeSelect = new IosSelect(1, [timeData],{
		                container: '.container',
		                title: '',
		                itemHeight: 50,
		                itemShowCount: 3,
		                itemShowCount: 5,
	                	oneLevelId:'3',
		                callback: function (data) {
							$this.find('.form-show').html(data.value);
							self.year = data.id;
		                }
		        });
		    });
		},
		getpersonInfo:function(){
			var self = this;
			var options = {
				url:'/member/personalinfo',
				success: function(res){
					if(res.code == 1){
						var data = res.data;
						var userid = data.id;
						var years = data.live_years;
						// 赋值
						$("#NowCity").html(data.live_province+' '+data.live_city+' '+data.live_distinct);
						$("#DetailedAddress").val(data.live_address);
						years ? year = years : "";
						switch(years){
                            case "1":
                                years = "0-1年";
                                break;
                            case "2":
                                years = "1-2年";
                                break;
                            case "3":
                                years = "3-5年";
                                break;
                            case "4":
                                years = "5-10年";
                                break;
                            case "5":
                                years = "10年以上";
                                break;
                            default:;
                        }
						$("#LiveTime").html(years);
						if(data.ispersonal == 1){
							// 禁止修改数据
							$(".page-button").css("display", "none");
							$(".change").css("display","block");
                            $(".page-form input").each(function() {
                                $(this).prop('disabled', true)
                            });
						}else{
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
					// 返回失败状态
                    // else {
                    //     util.toast("请求失败，请重试");
                    //     return false;
                    // }
				}
			}
			sendRequest("post",options);
		},
		submit: function(url, data) { //提交信息
            var options = {
                url: '/member/editpersonalinfo',
                data: data,
                success: function(res) {
                    if (res.code == 1) {
                        window.location.href = url
                    }
                }
            }
            sendRequest('post', options)
        },
		checkForm:function(userid){
			//现居城市
			var self = this;
			$('.submit-btn,.page-button').on('click',function(){
				var NowCity = $('#NowCity').html();
				var DetailedAddress = $('#DetailedAddress').val();
				var LiveTime = $('#LiveTime').html();
				var data = {
					id: userid,
					province: NowCity,
					address: DetailedAddress,
					years: self.year
				}
				if(!NowCity){
					util.toast("请输入您的现居城市");
					return false;
				}
				if(!DetailedAddress){
					util.toast("请输入您的详细地址");
					return false;
				}
				if(!LiveTime){
					util.toast("请输入您的居住时长");
					return false;
				}
				if ($(this).hasClass('.submit-btn')) {
                    url = 'authcenter.html'
                } else {
                    url = 'interpersonal.html'
                }
                self.submit(url, data)
			})
		}
	}
	//页面初始化
	personInfo.init();
})();