import * as React from 'react' ;
import {Icon} from 'antd' ;
import * as classNames from 'classnames' ;
import Ellipsis from '../Ellipsis' ;
import PropTypes from 'prop-types' ;
import {joinArr2Str,isObjNull} from '../common' ;
import {FlightInfoMap} from './other/common' ;

let tdWidthArr = [70,120,170,80,100,200,60] ;

function getItemWidth(index:number,showOperBtn:boolean = false,unit:boolean = true){
    let w = tdWidthArr[index] ;
    let t = showOperBtn ? w : (w + 10) ;
    let tmp = unit ? (t + 'px') : t ;
    return {width:tmp} ;
}

export function getFlightNoIconByValue(flightNoType:string){
    if(flightNoType === '1'){
        return (<Icon type="check-square-o" 
                    className="mr5 color-success" />) ;
    }else if(flightNoType === '2'){
        return (
            <Icon type="close-square-o" 
                className="mr5 color-orange" />
        ) ;
    }else{
        return null ;
    }
}

interface FlightInfoContainerProps{
    defaultShowOperBtn?:boolean;
    defaultShowAllRecord?:boolean;
    flightList1?:Array<object> ;
    flightList2?:Array<object> ;
    onDelete?:Function ;
    onModify?:Function ;
}

interface FlightInfoContainerStates{
    showOperBtn:boolean;
}


class FlightInfoContainer extends React.PureComponent<FlightInfoContainerProps,FlightInfoContainerStates>{
    static defaultProps = {
        defaultShowOperBtn:false,
        defaultShowAllRecord:false,
        onDelete:()=>{},
        onModify:()=>{}
    };

    static propTypes = {
        defaultShowOperBtn:PropTypes.bool,
        defaultShowAllRecord:PropTypes.bool
    } ; 

    constructor(props:FlightInfoContainerProps){
        super(props) ;
        let {defaultShowOperBtn = true} = props ;
        this.state = {
            showOperBtn:defaultShowOperBtn
        } ;
    }

    renderHeader(){
         let {showOperBtn} = this.state ;
         let headerClassName = classNames('header',{
            'bg-ddd':showOperBtn 
        }) ;
         return (
            <div className={headerClassName}>
                <span className="header-item" style={{width:'90px'}}></span>
                <span className="header-item" style={getItemWidth(0,showOperBtn,true)}>序号</span>
                <span className="header-item" style={getItemWidth(1,showOperBtn,true)}>航班计划适用于</span>
                <span className="header-item" style={getItemWidth(2,showOperBtn,true)}>航班号</span>
                <span className="header-item" style={getItemWidth(3,showOperBtn,true)}>适用航段</span>
                <span className="header-item" style={getItemWidth(4,showOperBtn,true)}>适用星期</span>
                <span className="header-item" style={getItemWidth(5,showOperBtn,true)}>适用时刻</span>
                {showOperBtn ? 
                    <span className="header-item" 
                       style={getItemWidth(6,showOperBtn,true)}>操作</span>
                    : null
                }
            </div>
         ) ;
    }

    render(){
        let {showOperBtn} = this.state ;
        let {defaultShowAllRecord,flightList1,flightList2,onDelete,onModify} = this.props ;
        return(
            <div className="category-flight-info-container">
                {this.renderHeader()}
                <FlightInfo 
                    label="去程航班" 
                    splitLine = {true}
                    name="flightList1"
                    list = {flightList1}
                    onDelete={onDelete}
                    onModify={onModify}
                    defaultShowOperBtn={showOperBtn}
                    defaultShowAllRecord={defaultShowAllRecord}
                />
                <FlightInfo 
                    label="回程航班" 
                    name="flightList2"
                    list = {flightList2}
                    onDelete={onDelete}
                    onModify={onModify}
                    defaultShowOperBtn={showOperBtn}
                    defaultShowAllRecord={defaultShowAllRecord}
                />
            </div>
        ) ;
    }
    
}


