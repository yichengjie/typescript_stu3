
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import App from './components/App.jsx' ;
import './styles/main.scss' ;

let appNode = document.createElement('div') ;
appNode.id = 'app' ;
document.body.appendChild(appNode) ;

ReactDOM.render(
  <App />,
  appNode
);