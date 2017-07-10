import React,{Component} from 'react' ;
import { Progress} from 'antd';

class ProgressBar extends Component{
    constructor(props){
        super(props) ;
        this.state = {
            percent:1
        } ;
    }

    componentDidMount(){
        this.timer = window.setInterval(function(){
          if(this.state.percent === 99){
            window.clearInterval(this.timer) ;
          }else{
            this.setState(function(prevState){
                let percent = prevState.percent + 1 ;
                return Object.assign({},prevState,{percent}) ;
            }) ; 
          }
       }.bind(this),50) ; 
    }

    componentWillReceiveProps(newProp){
        let {isQuerying} = newProp ;
        if(isQuerying === false){
            this.setState({percent:1}) ;
            window.clearInterval(this.timer) ;
        }
    }

    componentWillUnmount(){
        window.clearInterval(this.timer) ;
    }

    render(){
       return (
           <Progress percent={this.state.percent} 
               status="active" />
       ) ;
    }
}

export default ProgressBar ;