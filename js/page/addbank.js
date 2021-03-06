/**
 * 银行卡信息页
 */
;
(function() {
	var Mod = {
		init: function() {
			this.getbankInfo();
			this.sendcode();
			// self.formVerify();
			// self.bindEvent();
		},
		isEmpty:function(obj){
			var self = this;
			return $(obj).val() ? false : true;
		},
		//表单验证
		formVerify:function(){
			var self = this;
			$('#nextbtn').on('click',function(){
				var cardNo = $("#card").val();
				var phone = $("#phone").val();
				var code = $('#code').val();
				var name = $("#name").val();
				var bankno = $("#bankno").val();
				var belongs = $("#belongs").html();
				var address = $("#address").html();
				var data ={
					code:code,         
					name:name,         
					idcard:cardNo,      
					card_number:bankno,  
					bank_name:belongs,   
					bank_province:address,  
					phone:phone   
				};
				if(self.isEmpty("#name")){
					util.toast("请输入开户者名字");
				}
				else if(self.isEmpty("#card")){
					util.toast("请输入身份证号");
				}else if(!util.isCardNo(cardNo)){
					util.toast("身份证号非法");
				}else if(self.isEmpty("#bankno")){
					util.toast("请输入银行卡号");
				}
				// else if(!util.luhmCheck("#bankno")){
				// 	util.toast("输入正确的银行卡号");
				// }
				else if(!$('#belongs').html()){
					util.toast("所属银行没有选择");
				}else if(!$("#address").html()){
					util.toast("银行卡开户地没有选择");
				}else if(self.isEmpty("#phone")){
					util.toast("请输入手机号码")
				}else if(!util.checkPhone(phone)){
					util.toast("不是正确的手机号");
				}else if(self.isEmpty("#code")){
					util.toast("请输入短信验证码");
				}
				self.submit("banklist.html", data);
			});
		},
		//事件绑定
		bindEvent: function() {
			var self = this;
		    //银行卡信息select
		    $('.select').on('click', function () {
		    	var $this = $(this);
		        var timeSelect = new IosSelect(1, [bankData],{
	                container: '.container',
	                title: '',
	                itemHeight: 50,
	                itemShowCount: 5,
	                oneLevelId:'3',
	                callback: function (data) {
	                    $this.find('.form-show').html(data.value);
	                }
		        });
		    });
		    var $showDom = $('.select1');
		    $showDom.on('click', function () {
		    	var $this = $(this);
		        var oneLevelId = $showDom.attr('data-province-code');
		        var twoLevelId = $showDom.attr('data-city-code');
		        var threeLevelId = $showDom.attr('data-district-code');
		        var iosSelect = new IosSelect(3, [iosProvinces, iosCitys, iosCountys],{
		                title: '',
		                itemHeight: 40,
		                relation: [1, 1, 0, 0],
		                oneLevelId: "130000",
		                twoLevelId: "130300",
		                threeLevelId: "130304",
		                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {		
		                    $showDom.attr('data-province-code', selectOneObj.id);
		                    $showDom.attr('data-city-code', selectTwoObj.id);
		                    $showDom.attr('data-district-code', selectThreeObj.id);
		                    $this.find('.form-show').html(selectOneObj.value + ',' + selectTwoObj.value + ',' + selectThreeObj.value);
		                }
		        });
		    });
		},
		getbankInfo:function(){
			var self = this;
			self.formVerify()
			self.bindEvent();
			$(".change").on('click',function(){
					self.formVerify();
					self.bindEvent();
					$(".page-form input").each(function() {
							$(this).prop('disabled', false)
					});
			})
		},
		submit: function(url,data){
			// 添加银行卡
			var add = {
				url:'/member/addcard',
				data:data,
				success: function(res){
					if(res.code == 1){
						window.location.href = url
					}
				}
			}
			sendRequest('post',add);
			
		},
		sendcode:function(){
			//短信60秒发送
			var flag = true;
			var countdown = 60;
			var timer = null;
			function settime(obj) {
					if (countdown == 0) {
							//flag = true;
							$(obj).removeClass('active');
							$(obj).html("获取验证码");
							countdown = 60;
							clearTimeout(timer);
							$(".form-code").attr('onclick');
							return;
					} else {
							//flag = false;
							$(obj).addClass('active');
							$(obj).html("" + countdown + "秒后发送");
							countdown--;
							$(".form-code").removeAttr('onclick'); 
					}
					timer = setTimeout(function () {
							settime(obj)
					}, 1000)
			}
			$('.form-code').on('click',function () {
				var self = $(this);
				var Phone = $('#phone').val();
				var msgCode = $('#msgCode').val();
				var loginInfo = {
					phone: Phone
				}
				util.Code(loginInfo,function(){
					if(!flag){
						return false;
					}else{
						//向后台发送处理数据  
						var sendcode = {
								url:'/member/cardcode',
								data:loginInfo,
								beforeSend:function(){
									flag = true;
								},
								complete: function(){
									flag = false;
								},
								success: function(res){
									if( parseInt(res.code) == 0 ){
										util.toast("手机号码不能为空！");
										return false;
									}else{
										settime(self);
									}
								}
						}
						sendRequest('post',sendcode)
					}
				})
			});
		}
	}
	//页面初始化
	Mod.init();
	
})();