//let axios = require('axios') ;
import commom from '../../common.js' ;

//查询category4数据
export async function queryAllCategory4(){
    let url = '/api/queryAllCategory4' ;
    url = commom.dealProjectUrl(url);
    let response = await axios.get(url) ;
    let {flag,data} =  response.data ;

    let category4Data = {} ;
    data.forEach(function (item) {
        let {list1,list2,id,...basicInfo} = item ;
        let tmpObj = {[id]:{list1,list2,basicInfo}};
        Object.assign(category4Data,tmpObj)
    }) ;
    return {flag,category4Data} ;
}

//通过id查询Category4数据
export async function queryCategory4ById(paramId){
    let url = '/api/queryCategory4ById?id='+paramId ;
    url = commom.dealProjectUrl(url);
    let response = await axios.get(url);
    let {flag,data} =  response.data ;

    let {list1,list2,id,...basicInfo} = data ;
    let category4Data = {list1,list2,basicInfo,id} ;
    return {category4:category4Data,flag};
}

export default {
    queryAllCategory4,
    queryCategory4ById
} ;