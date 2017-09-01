/**
 * 个人中心页
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
			$('.avatar-bg').on('click',function(){
					window.location.href = 'authcenter.html';
			})
			$(".page-button").on('click',function(){
					var opts ={
							url:'/public/logOut',
							success: function(res){
									if(res.code == 1){
											util.toast("退出成功！");
											window.location.href = 'index.html'
									}
							}
					}
					sendRequest("post",opts);
			})
			
		}
	}
	//页面初始化
	Mod.init();
})();