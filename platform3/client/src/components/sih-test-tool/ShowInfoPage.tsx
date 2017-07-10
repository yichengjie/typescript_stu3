import React,{Component} from 'react' ;
import { Input,Button ,notification} from 'antd';
let {TextArea} = Input ;
import ProgressBar from '../ProgressBar' ;
import OnlineSwitchDev from '../online-switch-dev' ;
let SIHAPI = OnlineSwitchDev.SIHAPI ;


interface ShowInfoPageState{
    inputValue:string ;/**用户填写的请求信息 */
    isQuerying:boolean ;/**查询中flag */
    reqHeaderValue:string ;/*mq的请求头信息*/
    outputObj:object | null ;/**mq请求返回信息 */
}

class ShowInfoPage extends Component <any,ShowInfoPageState>{
    constructor(props:any){
        super(props) ;
        this.state = {
           inputValue:'',/**用户填写的请求信息 */
           isQuerying:false,/**查询中flag */
           reqHeaderValue:'',/*mq的请求头信息*/
           outputObj:null,/**mq请求返回信息 */
        } 
        this.handleClickQueryBtn = this.handleClickQueryBtn.bind(this) ;
    }
    
    async componentDidMount(){
        console.info('ShowInfoPage component did mount .....') ;
        let {inputData} = await SIHAPI.getSIHInputDataTemplate() as any ;
        let inputValue = JSON.stringify(inputData,null,2) ;
        this.setState({inputValue}) ;
    }
    //处理请求信息修改的回掉函数
    handleChangeInputValue = (event:any) => {
        let value = event.target.value ;
        this.setState({inputValue:value}) ;
    }
    //当点击查询时的处理函数
    async handleClickQueryBtn (event:any){
        //console.info('handleClickQueryBtn is called ..') ;
        let validFlag = this.__validateStrIsJson(this.state.inputValue) ;
        if(!validFlag){
           notification.error({message:"输入的JSON字符串不合法!",description:''}) ;
           return false;
        }
        let waitInfo = {info:"数据加载中，请耐心等待..."} ; 
        this.setState({reqHeaderValue:'',isQuerying:true,outputObj:waitInfo}) ;

        let requestParamObj = {
            formDataValue:this.props.formData,
            inputValue:this.state.inputValue
        } ;
        let {outputData,reqMsgStr} = await SIHAPI.querySIHData(requestParamObj) as any ;
        this.setState({
            outputObj:outputData,
            reqHeaderValue:reqMsgStr,
            isQuerying:false
        }) ;
        return true ;
    }

    __validateStrIsJson(jsonStr:string){
        let flag = true ;
        try {
            JSON.parse(jsonStr) ;
        } catch (error) {
            flag = false;
        }
        return flag ;
    }

    getJSONStrByJSObj(jsObj:object|null){
        if(jsObj != null){
            return JSON.stringify(jsObj,null,2) ;
        }
        return '' ;
    }

    renderQueryBtnOrProgress(){
       let isQuerying =  this.state.isQuerying ;
       if(isQuerying){
            return <ProgressBar isQuerying={this.state.isQuerying}/> ;
       }else{
            return (
                <Button type="primary" className="btn-block" 
                    onClick = {this.handleClickQueryBtn}>GO</Button>
            ) ;
       }
    }

    render(){
        return (
            <div className="sih-test-tool-showInfoPage">
                <TextArea  rows={20} 
                    className="sih-test-tool-textarea"
                    placeholder="请输入SIH请求JSON" 
                    value = {this.state.inputValue }
                    onChange={this.handleChangeInputValue}/>
                <div className="sih-test-tool-split"></div>
                <TextArea  rows={20} className="sih-test-tool-textarea" 
                    readOnly placeholder="SIH处理返回结果" value={
                       this.getJSONStrByJSObj(this.state.outputObj)
                    }/>
                {this.renderQueryBtnOrProgress()}
                <TextArea  type="textarea"  rows={4}  readOnly
                     value={this.state.reqHeaderValue} placeholder="MQ请求头信息"/>
            </div>
        ) ;
    }
}

export default ShowInfoPage ;