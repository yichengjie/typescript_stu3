//异步调用
export function dealAjaxRequestWithoutParam(serverURL){
    let config = {type:'GET'} ;
    return __dealBaseAjaxRequest({serverURL,config}) ;
}
export function dealAjaxRequest4SimpleParam(serverURL,simpleJsonData){
    let config = {data:simpleJsonData} ;
    return __dealBaseAjaxRequest({serverURL,config}) ;
}
export function dealAjaxRequest4JSObj(serverURL,jsObjData){
    let config = {contentType:'application/json',data:JSON.stringify(jsObjData)} ;
    return __dealBaseAjaxRequest({serverURL,config}) ;
}
//同步调用
export function dealSYNCHAjaxRequestWithoutParam(serverURL){
    let config = {type:'GET',async : false} ;
    return __dealBaseAjaxRequest({serverURL,config}) ;
}
export function dealSYNCHAjaxRequest4SimpleParam(serverURL,simpleJsonData){
    let config = {data:simpleJsonData} ;
    return __dealBaseAjaxRequest({serverURL,config}) ;
}
export function dealSYNCHAjaxRequest4JSObj(serverURL,jsObjData){
    let config = {contentType:'application/json',data:JSON.stringify(jsObjData)} ;
    return __dealBaseAjaxRequest({serverURL,config}) ;
}
//公用函数
function __dealBaseAjaxRequest({serverURL,config={}}){
    return new Promise(function(resolve,reject){
        let baseOption = {
            url:serverURL,
            type: 'POST',
            dataType:'json',
            timeout : 100000, //超时时间设置，单位毫秒
            error: function (err) {
                reject(err) ;
            },
            success:function (result) {
                resolve(result) ;
            }
        } ;
        let tmpCfg = Object.assign({},baseOption,config) ;
        $.ajax(tmpCfg); //发送ajax请
    }) ;
}

export default  {
    dealAjaxRequestWithoutParam,
    dealAjaxRequest4SimpleParam,
    dealAjaxRequest4JSObj,
    dealSYNCHAjaxRequestWithoutParam,
    dealSYNCHAjaxRequest4SimpleParam,
    dealSYNCHAjaxRequest4JSObj
} ;