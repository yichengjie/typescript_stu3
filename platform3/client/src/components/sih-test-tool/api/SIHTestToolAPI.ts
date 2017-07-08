import CommonAPI from './CommonAPI' ;
import HttpClientUtil from '../../../common/HttpClientUtil';
import {getContextPath} from '../../../common/common' ;

function querySIHData(jsData:object){
    let contextPath = getContextPath() ;
    let url = contextPath +'/api/jcf/sih.action' ;
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