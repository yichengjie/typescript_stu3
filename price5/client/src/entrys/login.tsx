declare var module: any ;
import LoginApp from '../components/login/Login' ;
import { createAppNode,render } from './common' ;

const appNode = createAppNode() ;
render(LoginApp,appNode) ;
if (module.hot) {
  module.hot.accept('../components/login/Login', () => { 
    render(LoginApp,appNode) ;
  }) ;
}