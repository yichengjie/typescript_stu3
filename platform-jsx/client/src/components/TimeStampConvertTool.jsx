import  React,{Component} from 'react' ;
import { Input,Button, Row, Col,Icon } from 'antd';

function formatDate2Str(dateObj) {
  return dateObj.getFullYear()
        + "-" + (dateObj.getMonth()>8?(dateObj.getMonth()+1):"0"+(dateObj.getMonth()+1))
        + "-" + (dateObj.getDate()>9?dateObj.getDate():"0"+dateObj.getDate())
        + " " + (dateObj.getHours()>9?dateObj.getHours():"0"+dateObj.getHours())
        + ":" + (dateObj.getMinutes()>9?dateObj.getMinutes():"0"+dateObj.getMinutes())
        + ":" + (dateObj.getSeconds()>9?dateObj.getSeconds():"0"+dateObj.getSeconds());
}

class TimeStampConvertTool extends Component {
    constructor(props){
        super(props) ;
        let curDate = new Date() ;
        let timeNum = curDate.getTime() ;
        let timeStr = formatDate2Str(curDate) ;
        this.state = {
            currentTimestampNum:timeNum,
            currentTimestampStr:timeStr,
            input2Value:'',
            output2Value:'',
            input3Value:'',
            output3Value:''
        } ;
    }

    autoUpdateTimeView(){
        let curDate = new Date() ;
        let timeNum = curDate.getTime() ;
        let timeStr = formatDate2Str(curDate) ;
        this.setState({currentTimestampNum:timeNum,currentTimestampStr:timeStr}) ;
    }


    componentDidMount(){
        this.timer = window.setInterval(function(){
          this.autoUpdateTimeView() ;  
        }.bind(this),3000) ;
    }

    componentWillUnmount(){
         window.clearInterval(this.timer) ;
    }

    handleInputChangeFactory(fieldName){
        return function (e){
            let value = e.target.value ;
            this.setState({[fieldName]:value}) ;
        }.bind(this) ;
    }

    handleOper2 =(e) =>{
        let valueStr = this.state.input2Value * 1  ;
        let date = new Date(valueStr);
        let timeStr = formatDate2Str(date) ;
        this.setState({output2Value:timeStr}) ;
    }

    handleOper3 =() =>{//从str字符串转为数字
        let valueStr = this.state.input3Value ;
        let dateNum = Date.parse(valueStr) ;
        this.setState({output3Value:dateNum}) ;
    }
    
    render(){
        return (
            <div className="timestamp-container">
                <Row>
                    <Col span={10}>
                        <Input placeholder="当前时间" readOnly="readOnly"
                            value={this.state.currentTimestampNum} />
                    </Col>
                    <Col span={4}>
                    </Col>
                    <Col span={10}>
                        <Input placeholder="当前时间" readOnly="readOnly"
                            value={this.state.currentTimestampStr}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={10}>
                        <Input placeholder="Unix timestamp" 
                            onChange={this.handleInputChangeFactory('input2Value')}/>
                    </Col>
                    <Col span={4} style={{"textAlign": "center"}}>
                        <Button type="primary" onClick={this.handleOper2}
                            >
                            <Icon type="forward" />
                        </Button>
                    </Col>
                    <Col span={10}>
                        <Input placeholder="yyyy-MM-dd HH:mm:ss" readOnly="readOnly" 
                         value ={this.state.output2Value}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={10}>
                        <Input placeholder="yyyy-MM-dd HH:mm:ss" 
                            onChange={this.handleInputChangeFactory('input3Value')}/>
                    </Col>
                    <Col span={4} style={{"textAlign": "center"}}>
                        <Button  type="primary" onClick={this.handleOper3}>
                            <Icon type="forward" />
                        </Button>
                    </Col>
                    <Col span={10}>
                        <Input placeholder="Unix timestamp" readOnly="readOnly" 
                        value ={this.state.output3Value}/>
                    </Col>
                </Row>
            </div>
        ) ;
    }
}

export default TimeStampConvertTool ;