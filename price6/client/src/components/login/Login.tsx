import * as React from 'react'; 
import {Spin} from 'antd' ;
import {getPagesRouterMap4Category4,dealProjectUrl} from '../common' ; 
const pagesRouterMap = getPagesRouterMap4Category4() ;

class Login extends React.Component<any,any>{
    constructor(props:any){
        super(props) ;
        this.state = {
            loading:false
        } ;
    }

    handleSubmit = (e:any) => {
        this.setState({loading:true}) ;
        let url = pagesRouterMap.category4Query ;
        url = dealProjectUrl(url) ;
        setTimeout(()=> {
            this.setState({loading:false}) ;
            window.location.href = url ; 
        }, 1000);
    }
    render(){
        let {loading} = this.state ;
        console.info('hello world ...') ;
        return(
            <div className="LoginContainer">
                <Spin spinning={loading}>
                    <section className="container">
                        <h2>Easyfare登录</h2>
                        <form>
                            <input className="input" type="text"  placeholder="请输入用户名"/>
                            <input className="input" type="password"  placeholder="请输入密码"/>
                            <button type="button" onClick={this.handleSubmit} >登录</button>
                        </form>
                    </section>
                </Spin>
                
            </div>
        ) ;
    }
}

export default Login ;
