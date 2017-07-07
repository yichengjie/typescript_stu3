function getDBJSONData(dbKey){
    return function (){
        var storage = window.localStorage;  
        var dataStr = storage? storage.getItem(dbKey): Cookie.read(dbKey);
        if(dataStr == null){
            return null ;
        }
        return JSON.parse(dataStr) ;
    }
}

function saveDBJSONData(dbKey){
    return function (jsObj){
        var storage = window.localStorage;  
        let dataStr = JSON.stringify(jsObj) ;
        if(storage != null){
            storage.setItem(dbKey,dataStr)
        }else{
            Cookie.write(dbKey,dataStr);
        }
        return true ;
    }
}

export default {
   getDBJSONData,
   saveDBJSONData
} ;