function getTimeRangeListStr(timeRangeList:Array<any>){
    if(isObjNull(timeRangeList) || timeRangeList.length === 0){
        return '' ;
    }
    let newArr = timeRangeList.map(function(item:any){
        let {start,end} = item ;
        return start + '-' + end ;
    }) ;
    return joinArr2Str(newArr) ;
}

function getShowInfoObj(item:any){
    let obj = {
        flightPlanApplyType:'',//航班计划适用于 [空:正班/加班,1:正班,2:加班]
        flightNoType:'',//[空:不限,1:仅适用,2:不适用]
        flightNoCodeStart:'',//000
        flightNoCodeEnd:'',//999
        flightApplyRangeType:'',//第一段，二段，三段,
        flightApplyWeek:'',//星期
        timeRangeList:'',//适用时刻
    } ;
    if(item == null){
        return obj ;
    }
    obj.flightPlanApplyType = FlightInfoMap.getTypeShowStr(item,'flightPlanApplyType') ;
    obj.flightNoType =  FlightInfoMap.getTypeShowStr(item,'flightNoType') ;
    obj.flightNoCodeStart = item.flightNoCodeStart ;
    obj.flightNoCodeEnd = item.flightNoCodeEnd ;
    obj.flightApplyRangeType =  FlightInfoMap.getTypeShowStr(item,'flightApplyRangeType') ;
    obj.flightApplyWeek = joinArr2Str(item.flightApplyWeek,',') ;
    obj.timeRangeList = getTimeRangeListStr(item.timeRangeList) ;
    return obj ;
}


interface FlightInfoProps{
    defaultShowAllRecord?:boolean ;
    defaultShowOperBtn?:boolean ;
    label:string;
    name:string;
    showOperBtn?:boolean ;//显示操作列按钮
    list?:Array<Object>;
    splitLine?:boolean ; //显示分割线
    onDelete?:Function;
    onModify?:Function ;
}



class FlightInfo extends React.PureComponent<FlightInfoProps,any>{
    
    static defaultProps = {
       list:[]  
    };

    constructor(props:FlightInfoProps){
        super(props) ;//defaultShowOperBtn
        let {defaultShowAllRecord,defaultShowOperBtn} = this.props ;
        this.state = {
            show5Record:false,
            showAllRecord:defaultShowAllRecord,
            showOperBtn:defaultShowOperBtn
        } ;
    }

    handleChangeShowHideFactory(fieldName:string){
        let otherKeyMap:{[index:string]: string;} = {
            show5Record:'showAllRecord' ,
            showAllRecord:'show5Record'
        } ;
        
        return () => {
            let otherKey = otherKeyMap[fieldName] ;

            let otherValue = this.state[otherKey] ;
            if(otherValue){
                return false ;
            }
            this.setState(function(prevState:any){
                //如果点击的是显示全部
                let curFlag = prevState[fieldName] ;
                let toFlag = !curFlag ;
                return {
                    [fieldName]:toFlag,
                    [otherKey]:false
                } ;
            }.bind(this)) ;
            //这里return true有什么用么？
            return true ;
        };
    }
    

    handleDeleteOprFactory(index:number){
        let {name,onDelete} = this.props ;
        return function(){
            if(onDelete){
                onDelete(name,index) ;
            }
        } ;
    }

    handleModifyOperFactory(index:number){
        let {name,onModify} = this.props ;
        return function(){
            if(onModify){
                onModify(name,index) ;
            }
        } ;
    }
    //显示操作列的td
    renderOperTd(index:number){
        let {showOperBtn} = this.state ;
        if(!showOperBtn){
            return null;
        }
        return (
            <td {...getItemWidth(6,showOperBtn,false)}>
                <Icon type="delete" className="oper-icon mr10"  
                    onClick={this.handleDeleteOprFactory(index)} />
                <Icon type="edit" className="oper-icon"
                    onClick ={this.handleModifyOperFactory(index)}/>
            </td>
        ) ;
    }

