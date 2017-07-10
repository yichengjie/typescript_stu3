import React from 'react';
import Category4EditApp from '../components/category4/Category4Edit.jsx' ;
import '../styles/index.less' ; 
import {createAppNode,render} from './common.jsx' ;




let appNode = createAppNode() ;
render(Category4EditApp,appNode) ;

if (module.hot) {
  module.hot.accept('../components/category4/Category4Edit.jsx', () => { 
    render(Category4EditApp,appNode) 
  }) ;
}