import  React,{Component} from 'react' ;
import { Input,Button } from 'antd';
var Base64 = require('js-base64').Base64;
class Base64Tool extends Component {
    constructor(props){
        super(props) ;
        this.state = {
            inputValue:''
        }   
    }
    handleInputChange = (e) => {
        let value = e.target.value ;
        this.setState({inputValue:value}) ;
    }

    handleEncodeOper = (e) => {
        let encodeStr = Base64.encode(this.state.inputValue);
        this.setState({inputValue:encodeStr}) ;
    }

    handleDecodeOper = (e) => {
        let decodeStr = Base64.decode(this.state.inputValue);
        this.setState({inputValue:decodeStr}) ;
    }

    handleClearOper = (e) => {
        this.setState({inputValue:''}) ;
    }
    
    render(){
        return (
            <div>
                <h5>请输入原文</h5>
                <Input type="textarea" rows={23} 
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