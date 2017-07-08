declare let module : any ;
//引入组件
import App from './components/App' ;
import { createAppNode,render } from './common' ;

const appNode = createAppNode() ;
render(App,appNode) ;

if (module.hot) {
  module.hot.accept('./components/App', () => { 
    render(App,appNode) ;
  }) ;
}