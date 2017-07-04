import React,{Component,PureComponent} from 'react' ;
import {Icon} from 'antd' ;
import classNames from 'classnames' ;
import Ellipsis from '../Ellipsis.jsx' ;
import PropTypes from 'prop-types' ;
import {joinArr2Str} from '../common.js' ;
import {FlightInfoMap} from './other/common.js' ;

let tdWidthArr = [70,120,170,80,100,200,60] ;

function getItemWidth(index,showOperBtn,unit){
    let w = tdWidthArr[index] ;
    let t = showOperBtn ? w : (w + 10) ;
    t = unit ? (t + 'px') : t ;
    return {width:t} ;
}

export function getFlightNoIconByValue(flightNoType){
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

class FlightInfoContainer extends PureComponent{
    constructor(props){
        super(props) ;
        let {defaultShowOperBtn} = this.props ;
        this.state = {
            showOperBtn:defaultShowOperBtn
        } ;
    }
    static defaultProps = {
        defaultShowOperBtn:false,
        defaultShowAllRecord:false
    };
    static propTypes = {
        defaultShowOperBtn:PropTypes.bool,
        defaultShowAllRecord:PropTypes.bool
    } ; 
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
                <FlightInfo label="去程航班" 
                    splitLine = {true}
                    name='flightList1'
                    list = {flightList1}
                    onDelete={onDelete}
                    onModify={onModify}
                    defaultShowOperBtn={showOperBtn}
                    defaultShowAllRecord={defaultShowAllRecord}
                />
                <FlightInfo label="回程航班" 
                    name='flightList2'
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

function getTimeRangeListStr(timeRangeList){
    if(timeRangeList == null || timeRangeList.length == 0){
        return '' ;
    }
    let newArr = timeRangeList.map(function(item){
        let {start,end} = item ;
        return start + '-' + end ;
    }) 
    return joinArr2Str(newArr) ;
}

function getShowInfoObj(item){
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

class FlightInfo extends PureComponent{

    constructor(props){
        super(props) ;//defaultShowOperBtn
        let {defaultShowAllRecord,defaultShowOperBtn} = this.props ;
        this.state = {
            show5Record:false,
            showAllRecord:defaultShowAllRecord,
            showOperBtn:defaultShowOperBtn
        } ;
    }

    handleChangeShowHideFactory(fieldName){
        let otherKeyMap = {
           show5Record:"showAllRecord" ,
           showAllRecord:"show5Record"
        } ;
        return function(){
            let otherKey = otherKeyMap[fieldName] ;
            let otherValue = this.state[otherKey] ;
            if(otherValue){
                return false ;
            }
            this.setState(function(prevState){
                //如果点击的是显示全部
                let curFlag = prevState[fieldName] ;
                let toFlag = !curFlag ;
                return {
                    [fieldName]:toFlag,
                    [otherKey]:false
                } ;
            }.bind(this)) ;
        }.bind(this) ;
    }
    

    handleDeleteOprFactory(index){
        let {name} = this.props ;
        return function(){
            this.props.onDelete(name,index) ;
        }.bind(this) ;
    }

    handleModifyOperFactory(index){
        let {name} = this.props ;
        return function(){
            this.props.onModify(name,index) ;
        }.bind(this) ;
    }
    //显示操作列的td
    renderOperTd(index){
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

    renderApplyTimeList(timeRangeList){
        if(timeRangeList && timeRangeList.length > 23){
            return <Ellipsis>{timeRangeList}</Ellipsis>
        }
        return timeRangeList ;
    }

    renderTr(item,index){
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
        let arr = [] ;
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
        let arr = [] ;
        let list = this.filterList() ;
        if(list !=null && list.length > 0){
            arr = list.map(function(item,index){
                return this.renderTr(item,index) ;
            }.bind(this)) ;
        }
        return <tbody>{arr}</tbody> ;
    }


    renderShowHideBar(list){
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
        let {splitLine,list=[]} = this.props ;
        let splitLineClassName = classNames('content-split-line',{
            'mt30':list.length == 0
        }) ;
        return (
            <div className="content">
                <div className="content-left">
                    <span className="content-left-title">{this.props.label}</span>
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
