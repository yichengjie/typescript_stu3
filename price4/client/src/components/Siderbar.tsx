import * as React from 'react' ;
import { Layout, Menu, Icon } from 'antd';
const {Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu ;

interface SiderbarProps{
  current:string ;
  openKeys:any ;
}

class Siderbar extends React.Component <SiderbarProps,any>{
  static defaultProps = {
     current:'',
     openKeys:[],
  } ;
  openKeys:any[] ;

  constructor(props:SiderbarProps){
     super(props) ;
     this.state = {
       current:props.current,
       openKeys:props.openKeys,
       collapsed: false,
       mode: 'inline',
     } ;
  }

  handleMenuItemClick = (e:any) => {
    this.setState({
      current: e.key,
    });
  }

  handleMenuOpenChange = (openKeys:any) =>{
      this.setState({
        openKeys   
      }) ;
  }

  onCollapse = (collapsed:boolean) => {
    //console.log(`collapsed :${collapsed}`);
    let openKeys:any = [] ;
    if(collapsed){//如果是折叠
        this.openKeys = [...this.state.openKeys] ;
        openKeys = [] ;
    }else{//如果是展开折叠
       openKeys = [...this.openKeys] ; 
    }
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
      openKeys
    });
  }
  render() {
    let {openKeys} = this.state;
    let otherProps = {
      id:'components-layout-demo-side'
    } ;
    return (
      <Layout style={{height:'100%'}} {...otherProps}>
        <Sider 
          width="150"
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" > {this.state.collapsed ? 'EF':'EasyFare GUI'}</div>
          <Menu theme="dark" 
            mode={this.state.mode} 
            onClick={this.handleMenuItemClick}
            openKeys={openKeys}
            selectedKeys={[this.state.current]}
            onOpenChange={this.handleMenuOpenChange}
            >
            <SubMenu
              key="user"
              title={<span><Icon type="user" />
              <span className="nav-text">用户管理</span></span>}
            >
              <Menu.Item key="1">用户信息</Menu.Item>
              <Menu.Item key="2">权限信息</Menu.Item>
            </SubMenu>
            <SubMenu
              key="rule"
              title={<span><Icon type="team" />
              <span className="nav-text">规则管理</span></span>}
            >
              <Menu.Item key="rule-category">
                Category
              </Menu.Item>
              <Menu.Item key="5">其他</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <span>
                <Icon type="file" />
                <span className="nav-text">其他</span>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{height:'100%'}}>
          <Content>
            <div style={{margin:'10px 10px 0 10px'}}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center',height:'50px' }}>
                Price2.0 ©2017 Created by FGUI 
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Siderbar ;