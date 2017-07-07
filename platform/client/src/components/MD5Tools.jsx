import React,{Component} from 'react' ;
import { Input,Button,Radio,notification } from 'antd';
const RadioGroup = Radio.Group ;
var md5 = require('md5');

class MD5Tool extends Component{
    constructor(props){
        super(props) ;
        this.state = {
            inputValue:'',
            outputValue:'',
            lenNum:32
        } ;
    }
    handleInputChangeFactory(fieldName) {
        return function (e){
            let value = e.target.value || '';
            this.setState({[fieldName]:value}) ;
        }.bind(this) ;
    }
    handleEncodeOper = () => {
        let md5Str = md5(this.state.inputValue.trim()) ;
        let lenNum = this.state.lenNum ;
        if(lenNum == 16){
          md5Str = md5Str.substr(8,16) ; 
        }
        this.setState({outputValue:md5Str}) ;
    }

    render(){
        return (
           <div>
                <h5>请输入原文</h5>
                <Input type="textarea" rows={10} 
                    value={this.state.inputValue} 
                    onChange={this.handleInputChangeFactory('inputValue')}/>
                <h5>结果</h5>
                <Input type="textarea" rows={3} 
                    value={this.state.outputValue} 
                    readOnly="readOnly"/>
                <br/>
                <br/>
                <RadioGroup onChange={this.handleInputChangeFactory('lenNum')} 
                    value={this.state.lenNum}>
                    <Radio value={32}>32位</Radio>
                    <Radio value={16}>16位</Radio>
                </RadioGroup>
                <div className="oper-btn-container">
                    <Button type="primary" className="oper-item" 
                     onClick ={this.handleEncodeOper}>Encode</Button>
                    <Button type="danger" className="oper-item"
                      onClick = {this.handleClearOper}>清空</Button>
                </div>
            </div>
        ) ;
    }
}

export default MD5Tool ;


