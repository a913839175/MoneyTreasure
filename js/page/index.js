/**
 * 登录注册页
 */
;
(function() {
	var pageIndex = {
		init: function() {
			var self = this;
			self.bindEvent();
		},
		//事件绑定
		bindEvent: function() {
			var self = this;
			var $loginBtn = $('.login-button');
			//点击登录按钮
			$loginBtn.on('click', function() {
				var Phone = $('#phone').val();
				var msgCode = $('#msgCode').val();
				var loginInfo = {
					phone: Phone,
					msgCode: msgCode
				}
				util.login(loginInfo,function(){
					var indexLogin = {
							url:'/public/login',
							data:{
								phone: Phone,
								phone_code: msgCode
							},
							success: function(res){
								if(res.code == 1){
										window.location.href="main.html";
								}else{
										util.toast(res.msg);
										return false;
								}
							}
					}
					if($("#checked").is(':checked')){
							sendRequest('post',indexLogin);
					}else{
							util.toast("请认真阅读并同意用户协议");
					}
				})
				
			})
			
		}
	}
	//页面初始化
	pageIndex.init();
	//短信60秒发送
	var flag = true;
	var countdown = 60;
	var timer = null;
	function settime(obj) {
			if (countdown == 0) {
					flag = true;
					$(obj).removeClass('active');
					$(obj).html("获取验证码");
					countdown = 60;
					clearTimeout(timer);
					$(".form-code").attr('onclick');
					return;
			} else {
					flag = false;
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
							url:'/public/sendcode',
							data:loginInfo,
							beforeSend:function(){
								flag = true;
							},
							complete: function(){
								flag = false;
							},
							success: function(res){
								if( res.code == 0 ){
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
})();