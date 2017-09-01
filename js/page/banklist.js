/**
 * 银行卡列表
 */
;
(function() {
	var flag = 1;
	var del=1;
	var desc=1;
	
	$('.page-submit').on('click',function(){
		// desc =2;
		// del = 2;
		// if(del == 1){
		// 	$('.gouxuan').addClass('delbank');
		// 	$('.page-button').removeClass('activejie');
		// 	del = 2;
		// 	desc =2;
		// }else if(del == 2){
		// 	$('.gouxuan').addClass('delbank');
		// 	$('.page-button').removeClass('activejie');
		// 	del = 1;
		// 	desc =1;
		// }
			$(".gouxuan").toggleClass("delbank");
			$(".page-button").toggleClass("activejie");
	});
	// 初始化请求
	var banklist = {
			url: '/member/cardlist',
			success: function(res){
					if(res.code == 1){
							var data = res.data;
							// 初始化赋值
							for(var i = 0;i<data.length;i++){
									var bankid = data[i].id;
									var banknum = data[i].bank_card_number;
									var isdefault = data[i].is_default;
									var bankicon = data[i].bank_card_ico;
									var name = data[i].bank_name;
									// 添加dom
									var html = "<li class=\"banklist clearfix\"><img src=\"http://h5.xinyzx.com"+bankicon +"\" class=\"banklistimg1\"/><div class=\"banklistmsz\"><p class=\"banklistms02\">"+name+"</p><p class=\"banklistms03\">账户："+banknum+"</p></div><p class=\"gouxuan\"></p></li>";
									$(".banklistul").append(html);

									// 点击出现删除按钮
									$('.gouxuan').on('click',function(){
										if(del == 1 && desc == 1){
											$('.gouxuan').removeClass('activebank');
											$(this).addClass('activebank');
											$('.page-button').addClass('activejie');
										}else if(del == 2 && desc == 2){
											$('.tcdelz').css('display','block');
										}
									})
									// 删除遮罩层弹出
									$(".banklistul").on("click",".delbank",function(){
										$('.tcdelz').css('display','block');
									})
									// 判断是否为默认银行卡
									if(isdefault == 1){
											$(".gouxuan").addClass("activebank").siblings().removeClass("activebank");
									}
									// 点击进入对应银行卡详情
									$(".banklistmsz").on('click',function(){
											window.location.href = 'bankinfo.html?id='+ bankid;
									})
									// 判断是否有绑定银行卡，1为有银行卡
									if(data[i].issubmit == 1){
										$('.page-submit').css("display","block");
										$('.page-button').css("display","block").addClass('activejie').on('click',function(){//点击立即借款按钮执行操作
											var center = {
												url:'/member/index',
												success:function(res){
														var bankcard = res.data.is_bankcard;
														var idcard = res.data.is_idcard;
														var personal = res.data.is_personal;
														var work = res.data.is_work;
														var relation = res.data.is_relation;
														var credit = res.data.is_credit;
														if( res.code == 1 ){
															  // 判断是否全部认证
																if(bankcard == 1 && idcard == 1 && personal == 1 && work == 1 && relation == 1 && credit == 1){
																		window.location.href = 'passtrue.html';//认证完成跳转页面
																}else{
																		window.location.href = 'authcenter.html';//未认证完成跳转页面
																}
														}
														
												}
											}
											sendRequest('post',center);		
										});
									}else{//没有可选的银行卡/未绑定银行卡则隐藏立即借款按钮
										$('.page-button,.page-submit').css("display","none");
									}

									

									// 删除银行卡
									$(".redwz").on('click',function(){
										var del = {
											url:'/member/delcard',
											data:{
												id:	bankid  
											},
											success: function(res){
												if(res.code == 1){
														$(".banklistul").find("li").eq(i).remove();
														$('.tcdelz').css('display','none');
												}
											}
										}
										sendRequest("post",del);
								})
									
							}
							
					}
			}

	}
	sendRequest("post",banklist);
	

	
})();