export let FlightInfoMap = {
   modelType:{
     '':'不限',
     '1':'适用',
     '2':'不适用'
   },
   codeShareFlightType:{
     '':'不限' ,
     '':'仅适用' ,
     '':'不适用' 
   },
   flightPlanApplyType:{
     '':'正班/加班',
     '1':'正班',
     '2':'加班'
   },
   flightNoType :{
       '':'不限',
       '1':'仅适用',
       '2':'不适用'
   },
   flightApplyRangeType :{
       '':'不限',
       '1':'第一段',
       '2':'第二段',
       '3':'第三段',
       '4':'第四段',
       '5':'第五段',
       '6':'第六段',
       '7':'第七段',
       '8':'末段'
   },
   /**
    * 从一个对象中字段value对应的text描述
    * @param {*} item 键值对，如:{modelType:'1'}
    * @param {*} name 获取字段的名称,如:modelType
    */
   getTypeShowStr(item,name){
       if(item == null){
          return '' ;
       }
       let realValue = item[name] ;
       if(realValue == null){
           return '' ;
       }
       let showStr = FlightInfoMap[name][realValue] ;
       return showStr ;
    }
} ;

export default {
    FlightInfoMap,
} ;