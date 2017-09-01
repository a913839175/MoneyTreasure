
(function($){

$(document).ready(function() {
  //初始化插件
  $("#signature").jSignature(
    'init',{
      height:6.44+'rem',
      width:100+"%",
      'decor-color':'transparent'
    }
  );
  function reset(){
        var $sigdiv = $("#signature");
        $sigdiv.jSignature("reset");
  }
  $("#reset").on('click',function(){
    reset();
  })
  $("#jSignatureSubmit").on('click',function(){
    var $sigdiv = $("#signature");
    var datapair = $sigdiv.jSignature("getData", "svgbase64") 
    var i = new Image();
    // var imgBase64 = datapair[0]+","+datapair[1];
    var imgBase64 = datapair[1];
    var sign = {
        url:'/Contract/sign',
        data: {
          imgsrc:imgBase64
        },
        success:function(res){
          if(res.code == 1){
              if($(".checked").is(':checked')){
                  window.location.href="passend.html";
              }else{
                  util.toast("请认真阅读并同意用户协议");
              }
              
          }else{
              util.toast(res.msg)
          }
        },
        error:function(res){
          util.toast("操作不成功！");
        }
    }
    sendRequest('post',sign);
  })
  
})
})(jQuery)
