/**
 * 待还记录页
 */
;
(function() {
	var Mod = {
		init: function() {
			var self = this;
			self.bindEvent();
		},
		//事件绑定
		bindEvent: function() {
			var self = this;
			$('.tab-list').on('click',function(){
				var index = $(this).index();
				$(this).addClass('active').siblings().removeClass('active');
				$('.page-list').eq(index).show().siblings().hide();
			})
		},
		recode: function(){
				var recode = {
					url:'/pay_plan/unpay',
					success: function(res){
							if(res.code == 1){
									var data = res.data;
									for(var i=0;i<data.length;i++){
											var time = getDate(data[i].interest_date);
											var amount = data[i].pay_money;
											// var statusno = data[i].status;
											var id = data[i].contract_id;
											var html = "<li class=\"list-item\"><p class=\"list-img\"><img src=\"img/progress_icon.png\"></p><div class=\"list-info\"><p class=\"list-time\"><span>" + time + "</span><em>应还</em></p><p class=\"list-amount\">" + amount +"</p></div><p class=\"list-status\"><span class=\"list-icon\"></span></p></li>";
											$(".page-list").append(html);
											// console.log(URL);
											$(".list-item").on('click',function(){
												window.location.href = 'repaydetail.html?status=5' + '&id=' + id;
											})
									}
									
							}
					}
				}
				sendRequest('post',recode)
		},
		play: function(){
				var play = {
					url:'/pay_plan/pay',
					success: function(res){
							if(res.code == 1){
									var data = res.data;
									for(var i=0;i<data.length;i++){
											var time = getDate(data[i].interest_date);
											var amount = data[i].pay_money;
											// var statusno = data[i].status;
											var id = data[i].contract_id;
											var html = "<li class=\"list-item\"><p class=\"list-img\"><img src=\"img/progress_icon.png\"></p><div class=\"list-info\"><p class=\"list-time\"><span>" + time + "</span><em>已还</em></p><p class=\"list-amount\">" + amount +"</p></div><p class=\"list-status\"><span class=\"list-icon\"></span></p></li>";
											$(".page-list").append(html);
											$(".list-item").on('click',function(){
												window.location.href = 'repaydetail.html?status=6' + '&id=' + id;
											})
									}
									
									
							}
					}
				}
				sendRequest('post',play)
		}
	}
	//页面初始化
	Mod.init();
	Mod.recode();
	function getDate(tm){ 
		var tt=new Date(parseInt(tm) * 1000).toLocaleString().replace(/年|月/g, "/").replace(/日/g, " ") 
		return tt; 
	}
	$(".unplay").on('click',function(){
			window.location.reload();
			Mod.recode();
	});
	$(".play").on('click',function(){
			// window.location.reload();
			Mod.play();
	});
	
})();