import React from 'react' ;
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
 
export function createAppNode(){
    let appNode = document.createElement('div') ;
    appNode.id = 'app' ;
    document.body.appendChild(appNode) ;
    return appNode ;
}

export const render = (Component,appNode) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    appNode
  )
}

