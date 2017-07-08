import * as React from 'react' ;
import { Input,Button,Radio } from 'antd';
const RadioGroup = Radio.Group ;
const {TextArea} = Input ;
var md5 = require('md5');

interface MD5ToolStates{
    inputValue?:string ;
    outputValue?:string ;
    lenNum?:number ;
}

class MD5Tool extends React.Component<any,MD5ToolStates>{
    constructor(props:any){
        super(props) ;
        this.state = {
            inputValue:'',
            outputValue:'',
            lenNum:32
        } ;
    }
    handleInputChangeFactory(fieldName:string) {
        return (e:any) => {
            let value = e.target.value || '';
            this.setState({[fieldName]:value}) ;
        } ;
    }
    handleEncodeOper = () => {
        const inputValue = this.state.inputValue || '';
        let md5Str = md5(inputValue.trim()) ;
        let lenNum = this.state.lenNum ;
        if(lenNum == 16){
          md5Str = md5Str.substr(8,16) ; 
        }
        this.setState({outputValue:md5Str}) ;
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
                    readOnly={true}/>
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


