declare var module: any ;
import {createAppNode,render} from './common' ;
import Category4EditApp from './components/category4/Category4Edit' ;

const appNode = createAppNode() ;
render(Category4EditApp,appNode) ;

if (module.hot) {
  module.hot.accept('./components/category4/Category4Edit', () => { 
    render(Category4EditApp,appNode) ;
  }) ;
}