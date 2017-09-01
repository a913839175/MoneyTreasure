/**
 * util 工具类
 */
;
(function(win,doc,util){
	
	/**
	 * 用户登录
	 **/
	util.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.phone = loginInfo.phone || '';
		loginInfo.msgCode = loginInfo.msgCode || '';
		if(!loginInfo.phone){
			util.toast("请输入手机号");
			return false;
		}
		if(!util.checkPhone(loginInfo.phone)){
			util.toast("不是正确的手机号！");
			return false;
		}
		if(!loginInfo.msgCode) {
			util.toast("请输入短信验证码");
			return false;
		}
		if(typeof callback==='function'){
			callback();
		}
	};
	// 验证码
	util.Code = function(loginInfo, callback) {
		callback = callback || $.noop; 
		loginInfo = loginInfo || {};
		loginInfo.phone = loginInfo.phone || '';
		if(!loginInfo.phone){
			util.toast("请输入手机号");
			return false;
		}
		if(!util.checkPhone(loginInfo.phone)){
			util.toast("不是正确的手机号！");
			return false;
		}
		if(typeof callback==='function'){
			callback();
		}
	};
	/**
	 * 手机号码验证
	 * @param {String} phone
	 */
	util.checkPhone = function(phone) {
		if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
					return false; 
			}else{
				return true; 
			}
	}
	/**
	 * 身份证验证
	 * @param {String} card
	 */
	util.isCardNo = function(card){  
   		// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
   		var reg = /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i;   
       	return  reg.test(card);  
   	};
	/**
	 * 银行卡验证
	 * @param {String} bankno
	 */
	 util.luhmCheck = function (bankno){
				var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）
		
				var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
				var newArr=new Array();
				for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
						newArr.push(first15Num.substr(i,1));
				}
				var arrJiShu=new Array();  //奇数位*2的积 <9
				var arrJiShu2=new Array(); //奇数位*2的积 >9
				
				var arrOuShu=new Array();  //偶数位数组
				for(var j=0;j<newArr.length;j++){
						if((j+1)%2==1){//奇数位
								if(parseInt(newArr[j])*2<9)
								arrJiShu.push(parseInt(newArr[j])*2);
								else
								arrJiShu2.push(parseInt(newArr[j])*2);
						}
						else //偶数位
						arrOuShu.push(newArr[j]);
				}
				
				var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
				var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
				for(var h=0;h<arrJiShu2.length;h++){
						jishu_child1.push(parseInt(arrJiShu2[h])%10);
						jishu_child2.push(parseInt(arrJiShu2[h])/10);
				}        
				
				var sumJiShu=0; //奇数位*2 < 9 的数组之和
				var sumOuShu=0; //偶数位数组之和
				var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
				var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
				var sumTotal=0;
				for(var m=0;m<arrJiShu.length;m++){
						sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
				}
				
				for(var n=0;n<arrOuShu.length;n++){
						sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
				}
				
				for(var p=0;p<jishu_child1.length;p++){
						sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
						sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
				}      
				//计算总和
				sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
				
				//计算Luhm值
				var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
				var luhm= 10-k;
				
				if(lastNum==luhm){
				//$("#banknoInfo").html("Luhm验证通过");
				return true;
				}
				else{
						util.toast("请输入正确的银行卡号");
						return false;
				}        
		}
	 /**
	 * 
	 * 
	 * 手机端toast提示
	 * @param {String} msg
	 * @param {String} time
	 */
		util.toast = function(msg,time){
			var time = time || 3000;
			if($('.util-toast').length >= 1){
				return false;
			}
			$('body').append('<div class="util-toast">' + msg + '</div>');
					setTimeout(function() {$('.util-toast').remove();}, time);
		}
		/**
     * 获取url参数
     * @param  {String} name 参数值
     * @return {Boolean}      [description]
     */
    util.getUrlparam = function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
		};
		/**
     * ajax封装
     * @param {Object} type
     * @param {Object} opts
     */
    util.sendRequest = function(type,opts) {
			return 
				$.ajax({
					type: type || 'POST',
					url: opts.url,
					timeout: 20000,
					data: opts.data || {},
					beforeSend: opts.beforeSend || function(){
							//opts.beforeSend===undefined 默认操作
					},
					complete: opts.complete || function(){
							//opts.complete===undefined 默认操作
					},
					success: opts.success || function(){
							//opts.success===undefined 默认操作
					},
					error: opts.error || function(error){
							if(error.status == 404) {
									util.toast("请求未找到！")
							}else if(error.status == 503){
									util.toast("服务器内部错误！")
							}else{
									util.toast("网络连接超时！")
							}
					}
				}) 
		}
		//时间格式化
	// 	new Date().format('yyyy-MM-dd hh:mm:ss');
	// 	Date.prototype.format = function (format) {
	// 		var o = {
	// 				"M+": this.getMonth() + 1, //month
	// 				"d+": this.getDate(), //day
	// 				"h+": this.getHours(), //hour
	// 				"m+": this.getMinutes(), //minute
	// 				"s+": this.getSeconds(), //second
	// 				"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
	// 				"S": this.getMilliseconds() //millisecond
	// 		};
	// 		if (/(y+)/.test(format)) {
	// 				format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	// 		}
	// 		for (var k in o) {
	// 				if (new RegExp("(" + k + ")").test(format)) {
	// 						format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	// 				}
	// 		}
	// 		return format;
	// };
})(window, window.document, window.util || (window.util = {}));
