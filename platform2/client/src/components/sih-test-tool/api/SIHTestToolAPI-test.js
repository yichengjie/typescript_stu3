import CommonAPI from './CommonAPI.js' ;
import sihOutputData from '../data/sih-output.json' ;

function querySIHData(jsData){
    let retData = {
        outputData:sihOutputData,
        flag:true,
        reqMsgStr:'reqMsg str test .....'
    } ;
    return new Promise(function(resolve,reject){
         setTimeout(function(){
            resolve(retData) ;
         },2000) ;
    }) ;
}

let getSIHInputDataTemplate = CommonAPI.getSIHInputDataTemplate ;
let saveSIHInputDataTemplate = CommonAPI.saveSIHInputDataTemplate ;
let resetSIHInputDataTemplate = CommonAPI.resetSIHInputDataTemplate ;
let getSIHFormData = CommonAPI.getSIHFormData ;
let getSIHFormDataOrigin = CommonAPI.getSIHFormDataOrigin ;
let saveFormData2DB = CommonAPI.saveFormData2DB ;

export default {
    querySIHData,
    getSIHInputDataTemplate,
    saveSIHInputDataTemplate,
    resetSIHInputDataTemplate,
    getSIHFormData,
    getSIHFormDataOrigin,
    saveFormData2DB
} ;