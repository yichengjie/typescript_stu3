//引入组件
import App from './components/App.jsx' ;
import { createAppNode,render } from './common.jsx' ;

const appNode = createAppNode() ;
render(App,appNode) ;

if (module.hot) {
  module.hot.accept('./components/App.jsx', () => { 
    render(App,appNode) ;
  }) ;
}