/**
 * 借款主界面
 */
;
(function() {
	var borrowMain = {
		init: function() {
			var self = this;
			self.bindEvent();
			// self.borrowherf();
		},
		//事件绑定
		bindEvent: function() {
			var self = this;
			var $amoutBtn = $('.amout-button');
			var $timeBtn = $('.time-button');
			var $detailBtn = $('.detail-button');
			var data = { // 初始化默认值，把data给后台
					price: self.selectEvent(".amout-select",'price'),
					days: self.selectEvent(".time-select",'days'),
					id:getQueryString("id")
			}
			//点击金额选择按钮
			$amoutBtn.on('click', function() { 
				data.price = $(this).data('price');
				$(this).addClass('active').siblings().removeClass('active');
			});
			//点击时间选择按钮
			$timeBtn.on('click', function() {
				data.days=$(this).data("days");
				$(this).addClass('active').siblings().removeClass('active');
			});
			//产品详情弹窗
			$detailBtn.on('click', function() {
				$('.detail-mask').show(.5);
			});
			$('.mask-close').on('click',function(){
				$('.detail-mask').hide(.5);
			})
			$('.time-button,.amout-button').on('click',function(){
				var Price ={
						url:'/product/topay',
						data:data,
						success: function(res){
							if(typeof res!=='object'){
								res = JSON.parse(res)
							}
							var price = res.data.pay_money;
							if( res.code == 1){
									$(".price").html(price.toFixed(2));
							}
								
						}
				}
				sendRequest('post',Price);
			});
			$(".page-button").on('click',function(){
					self.borrowherf();
			})
			
		},
		selectEvent: function(a,b){
			return $(a).find(".active").data(b);
		},
		borrowherf: function(){
			var self = this;
			var opts = {
					url: '/member/index',
					data:{
						price: self.selectEvent(".amout-select",'price'),
						duration: self.selectEvent(".time-select",'days'),
						id:getQueryString("id")
					},
					success: function(res){
							if( res.code == 1){
									var bankcard = res.data.is_bankcard;
									var idcard = res.data.is_idcard;
									var personal = res.data.is_personal;
									var work = res.data.is_work;
									var relation = res.data.is_relation;
									var credit = res.data.is_credit;
									if(bankcard == 1 && idcard == 1 && personal == 1 && work == 1 && relation == 1 && credit == 1){
											var borrow ={
													url:"/Contract/add",
													data:{
														id:getQueryString("id"),
														duration:$('.time-button').html(),
														price:$(".price").html()
													},
													success: function(res){
															if(res.code == 1){
																	window.location.href = 'passtrue.html';
															}else{
																   util.toast(res.msg)
															}
													}
											};
										sendRequest("post",borrow);
									}else{
											window.location.href = 'authcenter.html';
									}
							}else{
									window.location.href = 'authcenter.html';
							}
					}
			}
			sendRequest('post',opts);
		}
	}
	//页面初始化
	borrowMain.init();
	// 获取地址栏参数
	function getQueryString(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
					return unescape(r[2]);
			}
			return null;
	}

	
	
	
})();