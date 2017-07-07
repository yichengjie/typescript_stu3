let dbConfigKey = "SIHTestToolConfigFormData" ;
let dbMsgKey = "SIHTestToolMsgInputData" ;
import Dao from '../../../common/DB.js' ;

export default {
   getConfigPageFormData:Dao.getDBJSONData(dbConfigKey),
   saveConfigPageFormData:Dao.saveDBJSONData(dbConfigKey),
   getMsgPageInputDataTemplate:Dao.getDBJSONData(dbMsgKey),
   saveMsgPageInputDataTemplate:Dao.saveDBJSONData(dbMsgKey)
} ;