import commom from './common' ;
//let axios = require('axios') ;
export function doGet(url:string,param?:object){
    url = commom.dealProjectUrl(url);
    let promise = axios.get(url,{params:param}) ;
    return dealPromise(promise,url) ;
}
//简单参数post请求
export function doPost(url:string,param?:object|null){
    url = commom.dealProjectUrl(url);
    let promise = axios.post(url, param) ;
    return dealPromise(promise,url) ;
}

function dealPromise(promise:any,url:string){
    return new Promise(function(resolve:any){
        promise.then(function (response:any) {
            const {data} =  response;
            resolve(data) ;
        })
        .catch(function (error:any) {
            let msg = `${error.message} , ${url}` ; 
            resolve({flag:false,msg}) ;
        }); 
    }) ;
}

