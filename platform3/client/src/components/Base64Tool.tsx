import  * as React from 'react' ;
import { Input,Button } from 'antd';
const { TextArea } = Input;
var Base64 = require('js-base64').Base64;

interface Base64ToolStates{
    inputValue:string ;
}

class Base64Tool extends React.Component<any,Base64ToolStates> {
    constructor(props:any){
        super(props) ;
        this.state = {
            inputValue:''
        }   
    }
    handleInputChange = (e:any) => {
        let value = e.target.value ;
        this.setState({inputValue:value}) ;
    }

    handleEncodeOper = (e:any) => {
        let encodeStr = Base64.encode(this.state.inputValue);
        this.setState({inputValue:encodeStr}) ;
    }

    handleDecodeOper = (e:any) => {
        let decodeStr = Base64.decode(this.state.inputValue);
        this.setState({inputValue:decodeStr}) ;
    }

    handleClearOper = (e:any) => {
        this.setState({inputValue:''}) ;
    }
    
    render(){
        return (
            <div>
                <h5>请输入原文</h5>
                <TextArea type="textarea" rows={23} 
                    value={this.state.inputValue} 
                    onChange={this.handleInputChange}/>
                <div className="oper-btn-container">
                    <Button type="primary" className="oper-item" 
                     onClick ={this.handleEncodeOper}>Encode</Button>
                    <Button className="oper-item" 
                     onClick = {this.handleDecodeOper}>Decode</Button>
                    <Button type="danger" className="oper-item"
                      onClick = {this.handleClearOper}>清空</Button>
                </div>
            </div>
        )
    }
}
export default Base64Tool