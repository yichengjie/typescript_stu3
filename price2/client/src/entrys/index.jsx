import React from 'react';
import Category4QueryApp from '../components/category4/Category4Query.jsx' ;
import {createAppNode,render} from './common.jsx' ;
import '../styles/index.less' ; 
let appNode = createAppNode() ;
render(Category4QueryApp,appNode) ;

if (module.hot) {
  module.hot.accept('../components/category4/Category4Query.jsx', () => { 
    render(Category4QueryApp,appNode) 
  }) ;
}

