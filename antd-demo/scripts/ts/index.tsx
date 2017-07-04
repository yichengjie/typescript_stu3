import * as React from "react";
import * as ReactDOM from "react-dom";
import Hello from "./components/Hello";
import  {createAppNode} from './common' ;
import '../assest/styles/indes.less' ;

let appNode = createAppNode() ;

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    appNode
);