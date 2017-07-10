import sihInputData from '../data/sih-input.json' ;
import sihFormData from '../data/sih-formdata.json' ;
import SIHTestToolDao from './SIHTestToolDao.js' ;

function getSIHInputDataTemplate(){
    let inputData = getSIHInputDataOrigin() ;
    //这里暂时不从本地数据库中读取
    // let dbInputDataTemplate = SIHTestToolDao.getMsgPageInputDataTemplate()
    // if(dbInputDataTemplate != null){
    //     inputData = dbInputDataTemplate ;
    // }
    let retData = {
        inputData,
        flag:true
    } ;
    return new Promise(function(resolve,reject){
        resolve(retData) ;
    }) ;
}


function getSIHInputDataOrigin(){
    return {...sihInputData} ;
}

//获取formData原始数据
function getSIHFormDataOrigin(){
    //console.info('usasSys 11 : ' + sihFormData['usasSys']) ;
    return {...sihFormData} ;
}

//获取SIHFormData数据
function getSIHFormData(){
    let dbFormData = SIHTestToolDao.getConfigPageFormData() ;
    let formData =  getSIHFormDataOrigin() ;
    if(dbFormData != null){
        let keys = Object.keys(getSIHFormDataOrigin()) ;
        for(let key of keys){
            formData[key] = dbFormData[key] ||'' ;
        }
    }else{
        saveFormData2DB(formData) ;
    }
    return formData ;
}

function saveSIHInputDataTemplate(inputDataStr){
    let jsonObj = JSON.parse(inputDataStr) ;
    SIHTestToolDao.saveMsgPageInputDataTemplate(jsonObj) ;
}

function resetSIHInputDataTemplate(){
    SIHTestToolDao.saveMsgPageInputDataTemplate(sihInputData) ;
    return JSON.stringify(sihInputData,null,2)  ;
}

function saveFormData2DB(formData){
    SIHTestToolDao.saveConfigPageFormData(formData) ;
}

export default {
    getSIHInputDataTemplate,
    saveSIHInputDataTemplate,
    resetSIHInputDataTemplate,
    getSIHFormData,
    getSIHFormDataOrigin,
    saveFormData2DB
} ;