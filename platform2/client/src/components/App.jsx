import  React,{Component} from 'react' ;
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;
// 引入React-Router模块
import { HashRouter, Route} from 'react-router-dom' ;
import Siderbar from './Siderbar.jsx' ;


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
        };
    }
    handleChange(date) {
        message.info('您选择的日期是: ' + date.toString());
        this.setState({ date });
    }
    render() {
        return (
            <HashRouter >
                <Route path="/" component={Siderbar}>
                    
                </Route>
            </HashRouter>
        );
    }
}

export default App ;