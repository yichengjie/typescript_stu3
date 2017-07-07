import CommonAPI from './CommonAPI.js' ;
import HttpClientUtil from '../../../common/HttpClientUtil.js';
import {getContextPath} from '../../../common/common.js' ;

function querySIHData(jsData){
    let contextPath = getContextPath() ;
    let url = contextPath +'/jcf/sih.action' ;
    return HttpClientUtil.dealAjaxRequest4JSObj(url,jsData) ;
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