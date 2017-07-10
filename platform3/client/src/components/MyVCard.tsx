import * as React  from 'react' ;
import * as ReactDOM from 'react-dom';
import { Input,Button,notification,Form } from 'antd';
const FormItem = Form.Item;
let QRCode = require('qrcode') ;
// let templateVcardObj:{[index:string]:string} = {
//         firstName:'易',/**姓 */
//         lastName:'成杰',/**名 */
//         company:'FBI',/**公司 */
//         work:'web dev',/** 职务*/
//         tel1:'15712867682',/** 电话*/
//         tel2:'',/** 电话*/
//         expressAddr:'北五环',/** 快递地址*/
//         workAddr:'朝阳',
//         homeAddr:'河南',
//         email:'626659321@qq.com'
// } ;

interface UserInfoProps {
        firstName:string ;/**姓 */
        lastName:string ;/**名 */
        company:string ;/**公司 */
        work:string ;/** 职务*/
        tel1:string ;/** 电话*/
        tel2:string ;/** 电话*/
        expressAddr:string ;/** 快递地址*/
        workAddr:string ;
        homeAddr:string ;
        email:string ;
} ;

function getVcardStr(userInfo:UserInfoProps){
    let {firstName='张',lastName='三',company='FBI',work = 'Shrimp Man',email='666@qq.com'}  = userInfo;
    let {tel1='123',tel2='',expressAddr='CN',workAddr='CN',homeAddr='CN'} = userInfo ;
    let fullName =  firstName + lastName ;
    let retStr = `BEGIN:VCARD
        VERSION:2.1
        N:${firstName};${lastName};;Mr.
        FN:${fullName}
        ORG:${company}
        TITLE:${work}
        TEL;WORK;VOICE:${tel1}
        TEL;HOME;VOICE:${tel2}
        ADR;WORK;PREF:;;${workAddr}
        LABEL;WORK;PREF;ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:${expressAddr}
        ADR;HOME:;;${homeAddr}
        LABEL;HOME;ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:123456
        EMAIL:${email}
        REV:20080424T195243Z
        END:VCARD` ;
    return retStr ;
}

interface MyVCardState{
    inputValue:string ;   
}

class MyVCard extends React.Component <any,MyVCardState>{
    canvas :any ;
    constructor(props:any){
        super(props) ;
        this.canvas = null ;
        this.state = {
            inputValue:''
        } ;
    }

    createQRCode(str:string){
        if(str == null || str.trim() == ''){
            return false;
        }
        let canvasNode = ReactDOM.findDOMNode(this.canvas) ;
        QRCode.toCanvas(canvasNode, str, function (error:any) {
            if (error) {
                notification.error({message:'生成二维码失败',description:''}) ;
                console.error(error) ;
            }
        }) ;
        return true ;
    }

    handleInputChange = (e:any)=>{
        let value = e.target.value ;
        this.setState({inputValue:value}) ;
    }

    handleClearOper = (e:any) =>{
        this.setState({inputValue:''}) ;
    }

    handleCreateQRCode = ()=>{
        let formData = this.props.form.getFieldsValue() ;
        let vcardStr = getVcardStr(formData) ;
        this.createQRCode(vcardStr) ;
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        let labelCol = {
            xs: { span: 24 },
            sm: { span: 6 },
        } ;
        let wrapperCol = {
            xs: { span: 24 },
            sm: { span: 14 },
        } ;
        const formItemLayout = {
            labelCol: labelCol,
            wrapperCol: wrapperCol,
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {span: 24,offset: 0,},
                sm: {span: 14,offset: 6,},
            },
        };
        return (
            <div className="vcard-tool-container">
                 <div className="vcard-tool-box">
                     <Form className="login-form sih-test-tool-cfgPage">
                        <FormItem {...formItemLayout as any} label="姓">
                            {getFieldDecorator('firstName')(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout as any} label="名">
                            {getFieldDecorator('lastName')(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout as any} label="公司">
                            {getFieldDecorator('company')(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout as any} label="职务">
                            {getFieldDecorator('work')(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout as any} label="电话">
                            {getFieldDecorator('tel1')(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout as any} label="快递地址">
                            {getFieldDecorator('expressAddr')(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout as any} label="工作地点">
                            {getFieldDecorator('workAddr')(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout as any} label="家庭地点">
                            {getFieldDecorator('homeAddr')(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout as any} label="邮箱">
                            {getFieldDecorator('email')(<Input />)}
                        </FormItem>
                        <FormItem {...tailFormItemLayout as any}>
                            <Button type="primary" 
                                onClick ={this.handleCreateQRCode} size="large">生产二维码</Button>
                        </FormItem>
                    </Form>
                 </div>
                 <div className="vcard-tool-box">
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;微信扫描二维码:</h5>
                    <canvas  ref={(canvas) => { this.canvas = canvas; }} ></canvas>
                 </div>
            </div>
        ) ;
    }
}

export default Form.create()(MyVCard)  ;