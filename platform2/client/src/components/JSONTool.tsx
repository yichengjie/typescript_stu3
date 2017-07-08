import * as React from 'react' ;
import {jsonSyntaxHighlight,validateJSONStr} from '../common/common' ;
import { Input,Button,notification } from 'antd';

interface JSONToolStates{
    inputValue:string ;
    outputValue:string ;
}

class JSONTool extends React.Component<any,JSONToolStates>{

    constructor(props:any){
        super(props) ;
        this.state = {
            inputValue:'',
            outputValue:''
        } ;
    }

    handleInputChange = (e:any)=>{
        let value = e.target.value ;
        this.setState({inputValue:value}) ;
    }

    handleClearOper = () => {
        this.setState({inputValue:'',outputValue:''}) ;
    }

    handleValidateOper = () =>{
        let jsonStr = this.state.inputValue ;
        if(jsonStr == null || jsonStr.trim() == ''){
            this.setState({outputValue:''}) ;
            return true ;
        }
        let flag = validateJSONStr(jsonStr) ;
        if(flag){
            notification.success({message:'合法的JSON字符串!',description:''}) ;
        }else{
            notification.error({message:'不是合法JSON字符串!',description:''}) ;
        }
        return true ;
    }

    handleFormatOper = () => {
        let jsonStr = this.state.inputValue ;
        if(jsonStr == null || jsonStr.trim() == ''){
            this.setState({outputValue:''}) ;
            return true ;
        }
        let flag = validateJSONStr(jsonStr) ;
        if(flag){
            let showStr = jsonSyntaxHighlight(JSON.parse(jsonStr)) ;
            console.info(showStr) ;
            this.setState({outputValue:showStr}) ;
        }else{
             notification.error({message:'不是合法JSON字符串!',description:''}) ;
        }
        return true ;
    }

    render(){
        return (
            <div className="json-tool-container">
                <div className="json-tool-box">
                     <Input type="textarea" 
                        style={{height:"100%"}}
                        placeholder="请输入JSON" 
                        value = {this.state.inputValue}
                        onChange={this.handleInputChange}/>
                </div>
                <div className="sih-test-tool-split"></div>
                <div className="json-tool-box json-tool-output beautify-json"
                    dangerouslySetInnerHTML={{__html: this.state.outputValue}}>
                </div>
                <div className="oper-btn-container">
                    <Button type="primary" className="oper-item" 
                       onClick = {this.handleFormatOper}>格式化</Button>
                    <Button className="oper-item"
                       onClick={this.handleValidateOper}>校验合法</Button>
                    <Button type="danger" className="oper-item"
                        onClick = {this.handleClearOper}>清空</Button>
                </div>
           </div>
        ) ;
    }
}

export default JSONTool  ;