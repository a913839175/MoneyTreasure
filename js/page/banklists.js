var breakList = function(){
  this.activeindex = 0; // 当前要删除操作项位置
  this.dialog = $(".tcdelz"); // 弹窗盒子
  this.breakObj = $(".banklistul"); // 银行卡列表盒子
  this.setBtn = $(".page-submit"); // 管理按钮
}

breakList.prototype = {
  // 初始化
  init: function(){
    var self = this;
    

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
                var html = "<li class=\"banklist clearfix\" data-id=\""+ bankid +"\" data-sign=\""+ isdefault +"\"><img src=\"http://h5.xinyzx.com"+bankicon +"\" class=\"banklistimg1\"/><div class=\"banklistmsz\"><p class=\"banklistms02\">"+name+"</p><p class=\"banklistms03\">账户："+banknum+"</p></div><p class=\"gouxuan\"></p></li>";
                $(".banklistul").append(html);

                
                // 判断是否为默认银行卡
                // if(isdefault == "1"){
                //   $(".banklistul").find("li[data-id="+bankid+"]").addClass("activebank");
                // }
                // 点击进入对应银行卡详情
                // var index = $(this).index();
                // console.log(bankid);
                // return false;
                
                
                // 判断是否有绑定银行卡，1为有银行卡
                if(data[i].issubmit == 1){
                  $('.page-submit').css("display","block");
                  $('.page-button').addClass('activejie').on('click',function(){//点击立即借款按钮执行操作
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
                }
            }

            $(".banklistul").find("li[data-sign='1']").addClass("activebank");

            $(".banklistmsz").on('click',function(){
              var bankid = $(this).parent().data("id");
              window.location.href = 'bankinfo.html?id=' + bankid;
            })

            self.setStatus();
            self.checked();
            self.dialog.find(".hswz").click( function() {
              self.isShowDialog(false);
            });
            self.dialog.find(".redwz").click( function() {
              self.del(bankid,self.activeindex);
              self.isShowDialog(false);
            });

        }
    }

}
sendRequest("post",banklist);


    
  },

  // 管理
  setStatus: function(){
    this.setBtn.click( () => {
      this.breakObj.find(".banklist").toggleClass("delbank");
      this.delBtn();
    })
  },

  // 删除操作按钮
  delBtn: function(){
    var self = this;
    self.breakObj.on("click",".banklist",function(){
      self.activeindex = $(this).parent("li").index();
      self.isShowDialog(true);
    })
  },

  // 选中
  checked: function(){
    // var self = this;
    // $(".banklistul").on("click",".banklist",function(){
    //   var id = $(this).data("id");
    //   $(this).toggleClass("activebank").siblings().removeClass("activebank");
    //   if(!$(this).hasClass("activebank")){
    //     var opts = {
    //       url: '/member/default_card',
    //       data: {
    //         id:id
    //       },
    //       success: function(res){
    //         if(res.code == 1){
    //           // 
    //         }else{
    //           util.toast(res.msg)
    //         }
    //       }
    //     }
    //     sendRequest('post',opts)
    //   }
      
    // })

    $(".banklistul").on("click","li",function(){
      var self = $(this);
      var id = self.data("id");
      // self.addClass("activebank").siblings().removeClass("activebank");
      if(!self.hasClass("activebank")){
        var opts = {
          url:'/member/default_card',
          data:{
            id:id
          },
          success: function(res){
            if(res.code==1){
              self.addClass("activebank").siblings().removeClass("activebank");
            }
          }
        }
      }
    })
    
  },

  // 详情跳转
  // second: function(){

  // },

  // 删除
  del: function(bankid,index){
    var self = this;
    var del = {
      url:'/member/delcard',
      data:{
        id:	bankid  
      },
      success: function(res){
        if(res.code == 1){
            $(".banklistul").find("li[data-id="+bankid+"]").remove();
        }
      }
    }
    sendRequest("post",del);
  },
  // 显示隐藏弹窗
  isShowDialog: function(show,callback){
    if(show) {
      this.dialog.show();
    }else{
      this.dialog.hide();
    }
  }

}

$(function(){
  new breakList().init()
})