import * as React from 'react'; 
import {getPagesRouterMap4Category4,dealProjectUrl} from '../common' ; 
const pagesRouterMap = getPagesRouterMap4Category4() ;

class Login extends React.Component{
    handleSubmit(e:any){
        let url = pagesRouterMap.category4Query ;
        url = dealProjectUrl(url) ;
        window.location.href = url ; 
    }
    render(){
        return(
            <div className="LoginContainer">
                <section className="container">
                    <h2>Easyfare登录</h2>
                    <form>
                        <input className="input" type="text"  placeholder="请输入用户名"/>
                        <input className="input" type="password"  placeholder="请输入密码"/>
                        <button type="button" onClick={this.handleSubmit} >登录</button>
                    </form>
                </section>
            </div>
        ) ;
    }
}

export default Login ;
