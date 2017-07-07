import React,{PureComponent} from 'react' ;
import {getByteLen} from '../common/common.js' ;
import { Input,Button } from 'antd';

class WordsCount extends PureComponent{
    constructor(props){
        super(props) ;
        this.state = {
            inputValue:'',
            outputValue:''
        } ;
    }
    handleInputChangeFactory(fieldName){
        return (e) =>{
            let value = e.target.value ;
            this.setState({
                [fieldName]:value
            }) ;
        }
    }

    handleCountOper = () => {
        let str = this.state.inputValue || '';
        let len = getByteLen(str.trim())  +'';
        this.setState({
            outputValue:len
        }) ;
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
                <div className="oper-btn-container">
                    <Button type="primary" className="oper-item" 
                     onClick ={this.handleCountOper}>字节数</Button>
                    <Button type="danger" className="oper-item"
                      onClick = {this.handleClearOper}>清空</Button>
                </div>
            </div>
        ) ;
    }
}

export default WordsCount ;