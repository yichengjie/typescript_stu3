import * as React from "react";
//import {Button} from 'antd' ;

export interface HelloProps { 
    compiler: string; 
    framework: string; 
}
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export default class Hello extends React.Component<HelloProps, undefined> {
    render() {
        console.info('hello world .....') ;
        return (
            <div>
                {/*
                    <Button>hello</Button>
                */}
                
                <br/>
                <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
            </div>
        ) ; 
    }
}