function sendRequest(type,opts){
    $.ajax({
        type: type || 'POST',
        url: 'http://h5.xinyzx.com/h5' + opts.url,
        callback:"callback",
        dataType:"jsonp",
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