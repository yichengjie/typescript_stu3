import {Button,Icon,notification} from 'antd';
import {queryAllCategory4,testDoPost2,testDoGet1} from './api/CommonApi' ;
import * as React from 'react' ;
import FlightInfoContainer,{getFlightNoIconByValue} from './FlightInfoContainer' ;
import {dealProjectUrl} from '../common' ;
import {FlightInfoMap} from './other/common' ;
import Siderbar from '../Siderbar' ;

interface Category4QueryState { 
   list:{[index:string]:any};
}

interface ListItemProps{
    list1:object[] ;
    list2:object[] ;
    basicInfo:object ;
}

class Category4Query extends React.Component<any,Category4QueryState> {
    constructor(props:any){
        super(props) ;
        this.state = {
            list:{}
        };
    }
    async componentDidMount(){
        const {category4Data} = await queryAllCategory4();
        this.setState({
            list:category4Data
        }) ;
    }

    renderList(){
        const list = this.state.list ;
        const keys = Object.keys(list) ;
        const count = keys.length ;
        return keys.map((key:string,index:number) =>{
            const item = list[key] ;
            return this.renderListItem(item,key,index,count) ;
        }) ;
    }
    handleDeleteItem = (id:string) => {
        //console.info(`删除的id 为 :${id}` ) ;
        const list = {...this.state.list} ;
        delete list[id] ;
        this.setState({list}) ;
        notification.success({message:'删除成功!',description:''}) ;
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

    async handleTestDoGet1(){
       let retData =  await testDoGet1() ;
       console.info(retData) ;
    }

    async handleTestDoPost2(){
       let containerName = 'testDoPost2' ;
       let retData =  await testDoPost2(containerName) ;
       console.info(retData) ;
    }

    renderListItem(item:ListItemProps,key:string,index:number,count:number){
        return (
            <div className="category-section-row mb20" key={key}>
                <ListItemTitle
                    id={key}
                    index={index}
                    count={count}
                    basicInfo={item.basicInfo}
                    onDelete={this.handleDeleteItem}
                    onModify={this.handleToModifyUI}
                />
                <FlightInfoContainer
                    flightList1={item.list1}
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
                    &nbsp; &nbsp;
                    <Button type="primary" onClick={this.handleTestDoGet1}>
                        testDoPost1
                    </Button>
                    &nbsp; &nbsp;
                    <Button type="primary" onClick={this.handleTestDoPost2}>
                         testDoPost2
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
    onModify:(id:string) => void ;
    onDelete:(id:string) => void ;
}

function ListItemTitle(props:ListItemTitleProps){
    const {id,basicInfo,index,count,onModify,onDelete} = props ;
    return (
        <div className="category-flight-info-descr">
            <span className="mlr20">{(index + 1) + '/' + count}</span>
            <span className="mlr20"/>
            <span className="mlr20">机型:</span>
            <span >{getFlightNoIconByValue(basicInfo.modelType)} </span>
            <span>{FlightInfoMap.getTypeShowStr(basicInfo,'modelType')}</span>
            <span className="mlr20">{basicInfo.modelCode} </span>
            <span className="mlr20"/>
            <span className="ml20">代码共享航班:</span>
            <span className="ml15">
                {getFlightNoIconByValue(basicInfo.codeShareFlightType)}
            </span>
            <span>{FlightInfoMap.getTypeShowStr(basicInfo,'codeShareFlightType')}</span>
            <span className="ml20">{basicInfo.codeShareFlightCode}</span>
            <span className="oper-section">
                <Icon 
                      type="edit hand"
                      onClick={(e:any) => onModify(id)} 
                />
                <Icon 
                      type="delete"
                      onClick={(e:any) => onDelete(id)}
                      className="ml10 hand"
                />
            </span>
        </div>
    ) ;
}


function Category4QueryApp (){
    return (
        <Siderbar 
            current="rule-category" 
            openKeys ={['rule']}>
            <Category4Query />
        </Siderbar>
    ) ;
}


export default Category4QueryApp ;

