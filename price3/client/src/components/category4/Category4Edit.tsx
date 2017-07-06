import * as React from 'react' ;
import FlightInfoContainer from './FlightInfoContainer' ;
import * as moment from 'moment';
import * as _ from 'lodash' ;
import {queryCategory4ById} from './api/CommonApi' ;
import {getQueryString,dealProjectUrl} from '../common' ;
import Siderbar from '../Siderbar' ;

import {Select,Input,Radio,Checkbox,Icon,Button,
    TimePicker,message} from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;
const format = 'HH:mm';

interface CategorySectionProps{
    children:string;
}

function CategorySection (props:CategorySectionProps){
    return (
        <div className="category-section-title">
            <span className="title">{props.children}</span>
        </div>
    ) ;
}

const options = [
    { label: '星期一', value: '1' },
    { label: '星期二', value: '2' },
    { label: '星期三', value: '3' },
    { label: '星期四', value: '4' },
    { label: '星期五', value: '5' },
    { label: '星期六', value: '6' },
    { label: '星期日', value: '7' },
];


function getChangeValue(event:any){
    if(event && event.target){
        return event.target.value ;
    }
    return event ;
}

interface Category4EditState{
    id?:string ; 
    basicInfo?:any ; 
    flightInfo?:any ;
    flightList1?:object[] ;
    flightList2?:object[];
}


class Category4Edit extends React.Component <any,Category4EditState>{
    constructor(){
        super() ;
        let id = getQueryString('id') ;
        //console.info('id : ' , id) ;
        this.state = {
            id,
            basicInfo:{
                modelType:'' , //(1)机型 [空:不限,1:适用,2:不适用]
                modelCode:'',  //(2)机型代码
                codeShareFlightType:'',//(3)代码共享航班类型 [空:可适用,1:不适用,2:仅适用]
                codeShareFlightCode:'',//(4)代码共享航班代码
            },
            flightInfo:{
                flightType:'1',//(6)航班类型，1:去程航班，2:回程航班
                ///////////////////////////////////////////////
                timeRangeList:[//(5)适用时刻范围段
                    {start:'11:30',end:'12:10'},
                ],
                flightPlanApplyType:'',//(7)航班计划适用于 [空:正班/加班,1:正班,2:加班]
                flightNoType:'',//(8)航班号 [空:不限,1:仅适用,2:不适用]
                flightNoCodeStart:'',//(9)航班号起始值
                flightNoCodeEnd:'',//(10)航班号结束
                flightApplyRangeType:'',//(11)适用航段类型 [空:'不限',1:首段,8:末段,
                                        //2:第二段,3:第三段,4:第四段,5:第五段,6:第六段,7:第七段]
                flightApplyWeek:[] //(12)适用星期[1:星期一,2:星期二,3:星期三,4:星期四,5:星期五,6:星期六,7:星期日]
            },
            flightList1:[],//去程信息
            flightList2:[]//回程信息
        } ;
    }

    async componentDidMount(){
        let {id} = this.state ;
        if(id && id.length > 0){
            let retData = await queryCategory4ById(id) ;
            let {category4} = retData ;
            let {list1,list2,basicInfo} = category4 ;
            let newBasicInfo = Object.assign({},this.state.basicInfo,basicInfo) ;
            this.setState({
                flightList1:list1 ,
                flightList2:list2,
                basicInfo:newBasicInfo
            }) ;
        }
    }

    //从页面填写的数据组装一条航班信息列表
    assembleFlightInfoObjByFormData(){
        let {flightInfo} = this.state ;
        let retObj = _.cloneDeep(flightInfo) ;
        return retObj ;
    }

    handleBaseInfoChangeFactory(fieldName:string){
        let formDataName = 'basicInfo' ;
        return this._handleFormDataChange(fieldName,formDataName) ;
    }

    handleFlightInfoChangeFactory(fieldName:string){
        let formDataName = 'flightInfo' ;
        return this._handleFormDataChange(fieldName,formDataName) ;
    }

    _handleFormDataChange(fieldName:string,formDataName:string){
        let formData = this.state[formDataName] ;
        return (event:any) => {
            let value = getChangeValue(event) ;
            //星期天需要排序
            this.delFlightApplyWeek(fieldName,value) ;
            let newFormData = Object.assign({},formData,{[fieldName]:value}) ;
            this.setState({[formDataName]:newFormData}) ;
        } ;
    }

