declare var module: any ;
import Category4EditApp from './components/category4/Category4Edit' ;
import {createAppNode,render} from './common' ;



let appNode = createAppNode() ;
render(Category4EditApp,appNode) ;

if (module.hot) {
  module.hot.accept('./components/category4/Category4Edit', () => { 
    render(Category4EditApp,appNode) 
  }) ;
}