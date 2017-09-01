(function(){
  var progress = {
      list: function(){
          var list = {
              url: '/Contract/index',
              success: function(res){
                  if(res.code == 1){
                      var data = res.data; 
                      for(var i = 0;i<data.length;i++){
                          var price =  data[i].apply_price;
                          var time = getDate(data[i].apply_time);
                          var statusno = data[i].status;
                          var contractid = data[i].id;
                          var URL;
                            switch(statusno){
                                case "1":
                                  statusno = "审核中";
                                  URL = 'passtrue.html?status=' + data[i].status + '&contractid=' + contractid;
                                  break;
                                case "2": //待签约
                                  statusno = "待签约";
                                  URL = 'signinfo.html?status=' + data[i].status + '&contractid=' + contractid;
                                  break;
                                case "5": //使用中
                                  statusno = "使用中";
                                  URL = 'repaydetail2.html?status=' + data[i].status + '&contractid=' + contractid;
                                  break;
                                case "6":
                                  statusno = "已还款";
                                  URL = 'paiddebt.html?status=' + data[i].status + '&contractid=' + contractid;
                                  break;
                                case "4": //取消审核
                                  statusno = "未通过";
                                  URL = 'passno.html?status=' + data[i].status + '&contractid=' + contractid;
                                  break;
                                case "20":
                                  statusno = "放款中";
                                  URL = 'passtrue.html?status=' + data[i].status + '&contractid=' + contractid;
                                  break;
                                case "21": //逾期
                                  statusno = "逾期";
                                  URL = 'delinquency.html?status=' + data[i].status + '&contractid=' + contractid;
                                  break;
                                case "3": //逾期
                                  statusno = "未通过审核";
                                  URL = 'passno.html';
                                  break;
                                case "7": //提前结清
                                  statusno = "提前结清";
                                  URL = 'paiddebt.html?status=' + data[i].status + '&contractid=' + contractid;
                                  break;
                                default:;
                            }
                          // })
                          var html = "<li class='list-item'><p class='list-img'><img src='img/progress_icon.png'></p><div class='list-info'><p class='list-amount'>"+ price +"</p><p class='list-time'><span>"+ time + "</span></p></div><p class='list-status'><i>"+ statusno +"</i><span class='list-icon'></span></p></li>";
                          $(".page-list").append(html);
                          $(".list-item").on('click',function(){
                            window.location.href = URL;
                          });
                          
                            
                        //   console.log(html);
                      }
                  }else{
                      // util.toast("请求错误");
                  }
                  
              }
            }
          sendRequest("post",list);
          function getDate(tm){ 
            var tt=new Date(parseInt(tm) * 1000).toLocaleString().replace(/年|月/g, "/").replace(/日/g, " ") 
            return tt; 
          }
          
      }
  }
  progress.list()
})()