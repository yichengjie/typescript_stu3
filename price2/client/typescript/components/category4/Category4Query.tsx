import * as React from 'react' ;
import {Button,Icon,notification} from 'antd';
import FlightInfoContainer,{getFlightNoIconByValue} from './FlightInfoContainer' ;
import {queryAllCategory4} from './api/CommonApi' ;
import {dealProjectUrl} from '../common' ;
import {FlightInfoMap} from './other/common' ;
import Siderbar from '../Siderbar' ;

interface Category4QueryState { 
   list:any
}

class Category4Query extends React.Component<Object,Category4QueryState> {
    constructor(props:Object){
        super(props) ;
        this.state = {
            list:{}
        }
    }
    async componentDidMount(){
        let {category4Data} = await queryAllCategory4();
        this.setState({
            list:category4Data
        }) ;
    }

    renderList(){
        let list = this.state.list ;
        let keys = Object.keys(list) ;
        let count = keys.length ;
        return keys.map(function(key:string,index:number){
            let item = list[key] ;
            return this.renderListItem(item,key,index,count) ;
        }.bind(this)) ;
    }
    handleDeleteItem = (id:string) => {
        console.info(`删除的id 为 :${id}` ) ;
        let list = {...this.state.list} ;
        delete list[id] ;
        this.setState({list}) ;
        notification.success({message:'删除成功!',description:'描述信息'}) ;
    }
    //点击新建时
    hadleToNewAddUI(){
        let url = 'edit.html' ;
        url = dealProjectUrl(url);
        window.location.href = url ;
    }

    handleToModifyUI(id:string){
        let url = 'edit.html?id='+id ;
        url = dealProjectUrl(url);
        window.location.href = url ;
    }

    renderListItem(item:any,key:any,index:any,count:any){
        return (
            <div className="category-section-row mb20" key={key}>
                <ListItemTitle
                    id={key}
                    index={index}
                    count={count}
                    basicInfo={item.basicInfo}
                    onDelete={this.handleDeleteItem}
                    onModify={this.handleToModifyUI}/>
                <FlightInfoContainer
                    flightList1 ={item.list1}
                    flightList2 ={item.list2}
                />
            </div>
        ) ;
    }

    render(){
        return (
            <div className="category-container">
                <div className="category-section-row">
                    <Button type="primary" onClick={this.hadleToNewAddUI}>
                        新建
                    </Button>
                </div>
                {this.renderList()}
            </div>
        ) ;
    }
}





/**
 * 列表项显示
 * @param {*} props
 * item:{
 *   modelType:'2' , //(1)机型 [空:不限,1:适用,2:不适用]
 *   modelCode:'123',  //(2)机型代码
 *   codeShareFlightType:'2',//(3)代码共享航班类型 [空:可适用,1:不适用,2:仅适用]
 *   codeShareFlightCode:'yicj',//(4)代码共享航班代码
 * }
 */
interface ListItemTitleProps { 
    id: string; 
    basicInfo: any;
    index:number ;
    count:number ;
    onModify:Function ;
    onDelete:Function ;
}

function ListItemTitle (props:ListItemTitleProps){
    let {id,basicInfo,index,count,onModify,onDelete} = props ;
    return (
        <div className="category-flight-info-descr">
            <span className="mlr20">{(index + 1) + '/' + count }</span>
            <span className="mlr20"></span>
            <span className="mlr20">机型:</span>
            <span >{getFlightNoIconByValue(basicInfo.modelType)} </span>
            <span>{FlightInfoMap.getTypeShowStr(basicInfo,'modelType')}</span>
            <span className="mlr20">{basicInfo.modelCode} </span>
            <span className="mlr20"></span>
            <span className="ml20">代码共享航班:</span>
            <span className="ml15">
                {getFlightNoIconByValue(basicInfo.codeShareFlightType)}
            </span>
            <span>{FlightInfoMap.getTypeShowStr(basicInfo,'codeShareFlightType')}</span>
            <span className="ml20">{basicInfo.codeShareFlightCode}</span>
            <span className="oper-section">
                <Icon type="edit hand"
                      onClick={e => onModify(id)} />
                <Icon type="delete"
                      onClick={e => onDelete(id)}
                      className="ml10 hand"/>
            </span>
        </div>
    ) ;
}


function Category4QueryApp (){
    return (
        <Siderbar current='rule-category' openKeys ={['rule']}>
            <Category4Query />
        </Siderbar>
    ) ;
}


export default Category4QueryApp ;

