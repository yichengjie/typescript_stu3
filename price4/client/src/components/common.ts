import * as _ from 'lodash' ;
import pagesRouterMap from '../../pages-router.json' ;

//category4模块页面地址路由
export function getPagesRouterMap4Category4(){
    return {
       category4Query:pagesRouterMap.category.category4.category4Query,
       category4Edit:pagesRouterMap.category.category4.category4Edit
    } ;
}

export function getPagesRouterMap4Index(){
    return pagesRouterMap.index ;
}


export function getQueryString(name:string):string { 
    const searchStr = window.location.search ;
    return __getQueryStringBySearchStr(name,searchStr) ;
}  
//从给定的
function __getQueryStringBySearchStr(name:string,searchStr:string):string { 
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'); 
    const r = searchStr.substr(1).match(reg); 
    if (r != null) {
        return _.unescape(r[2]); 
    }
    return ''; 
}

function getContextPath(){
    const contextPathNode:any = document.getElementById('contextPath') ;
    //console.info('contextPathNode : ' ,contextPathNode) ;
    const contextPath =  (contextPathNode && contextPathNode.value) || '';
    //console.info('contextPath : ' ,contextPath) ;

    return contextPath ;
}

export function dealProjectUrl(url:string){
    const contextPath = getContextPath() ;
    if(url != null && !url.startsWith('/')){
        url = '/' + url ;
    }
    //如果是jsp页面的话，html替换成jsp
    if(contextPath&& contextPath.length > 0){
        url = url.replace('.html','.jsp') ;
    }
    return contextPath + url ;
}


export function joinArr2Str(arr:any[],splitStr?:string){
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
   isObjNull,
   getPagesRouterMap4Category4,
   getPagesRouterMap4Index
} ;

