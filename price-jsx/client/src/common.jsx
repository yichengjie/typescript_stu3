import React from 'react' ;
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader' ;
import '../assets/styles/main.less' ; 
 
export function createAppNode() {
    const appNode = document.createElement('div') ;
    appNode.id = 'app' ;
    document.body.appendChild(appNode) ;
    return appNode ;
}

export const render = (WrapComponent:any,appNode:any) => {
  ReactDOM.render(
    <AppContainer>
      <WrapComponent />
    </AppContainer>,
    appNode
  );
} ;