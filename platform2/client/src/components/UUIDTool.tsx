import  * as React from 'react' ;
import { Input,Button ,Radio} from 'antd';
import * as _ from 'lodash';
const RadioGroup = Radio.Group ;
// Generate a v1 UUID (time-based)
const uuidV1 = require('uuid/v1');
// Generate a v4 UUID (random)
const uuidV4 = require('uuid/v4');

interface UUIDToolStates{
    outputValue:string ;
    type:number ;
}

class UUIDTool extends React.Component<any,UUIDToolStates>{

    constructor(props:any){
        super(props) ;
        this.state = {
            outputValue:'',
            type:4
        } ;
    }

    handleTypeChange = (e:any) => {
        let value = e.target.value ;
        this.setState({type:value}) ;
    }

    genV1UUID(){
        let uuid1Str = uuidV1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
        //console.info(`uuid1Str : ${uuid1Str}`) ;
        return uuid1Str ;
    }
    genV4UUID(){
        let uuid4Str = uuidV4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
        //console.info(`uuid4Str : ${uuid4Str}`) ;
        return uuid4Str ;
    }

    handleCreateUUID = (e:any) => {
        let type = this.state.type ;
        let uuidStr = null ;
        if(type === 1){
            uuidStr = this.genV1UUID() ;
        }else{
            uuidStr = this.genV4UUID() ;
        }
        this.setState({outputValue:uuidStr}) ;
    }

    render(){
        return (
            <div>
                <h5>uuid结果</h5>
                <Input type="textarea" data-rows={5} 
                    value={this.state.outputValue} 
                    readOnly={true}/> 
                <br/>
                <br/>
                <RadioGroup onChange={this.handleTypeChange} 
                    value={this.state.type}>
                    <Radio value={1}>V1</Radio>
                    <Radio value={4}>V4</Radio>
                </RadioGroup>
                <div className="oper-btn-container">
                    <Button type="primary" className="oper-item" 
                     onClick ={this.handleCreateUUID}>确定</Button>
                </div>  
                <Authority auth="1-1-1" allAuthList={['1-1-1']}>
                    <h4>你有权限看见这个</h4>
                </Authority>
            </div>
        ) ;
    }
}

interface AuthorityProps{
    auth:string ;
    allAuthList:string[] ;
    children?:any ;
}

class Authority extends React.Component<AuthorityProps,any>{
    checkAuth(){
        let auth = this.props.auth ;
        let allAuthList = this.props.allAuthList ;
        if(_.includes(allAuthList,auth)){
            return true ;
        }
        return false ;
    }
    render(){
        let children = this.props.children ;
        if(children && this.checkAuth()){
            return children;
        }
        return null ;
    }
}


export default UUIDTool ;