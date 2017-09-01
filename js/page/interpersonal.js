/**
 * 人际关系页
 */
;
(function() {
	var Mod = {
		relationshipId:0,
		relationshipId2:0,
		init: function() {
			this.getrelationship();
		},
		//事件绑定
		
		bindEvent: function() {
			var self = this;
				//人际关系select
				$('.select').on('click', function () {
		    	var $this = $(this);
		        var timeSelect = new IosSelect(1, [directedData],{
	                container: '.container',
	                title: '',
	                itemHeight: 50,
	                itemShowCount: 3,
	                oneLevelId:'0',
	                callback: function (data) {
											$this.find('.form-show').html(data.value);
											self.relationshipId = data.id;
	                }
		        });
				});
		    $('.select2').on('click', function () {
		    	var $this = $(this);
		        var timeSelect = new IosSelect(1, [interpersonalData],{
	                container: '.container',
	                title: '',
	                itemHeight: 50,
	                itemShowCount: 3,
	                oneLevelId:'0',                
	                callback: function (data) {
											$this.find('.form-show').html(data.value);
											self.relationshipId2 = data.id;
	                }
		        });
				});		
		},
		checkForm: function(opts){
			var self = this;
			$('.submit-btn,.page-button').on('click',function(){
				// alert(self.relationshipId+'-'+self.relationshipId2);return false;
				var url = '';
				var RelationOne = $('#RelationOne').html();
				var NameOne = $('#NameOne').val();
				var PhoneOne = $('#PhoneOne').val();
				var RelationTwo = $('#RelationTwo').html();
				var NameTwo = $('#NameTwo').val();
				var PhoneTwo = $('#PhoneTwo').val();
				var data ={
						'data':[{
								id: opts.userid,
								name: NameOne,
								relationship: self.relationshipId,
								phone: PhoneOne,
								is_urgent: "1",
								issubmit:"1"
						},{
								id:opts.userid1,
								name: NameTwo,
								relationship: self.relationshipId2,
								phone: PhoneTwo,
								is_urgent: "1",
								issubmit:"1"
						}]
				}
				if(!RelationOne){
					util.toast("请输入与您第一位亲属的关系");
					return false;
				}
				if(!NameOne){
					util.toast("请输入您第一位亲属的姓名");
					return false;
				}
				// if(NameOne.length <2 ){
				// 	util.toast("请输入您第一位亲属的姓名");
				// 	return false;
				// }
				// else if(/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/.test(NameOne)){
				// 	util.toast("姓名至少2个字符,最多4个中文字符");
				// 	return false;
				// }
				if(!PhoneOne){
					util.toast("请输入您第一位亲属的电话号码");
					return false;
				}
				if(!(/^1(3|4|5|7|8)\d{9}$/.test(PhoneOne))){
							util.toast("您输入第一位亲属的电话号码格式错误");
					return false;	 
					}
				if(!RelationTwo){
					util.toast("请输入与您第二位亲属的关系");
					return false;
				}
				if(!NameTwo){
					util.toast("请输入您第二位亲属的姓名");
					return false;
				}
				// if(NameOne.length <2 ){
				// 	util.toast("请输入您第二位亲属的姓名");
				// 	return false;
				// }else if(/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/.test(NameTwo)){
				// 	util.toast("姓名至少2个字符,最多4个中文字符");
				// 	return false;
				// }
				if(!PhoneTwo){
					util.toast("请输入您第二位亲属的电话号码");
					return false;
				}
				if(!(/^1(3|4|5|7|8)\d{9}$/.test(PhoneTwo))){
					util.toast("您输入第二位亲属的电话号码格式错误");
					return false;	 
				}
				if ($(this).hasClass('.submit-btn')) {
						url = 'authcenter.html'
				} else {
						url = 'authcredit.html'
				}
				self.submit(url, data)
			})
		},
		getrelationship:function(){
			var self = this;
			var options = {
				url: "/member/relationship",
				success: function(res){
						if(res.code == 1){
							
								var userOptions = {
										userid:res.data[0].id,
										userid1:res.data[1].id
								}
								var RelationOne = res.data[0].relationship;
								var RelationTwo = res.data[1].relationship;
								switch (RelationOne){
										case "195":
											RelationOne = "配偶";
											break;
										case "124":
											RelationOne = "父母";
											break;
										case "125":
											RelationOne = "兄弟";
											break;
										case "138":
											RelationOne = "姐妹";
											break;
										case "158":
											RelationOne = "同事";
											break;
										case "127":
											RelationOne = "朋友";
											break;
								}
								switch (RelationTwo){
										case "195":
											RelationTwo = "配偶";
											break;
										case "124":
											RelationTwo = "父母";
											break;
										case "125":
											RelationTwo = "兄弟";
											break;
										case "138":
											RelationTwo = "姐妹";
											break;
										case "158":
											RelationTwo = "同事";
											break;
										case "127":
											RelationTwo = "朋友";
											break;
								}
								$('#RelationOne').html(RelationOne);
								$('#NameOne').val(res.data[0].name);
								$('#PhoneOne').val(res.data[0].phone);
								$('#RelationTwo').html(RelationTwo);
								$('#NameTwo').val(res.data[1].name);
								$('#PhoneTwo').val(res.data[1].phone);
								(RelationOne) ? self.relationshipId = RelationOne : '';
								(RelationOne) ? self.relationshipId2 = RelationOne : '';
								// 如果返回会员数据
								if (res.data[0].issubmit == 1) {
										// 禁止修改数据
										$(".page-button").css("display", "none");
										$(".change").css("display","block");
										$(".page-form input").each(function() {
												$(this).prop('disabled', true)
										});
								}
								//如未保存过数据，择可编辑，提交
								else {
										self.checkForm(userOptions)
										self.bindEvent();
								}
								$(".change").on('click',function(){
										self.checkForm(userOptions);
										self.bindEvent();
										$(".page-form input").each(function() {
												$(this).prop('disabled', false)
										});
										// console.log(JSON.stringify(res.data));
										// return false;
								})
						}
				}		
			}
			sendRequest("post",options);
		},
		submit:function(url,data){
			
			var options = {
				url: "/member/saverelationship",
				data: data,
				success: function(res){
					if(res.code == 1){
						window.location.href = url
					}else{
						util.toast(res.msg);
					}
				}
			}
			sendRequest('post', options);
			
		}
		
	}
	//页面初始化
	Mod.init();
	
})();