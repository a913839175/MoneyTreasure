var signcontact = {
    url:'/contract/contract_info',
    data:{
      contractid:getQueryString("contractid")
    },
    success: function(res){
        var json1 = JSON.parse(res);
        if(json1.code == 1){
            $(".customer_number").html(json1.data.customer_number);
            $(".contract_number").html(json1.data.contract_number);
            $(".name").html(json1.data.name);
            $(".idcard").html(json1.data.idcard);
            $(".mobile").html(json1.data.mobile);
            $(".live_address").html(json1.data.live_address);
            $(".company_address").html(json1.data.company_address);
            $(".contract_price_lower").html(json1.data.contract_price_lower);
            $(".contract_price_upper").html(json1.data.contract_price_upper);
            $(".start_date").html(json1.data.start_date);
            $(".end_date").html(json1.data.end_date);
            $(".application_days").html(json1.data.application_days);
            $(".interest_rate").html(json1.data.interest_rate);
            $(".card_owner_name").html(json1.data.card_owner_name);
            $(".card_number").html(json1.data.card_number);
            $(".card_bank_name").html(json1.data.card_bank_name);
        }
    }
}
sendRequest('post',signcontact);
// 获取地址栏参数
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
      return unescape(r[2]);
  }
  return null;
}