    renderApplyTimeList(timeRangeList:string){
        if(timeRangeList && timeRangeList.length > 23){
            return <Ellipsis>{timeRangeList}</Ellipsis> ;
        }
        return timeRangeList ;
    }

    renderTr(item:any,index:number){
        let {showOperBtn} = this.props ;
        let itemShowObj = getShowInfoObj(item) ;
        return (
             <tr height="28px" key ={index}>
                <td {...getItemWidth(0,showOperBtn,false)}>{index + 1}</td>
                <td {...getItemWidth(1,showOperBtn,false)}>{itemShowObj.flightPlanApplyType}</td>
                <td {...getItemWidth(2,showOperBtn,false)}>
                    {getFlightNoIconByValue(item.flightNoType)} 
                    {itemShowObj.flightNoType + ' ' + 
                     itemShowObj.flightNoCodeStart + '-' +  
                     itemShowObj.flightNoCodeEnd
                    } 
                </td>
                <td {...getItemWidth(3,showOperBtn,false)}>{itemShowObj.flightApplyRangeType}</td>
                <td {...getItemWidth(4,showOperBtn,false)}>{itemShowObj.flightApplyWeek}</td>
                <td {...getItemWidth(5,showOperBtn,false)}> 
                    {this.renderApplyTimeList(itemShowObj.timeRangeList)}
                </td>
                {this.renderOperTd(index)}
            </tr>
        ) ;
    }

    filterList(){
        let list = this.props.list ;
        let {show5Record,showAllRecord} = this.state ;
        if(list == null || list.length <= 3){
            return list ;   
        }
        if(show5Record){
           let num = Math.min(list.length,8) ;
           return list.slice(0,num) ; 
        }
        if(showAllRecord){
            return list ;
        }
        return list.slice(0,3) ; 
    }

    renderTbody(){
        let arr:Array<any> = [] ;
        let list = this.filterList() ;
        if(list !=null && list.length > 0){
            arr = list.map((item:any,index:number) => {
                return this.renderTr(item,index) ;
            }) ;
        }
        return <tbody>{arr}</tbody> ;
    }


    renderShowHideBar(list:Array<Object>){
        if(list == null || list.length <= 3){
            return null ;
        }
        let {show5Record,showAllRecord} = this.state ;
        let show5RecordClassName = classNames('content-table-show-hide-item bg-eee',{
            'hand':!showAllRecord ,
            'active':show5Record
        }) ;

        let showAllRecordClassName = classNames('content-table-show-hide-item bg-eee',{
            'hand':!show5Record ,
            'active':showAllRecord
        }) ;
        return (
            <div className="content-table-show-hide" >
                <span className="content-table-show-hide-item">共30条记录</span>
                <span className={show5RecordClassName}
                    onClick={this.handleChangeShowHideFactory('show5Record')}> 
                    {show5Record ? '收起5条' : '展开5条' }  
                </span>
                <span className={showAllRecordClassName}
                    onClick={this.handleChangeShowHideFactory('showAllRecord')}>
                    {showAllRecord ? '收起全部' : ' 展开全部' }  
                </span>
            </div>
        ) ;
    }

    render(){
        let {splitLine,list=[],label} = this.props ;
        let splitLineClassName = classNames('content-split-line',{
            'mt30':list.length === 0
        }) ;
        return (
            <div className="content">
                <div className="content-left">
                    <span className="content-left-title">{label}</span>
                </div>
                <div className="content-right">
                    <table>
                        {this.renderTbody()}
                    </table>
                    {this.renderShowHideBar(list)}
                    {/*这里是分割线*/splitLine ? <div className={splitLineClassName}></div> : null}
                </div>
            </div>
        ) ;
    }
}




export default FlightInfoContainer ;
