import  React from 'react' ;
// 引入React-Router模块
import { HashRouter, Route} from 'react-router-dom' ;
import Siderbar from './Siderbar.jsx' ;


function App (){
    return (
        <HashRouter >
            <Route path="/" component={Siderbar} />
        </HashRouter>
    );
}

export default App ;