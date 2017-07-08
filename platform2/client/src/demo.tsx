import * as React from 'react' ;
import * as ReactDom from 'react-dom' ;


class Demo extends React.Component{
    render() {
        return (
            <div>hello world</div>
        ) ;
    }
}

let appNode = document.createElement('div') ;
document.body.appendChild(appNode) ;

ReactDom.render(
    <Demo/>,
    appNode
) ;


