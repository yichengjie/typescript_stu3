import * as React from 'react' ;
//import * as React from 'react' ;
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader' ;
import '../assets/styles/index.less' ; 
 
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