    //星期天需要从大到小进行排序
    delFlightApplyWeek(fieldName:string,value:number[]){
        if(fieldName === 'flightApplyWeek' && value && value.length > 1){
            value.sort(function(a:number,b:number){
                return a - b ;
            }) ;
        }
        return value ;
    }
    //基础表单信息
    getBaseInfoFieldProps = (fieldName:string) => {
        let formDataName = 'basicInfo' ;
        let formData = this.state[formDataName] ;
        let value = formData[fieldName] ;
        let onChange = this.handleBaseInfoChangeFactory(fieldName) ;
        return {value,onChange} ;
    }
    //航班号表单信息
    getFlightInfoFieldProps = (fieldName:string) => {
        let formDataName = 'flightInfo' ;
        let formData = this.state[formDataName] ;
        let value = formData[fieldName] ;
        let onChange = this.handleFlightInfoChangeFactory(fieldName) ;
        return {value,onChange} ;
    }

    handleAddTimeGroup = () =>{
        let formDataName = 'flightInfo' ;
        let formData = this.state[formDataName] ;
        let timeRangeList = [...formData.timeRangeList] ;
        if(timeRangeList.length < 10){
            timeRangeList.push({start:'',end:''}) ;
            let newFormData = Object.assign({},formData,{timeRangeList}) ;
            this.setState({[formDataName]:newFormData}) ;
        }else{
            message.error('最多添加10组!');
        }
    }

    //添加航班信息
    handleAddFlightInfo = (e:any) => {
        let retObj = this.assembleFlightInfoObjByFormData() ;
        let {flightType} = retObj ;
        let {flightList1 = [],flightList2 = []} = this.state ;
        let newFlightList = [] ;
        if(flightType === '1'){//去程信息
            newFlightList = [...flightList1] ;
            newFlightList.push(retObj) ;
            this.setState({flightList1:newFlightList}) ;
        }else{
            newFlightList = [...flightList2] ;
            newFlightList.push(retObj) ;
            this.setState({flightList2:newFlightList}) ;
        }
    }

    handeleDeleteFlightInfo = (name:string,index:number) => {
        let newList = [...this.state[name]] ;
        newList.splice(index,1) ;
        this.setState({[name]:newList}) ;
    }

    handleModifyFlightInfo = (name:string,index:number) =>{
        let obj = _.cloneDeep(this.state[name][index] );
        this.setState({flightInfo:obj}) ;
    }
    handle2QueryUI(){
        let url = 'index.html' ;
        url = dealProjectUrl(url) ;
        window.location.href = url ;
    }

    render(){
        let gbfp = this.getBaseInfoFieldProps;
        let gffp = this.getFlightInfoFieldProps;
        return (
            <div className="category-container">
                <div className="category-section-row">
                    <Button type="primary" >保存</Button>
                    <Button className="mlr15">清空</Button>
                    <Button onClick={this.handle2QueryUI}>返回</Button>
                </div>
                <CategorySection>基础信息</CategorySection>
                <div className="category-section-row">
                    <label className="mr15">机型</label>
                    <Select {...gbfp('modelType')} style={{ width: '100px' }} >
                        <Option value="">不限</Option>
                        <Option value="1">适用</Option>
                        <Option value="2">不适用</Option>
                    </Select>
                    <span className="mr10"></span>
                    <Input style={{width:'150px'}}  {...gbfp('modelCode')} />

                    <span className="mlr15"></span>

                    <label className="mlr15">代码共享航班</label>
                    <Select style={{ width: '100px' }} {...gbfp('codeShareFlightType')}  >
                        <Option value="">可适用</Option>
                        <Option value="1">不适用</Option>
                        <Option value="2">仅适用</Option>
                    </Select>
                    <span className="mr15"></span>
                    <Input style={{width:'150px'}}  {...gbfp('codeShareFlightCode')}
                           placeholder="承运人"/>
                </div>

                <CategorySection>航班信息</CategorySection>
                <div className="category-section-row" style={{width:'900px'}}>
                    <RadioGroup {...gffp('flightType')}>
                        <RadioButton value="1">去程航班</RadioButton>
                        <RadioButton value="2">回程航班</RadioButton>
                    </RadioGroup>

                    <span className="float-right">
                        <Button onClick={this.handleAddFlightInfo}>新加
                        </Button>
                    </span>
                </div>
                <div className="category-section-row">
                    <label className="mr20">航班计划适用于</label>
                    <RadioGroup {...gffp('flightPlanApplyType')}>
                        <Radio value="">正班/加班</Radio>
                        <Radio value="1">正班</Radio>
                        <Radio value="2">加班</Radio>
                    </RadioGroup>
                    <span className="mlr10"></span>
                    <label className="mlr10">航班号</label>
                    <Select {...gffp('flightNoType')}
                            style={{ width: '90px' }} >
                        <Option value="">不限</Option>
                        <Option value="1">适用</Option>
                        <Option value="2">不适用</Option>
                    </Select>
                    <span className="ml10"></span>
                    <Input style={{width:'60px'}} {...gffp('flightNoCodeStart')} />
                    <span className="mlr5">-</span>
                    <Input style={{width:'60px'}} {...gffp('flightNoCodeEnd')}/>

                    <span className="mlr10"></span>
                    <label className="mlr10">适用航段</label>
                    <Select {...gffp('flightApplyRangeType')}
                            style={{ width: '90px' }} >
                        <Option value="">不限</Option>
                        <Option value="1">首段</Option>
                        <Option value="8">末段</Option>
                        <Option value="2">第二段</Option>
                        <Option value="3">第三段</Option>
                        <Option value="4">第四段</Option>
                        <Option value="5">第五段</Option>
                        <Option value="6">第六段</Option>
                        <Option value="7">第七段</Option>
                    </Select>
                </div>

                <div className="category-section-row">
                    <label className="mr20">适用星期</label>
                    <CheckboxGroup options={options}
                                   className="inline-block"
                                   {...gffp('flightApplyWeek')}/>
                </div>
                <div className="category-section-row">
                    <label className="mr20 label">适用时刻</label>
                    <ApplyTimeRangeList
                        {...gffp('timeRangeList')}/>
                    <span style={{lineHeight:'28px'}}>
                        <span className="time-add-bg label" onClick={this.handleAddTimeGroup}>
                         <Icon type="plus" />
                        </span>
                        <span className="ml5 color-grey label">限最多10组</span>
                    </span>
                </div>

                <div className="category-section-row">
                    <FlightInfoContainer
                        flightList1 ={this.state.flightList1}
                        flightList2 ={this.state.flightList2}
                        onDelete={this.handeleDeleteFlightInfo}
                        onModify={this.handleModifyFlightInfo}
                        defaultShowOperBtn={true}
                        defaultShowAllRecord={true}
                    />
                </div>

            </div>
        ) ;
    }
}



