import * as _ from 'lodash' ;

export function getQueryString(name:string):string { 
    let searchStr = window.location.search ;
    return __getQueryStringBySearchStr(name,searchStr) ;
}  
//从给定的
function __getQueryStringBySearchStr(name:string,searchStr:string):string { 
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'); 
    var r = searchStr.substr(1).match(reg); 
    if (r != null) {
        return _.unescape(r[2]); 
    }
    return ''; 
}

function getContextPath(){
    var contextPathNode:any = document.getElementById('contextPath') ;
    //console.info('contextPathNode : ' ,contextPathNode) ;
    var contextPath =  (contextPathNode && contextPathNode.value) || '';
    //console.info('contextPath : ' ,contextPath) ;
    return contextPath ;
}

export function dealProjectUrl(url:string){
    var contextPath = getContextPath() ;
    if(url != null && !url.startsWith('/')){
        url = '/' + url ;
    }
    //如果是jsp页面的话，html替换成jsp
    if(contextPath&& contextPath.length > 0){
        url = url.replace('.html','.jsp') ;
    }
    return contextPath + url ;
}

export function joinArr2Str(arr:Array<any>,splitStr?:string){
    if(isObjNull(arr) || arr.length === 0){
        return '' ;
    }
    return arr.join(splitStr ? splitStr : ',') ;
}


export function isObjNull(obj:any){
    if(obj === null || obj === undefined){
        return true ;
    }
    return false; 
}

export default {
   getQueryString ,
   dealProjectUrl,
   joinArr2Str,
   isObjNull
} ;

