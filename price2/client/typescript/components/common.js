export function getQueryString(name) { 
    let searchStr = window.location.search ;
    return __getQueryStringBySearchStr(name,searchStr) ;
}  
//从给定的
function __getQueryStringBySearchStr(name,searchStr) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = searchStr.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
}

function getContextPath(){
    var contextPathNode = document.getElementById('contextPath') ;
    console.info('contextPathNode : ' ,contextPathNode) ;
    var contextPath =  (contextPathNode && contextPathNode.value) || '';
    console.info('contextPath : ' ,contextPath) ;
    return contextPath ;
}

export function dealProjectUrl(url){
    var contextPath = getContextPath() ;
    if(url != null && !url.startsWith('/')){
        url = "/" + url ;
    }
    //如果是jsp页面的话，html替换成jsp
    if(contextPath&& contextPath.length > 0){
        url = url.replace('.html','.jsp') ;
    }
    return contextPath + url ;
}

export function joinArr2Str(arr,splitStr){
    if(arr == null || arr.length == 0){
        return '' ;
    }
    return arr.join(splitStr ? splitStr : ',') ;
}

export default {
   getQueryString ,
   dealProjectUrl,
   joinArr2Str
} ;

