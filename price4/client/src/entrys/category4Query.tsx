declare var module: any ;
import Category4QueryApp from '../components/category4/Category4Query' ;
import { createAppNode,render } from './common' ;


const appNode = createAppNode() ;
render(Category4QueryApp,appNode) ;
if (module.hot) {
  module.hot.accept('../components/category4/Category4Query.tsx', () => { 
    render(Category4QueryApp,appNode) ;
  }) ;
}