function getFormatDateStr(str:string ) : moment.Moment | undefined{
    if(str && str.length > 0 ){
        return moment(str, format) ;
    }
    return  undefined;
}

interface ApplyTimeRangeListProps{
    onChange:(value:any[]) => void ;
    value:any[] ;
    startFieldName?:string ;
    endFieldName?:string ;
}


class ApplyTimeRangeList extends React.Component <ApplyTimeRangeListProps,any>{
    handleChangeList = (newItemValue:any,index:number) => {
        let {onChange,value} = this.props ;
        let newValue = [...value] ;
        newValue[index] = newItemValue ;
        onChange(newValue) ;
    }
    handleDelete = (index:number) => {
        let {onChange,value} = this.props ;
        let newValue = [...value] ;
        newValue.splice(index,1) ;
        onChange(newValue) ;
    }
    renderAllGroup(){
        let {value} = this.props ;
        let retObj = null ;
        let list = value ;
        if(list && list.length > 0){
            retObj = list.map((item,index) =>{
                return (
                    <ApplyTimeRangeItem
                        onDelete={this.handleDelete}
                        onChange={this.handleChangeList}
                        value={item}
                        index={index}
                        key ={index}/>
                ) ;
            }) ;
        }
        return retObj ;
    }
    render(){
        return (
            <div className="category-input-list-container">
                {this.renderAllGroup()}
            </div>
        ) ;
    }
}

interface ApplyTimeRangeItemProps{
    startFieldName?:string;
    endFieldName?:string ;
    onDelete?:(index:number) => void;
    onChange?:(newValue:object,index:number) => void;
    index:number ;
    value:any;
}



class ApplyTimeRangeItem extends React.Component<ApplyTimeRangeItemProps,any>{
    static defaultProps = {
        startFieldName:'start',
        endFieldName:'end',
        onDelete:(index:number)=> {}
    } ;
    handleDelete = () => {
        let {index,onDelete} = this.props ;
        if(onDelete){
            onDelete(index) ;
        }
    }
    handleChangeFactory(fieldName:string){
        let {value,index,onChange} = this.props ;
        return (time:any,timeStr:string) => {
            let newValue = Object.assign({},value,{[fieldName]:timeStr}) ;
            if(onChange){
                onChange(newValue,index) ;
            } 
        } ;
    }
    render(){
        let {startFieldName = 'start',endFieldName = 'end',value} = this.props ;
        let startFieldValue = value[startFieldName] ;
        let endFieldValue = value[endFieldName] ;
        return (
            <span className="mr20 category-input-list-item">
                <TimePicker  style={{width:'90px'}}
                    value = {getFormatDateStr(startFieldValue)}
                    onChange={this.handleChangeFactory(startFieldName)}
                    format={format}  />
                <span className="mlr5">-</span>
                <TimePicker  style={{width:'90px'}}
                    value={getFormatDateStr(endFieldValue)}
                    onChange={this.handleChangeFactory(endFieldName)}
                    format={format} />
                <Icon type="delete" className="hand ml5"
                      onClick={this.handleDelete} />
            </span>
        ) ;
    }
}


function Category4EditApp(){
    return (
        <Siderbar current="rule-category" openKeys ={['rule']}>
            <Category4Edit />
        </Siderbar>
    ) ;
}

export default Category4EditApp ;