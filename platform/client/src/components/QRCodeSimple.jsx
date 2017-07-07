import React,{Component} from 'react' ;
import ReactDOM from 'react-dom';
import { Input,Button,notification } from 'antd';
let QRCode = require('qrcode') ;



class QRCodeSimple extends Component{

    constructor(props){
        super(props) ;
        this.canvas = null ;
        this.state = {
            inputValue:''
        } ;
    }

    createQRCode(str){
        if(str == null || str.trim() == ''){
            return false;
        }
        let canvasNode = ReactDOM.findDOMNode(this.canvas) ;
        QRCode.toCanvas(canvasNode, str, function (error) {
            if (error) {
                notification.error({message:'生成二维码失败'}) ;
                console.error(error) ;
            }
        }) ;
    }

    handleInputChange = (e)=>{
        let value = e.target.value ;
        this.setState({inputValue:value}) ;
    }

    handleClearOper = (e) =>{
        this.setState({inputValue:''}) ;
    }

    handleCreateQRCode = ()=>{
        this.createQRCode(this.state.inputValue) ;
    }

    render(){
        return (
            <div>
                 <h5>请输入原文</h5>
                <Input type="textarea" rows={10} 
                    value={this.state.inputValue} 
                    onChange={this.handleInputChange}/>
                <br/>
                <div className="oper-btn-container">
                    <Button type="primary" className="oper-item" 
                     onClick ={this.handleCreateQRCode}>生产二维码</Button>
                    <Button type="danger" className="oper-item"
                      onClick = {this.handleClearOper}>清空</Button>
                </div>
                <h5>二维码:</h5>
                <canvas  ref={(canvas) => { this.canvas = canvas; }} ></canvas>
            </div>
        ) ;
    }
}

export default QRCodeSimple ;