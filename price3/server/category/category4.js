function getAllCategoryStaticData(){
    let timeObj = {start:'11:20',end:'12:20'} ;
    let list2 = [{
        flightType:'2',//(6)航班类型，1:去程航班，2:回程航班
        flightPlanApplyType:'',
        flightNoType:'1',
        flightNoCodeStart:'000',
        flightNoCodeEnd:'999',
        flightApplyRangeType:'2',
        flightApplyWeek:['1','2','3'],
        timeRangeList:[timeObj,timeObj]
    },
        {
            flightType:'2',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'2',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'3',
            flightApplyWeek:['1','2','3','4','5','6','7'],
            timeRangeList:[timeObj,timeObj,timeObj]
        },
        {
            flightType:'2',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'2',
            flightNoType:'',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'4',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        },] ;

    let list1 = [{
        flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
        flightPlanApplyType:'',
        flightNoType:'1',
        flightNoCodeStart:'000',
        flightNoCodeEnd:'999',
        flightApplyRangeType:'2',
        flightApplyWeek:['1','2','3'],
        timeRangeList:[timeObj,timeObj]
    },
        {
            flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'2',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'3',
            flightApplyWeek:['1','2','3','4','5','6','7'],
            timeRangeList:[timeObj,timeObj,timeObj]
        },
        {
            flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'2',
            flightNoType:'',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'4',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        },
        {
            flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'1',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'2',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        },
        {
            flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'1',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'2',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        },
        {
            flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'1',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'2',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        },
        {
            flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'1',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'2',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        },
        {
            flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'1',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'2',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        },
        {
            flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'1',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'2',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        },{
            flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'1',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'2',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        },
        {
            flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'1',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'2',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        },
        {
            flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'1',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'2',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        },
        {
            flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'1',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'2',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        },
        {
            flightType:'2',//(6)航班类型，1:去程航班，2:回程航班
            flightPlanApplyType:'1',
            flightNoType:'1',
            flightNoCodeStart:'000',
            flightNoCodeEnd:'999',
            flightApplyRangeType:'2',
            flightApplyWeek:['1','2','3'],
            timeRangeList:[timeObj]
        }];
    let categoryData =[{
        id:'id1',
        modelType:'1' , //(1)机型 [空:不限,1:适用,2:不适用]
        modelCode:'747/777/M11/340',  //(2)机型代码
        codeShareFlightType:'2',//(3)代码共享航班类型 [空:可适用,1:不适用,2:仅适用]
        codeShareFlightCode:'CA/CZ/MU/HU',//(4)代码共享航班代码,
        list1:list1,
        list2:list2,
    },{
        id:'id2',
        modelType:'' , //(1)机型 [空:不限,1:适用,2:不适用]
        modelCode:'777/M11',  //(2)机型代码
        codeShareFlightType:'1',//(3)代码共享航班类型 [空:可适用,1:不适用,2:仅适用]
        codeShareFlightCode:'CZ/MU',//(4)代码共享航班代码,
        list1:list1,
        list2:list2,
    },{
        id:'id3',
        modelType:'2' , //(1)机型 [空:不限,1:适用,2:不适用]
        modelCode:'777/M11/340',  //(2)机型代码
        codeShareFlightType:'',//(3)代码共享航班类型 [空:可适用,1:不适用,2:仅适用]
        codeShareFlightCode:'MU/HU',//(4)代码共享航班代码,
        list1:list1,
        list2:list2,

    },{
        id:'id4',
        modelType:'2' , //(1)机型 [空:不限,1:适用,2:不适用]
        modelCode:'747/777/M11',  //(2)机型代码
        codeShareFlightType:'2',//(3)代码共享航班类型 [空:可适用,1:不适用,2:仅适用]
        codeShareFlightCode:'CA/CZ',//(4)代码共享航班代码
        list1:list1,
        list2:[],
    }] ;

    return categoryData ;
}

function queryAllCategory4(){
    return getAllCategoryStaticData() ;
}

function queryCategory4ById(id){
    let allCategory4Data = getAllCategoryStaticData() ;
    let category4 = allCategory4Data.find(function (item) {
        if(item.id = id) return true ;
        return false ;
    }) ;
    return category4 ;
}


module.exports = {
    queryAllCategory4,
    queryCategory4ById
};