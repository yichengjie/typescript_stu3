import * as React from 'react' ;
import {getByteLen} from '../common/common' ;
import { Input,Button } from 'antd';
const {TextArea} = Input ;

interface WordsCountStates{
    inputValue:string ;
    outputValue:string ;
}

class WordsCount extends React.PureComponent<any,WordsCountStates>{
    constructor(props:any){
        super(props) ;
        this.state = {
            inputValue:'',
            outputValue:''
        } ;
    }
    handleInputChangeFactory(fieldName:any){
        return (e:any) =>{
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

    handleClearOper = () =>{
        this.setState({
            inputValue:'',
            outputValue:''
        }) ;
    }

    render(){
        return (
            <div>
                <h5>请输入原文</h5>
                <TextArea type="textarea" rows={10} 
                    value={this.state.inputValue} 
                    onChange={this.handleInputChangeFactory('inputValue')}/>
                <h5>结果</h5>
                <TextArea type="textarea" rows={3} 
                    value={this.state.outputValue} 
                    readOnly/>
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