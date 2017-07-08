import * as React from 'react' ;
import { Progress} from 'antd';

interface ProgressBarStates{
    percent:number ;
}

class ProgressBar extends React.Component<any,ProgressBarStates>{
    timer : any ;
    constructor(props:any){
        super(props) ;
        this.state = {
            percent:1
        } ;
    }

    componentDidMount(){
        this.timer = window.setInterval(() =>{
          if(this.state.percent === 99){
            window.clearInterval(this.timer) ;
          }else{
            this.setState(function(prevState){
                let percent = prevState.percent + 1 ;
                return Object.assign({},prevState,{percent}) ;
            }) ; 
          }
       },50) ; 
    }

    componentWillReceiveProps(newProp:any){
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