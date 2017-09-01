/**
 * 认证中心页
 */
;
(function() {
	var Mod = {
		init: function() {
			var self = this;
			self.bindEvent();
			// 数据请求
			var tips = function(id,listId){
					if(id == 1 ){
							$(listId).addClass("auth_active").html("已填写");
					}else{
							$(listId).removeClass("auth_active").html("未填写");
					}
			}
			var center = {
					url:'/member/index',
					// data:{
					// 	id:id,
					// 	duration:duration,
					// 	price:price
					// },
					success: function(res){
							if( res.code == 1 ){
									var bankcard = res.data.is_bankcard;
									var idcard = res.data.is_idcard;
									var personal = res.data.is_personal;
									var work = res.data.is_work;
									var relation = res.data.is_relation;
									var credit = res.data.is_credit;
									var id = res.data.id;
									var duration = res.data.duration;
									var price = res.data.price;
									tips(bankcard,"#bankinfo");
									tips(idcard,"#identity");
									tips(work,"#workinfo");
									tips(relation,"#interpersonal");
									tips(personal,"#personal");
									tips(credit,"#credit");
									if(bankcard == 1 ){
											$("#bankhref").on('click',function(){
													window.location.href = "banklist.html"
											});
									}else{
											$("#bankhref").on('click',function(){
													window.location.href = "bankinfo.html"
											});
									}
									if(bankcard == 1 && idcard == 1 && personal == 1 && work == 1 && relation == 1 && credit == 1){
											$(".auth_button01").addClass("active");
											$(".auth_button01").on("click",function(){
												sendRequest('post',submit);
											});
									}

									var submit ={
											url:'/Contract/add',
											data:{
													id:id,
													duration:duration,
													price:price
											},
											success: function(res){
													if(bankcard == 1 && idcard == 1 && personal == 1 && work == 1 && relation == 1 && credit == 1){
															window.location.href = 'passtrue.html';
													}
											}
									}
							}
					}
			}	
			sendRequest('post',center);
		},
		//判断是否填写
		hasWrite(obj){
			var self = this;
			return !$(obj).hasClass("auth_active");	
		},
		//事件绑定
		bindEvent: function() {
			var self = this;
			$("#button").on('click',function(){
				if(self.hasWrite("#identity")){
					util.toast("身份认证没有填写")
				}
				else if(self.hasWrite("#workinfo")){
					util.toast("工作信息没有填写");
				}
				else if(self.hasWrite("#personal")){
					util.toast("个人信息没有填写");
				}
				else if(self.hasWrite("#interpersonal")){
					util.toast("人际关系没有填写");
				}
				// else if(self.hasWrite("#credit")){
				// 	util.toast("信用认证没有填写");
				// }
				else if(self.hasWrite("#bankinfo")){
					util.toast("银行卡信息没有填写");
				}else{
					
				}
			})
			
		}
	}
	//页面初始化
	Mod.init();
	
})();