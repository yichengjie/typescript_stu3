import  * as React from 'react' ;
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import { Route, Link} from 'react-router-dom' ;
import SIHTestTool from './sih-test-tool/index' ;
import Base64Tool from './Base64Tool' ;
import JSONTool from './JSONTool' ;
import MD5Tools from './MD5Tools' ;
import TimeStampConvertTool from './TimeStampConvertTool' ;
import QRCodeSimple from './QRCodeSimple' ;
import MyVCard from './MyVCard' ;
import UUIDTool from './UUIDTool' ;
import WordsCount from './WordsCount' ;

import OnlineSwitchDev from './online-switch-dev' ;
let {getContextPath} = OnlineSwitchDev ;

interface SiderbarStates{
    current:string ;
    username:string ;
    currentOpenKey:string ;
}

class Siderbar extends React.Component <any,SiderbarStates>{
    constructor(props:any){
        super(props) ;
        let {location} = props ;
        let pathname = location.pathname ;
        console.info('pathname : ' , pathname) ;
        let current = this.getCurrentByLocation(location) ;
        let currentOpenKey = this.getCurrentOpenKeyByLocation(location) ;
        this.state = {
            current,
            username: 'FGUI',
            currentOpenKey
        }
    }


    handleClick = (e:any) => {
        //console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    getCurrentOpenKeyByLocation(location:any):string{
        let current = this.getCurrentByLocation(location) || 'sub1-xxx' ;
        let index = current.indexOf('-') ;
        return current.substring(0,index) ;
    }

    getCurrentByLocation(location:any):string{
        let {pathname=''} = location;
        let len = pathname.length ;
        let current = pathname.substring(1,len) ;
        return current || 'sub1-sihtool'
    }


    render() {
        let contextPath = getContextPath() ;
        return (
            <div>
                <div id="leftMenu">
                    <img src={`${contextPath}/public/images/logo.png`} width="50" id="logo"/>
                    <Menu
                        theme="dark"
                        onClick={this.handleClick}
                        defaultOpenKeys={[this.state.currentOpenKey]}
                        selectedKeys={[this.state.current]}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>MQ相关测试工具</span></span>}>
                            <Menu.Item key="sub1-sihtool" to>
                                <Link to="/sub1-sihtool">SIH</Link>
                            </Menu.Item>
                            <Menu.Item key="sub1-base64">
                                <Link to="/sub1-base64"> Base64</Link>
                            </Menu.Item>
                            <Menu.Item key="sub1-json">
                                <Link to="/sub1-json">JSON</Link>
                            </Menu.Item>

                            <Menu.Item key="sub1-md5">
                                <Link to="/sub1-md5">MD5</Link>
                            </Menu.Item>

                            <Menu.Item key="sub1-uuid">
                                <Link to="/sub1-uuid">UUID</Link>
                            </Menu.Item>

                            <Menu.Item key="sub1-timestampconvert">
                                <Link to="/sub1-timestampconvert">TimeStamp</Link>
                            </Menu.Item>

                            <Menu.Item key="sub1-wordscount">
                                <Link to="/sub1-wordscount">字符串字节数</Link>
                            </Menu.Item>

                            
                        </SubMenu>

                        <SubMenu key="other" title={<span><Icon type="setting" /><span>其他</span></span>}>
                            <Menu.Item key="other-qrcodesimple">
                                <Link to="/other-qrcodesimple">简单文字二维码</Link>
                            </Menu.Item>
                            <Menu.Item key="other-myvcard">
                                <Link to="/other-myvcard">名片二维码</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div id="rightWrap">
                    <Route exact path="/" component={SIHTestTool as any}/>
                    <Route exact path="/sub1-sihtool" component={SIHTestTool as any}/>
                    <Route exact path="/sub1-base64" component={Base64Tool as any}/>
                    <Route exact path="/sub1-json" component={JSONTool as any}/>
                    <Route exact path="/sub1-md5" component={MD5Tools as any}/>
                    <Route exact path="/sub1-uuid" component={UUIDTool as any}/>
                    <Route exact path="/sub1-timestampconvert" component={TimeStampConvertTool as any}/>
                    <Route exact path="/other-qrcodesimple" component={QRCodeSimple as any}/>
                    <Route exact path="/other-myvcard" component={MyVCard as any}/>
                    <Route exact path="/sub1-wordscount" component={WordsCount as any}/>
                </div>
            </div>
        );
    }
}

export default Siderbar ;
