import * as React from 'react' ;
// 引入React-Router模块
import { HashRouter, Route} from 'react-router-dom' ;
import Siderbar from './Siderbar' ;

function App (){
    return (
        <HashRouter >
            <Route path="/" component={Siderbar as any} />
        </HashRouter>
    );
}

export default App ;