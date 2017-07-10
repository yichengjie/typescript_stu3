
import {doGet,doPost} from '../../AjaxClient' ;
import {notification} from 'antd';


export async function queryAllCategory4(){
    let url = '/api/queryAllCategory4' ;
    //url = commom.dealProjectUrl(url);
    const response:any = await doGet(url) ;
    const {flag,data,msg} =  response;
    if(!flag){
        notification.error({message:msg,description:''}) ;
        return {flag,category4Data:{},msg};
    }else{
        const category4Data = {} ;
        data.forEach(function (item:any) {
            const {list1,list2,id,...basicInfo} = item ;
            const tmpObj = {[id]:{list1,list2,basicInfo}};
            Object.assign(category4Data,tmpObj) ;
        }) ;
        return {flag,category4Data,msg} ;
    }
}

//通过id查询Category4数据
export async function queryCategory4ById(paramId:string){
    let url = '/api/queryCategory4ById?id='+paramId ;
    //url = commom.dealProjectUrl(url);
    const response:any = await doGet(url);
    const {flag,data,msg} =  response ;
    const {list1,list2,id,...basicInfo} = data ;
    const category4Data = {list1,list2,basicInfo,id} ;
    return {category4:category4Data,flag,msg};
}


export async function testDoPost(controllerName:string){
    let url = `/api/${controllerName}` ;
    let param = {id:'001',name:'admin',addr:'henan'} ;
    const response =  await doPost(url,param) ;
    return response ;
}

export default {
    queryAllCategory4,
    queryCategory4ById
} ;