let sihOutputData = require('./sih-output.json') ;

function querySIHData(jsData){
    let retData = {
        outputData:sihOutputData,
        flag:true,
        reqMsgStr:'reqMsg str test .....'
    } ;
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(retData) ;
        },200) ;
    }) ;
}

module.exports = {
    querySIHData
} ;


