import React from 'react'
import './Login.scss';
import { Form,FormGroup,Col,Button,Checkbox,FormControl,ControlLabel} from 'react-bootstrap';


class Login extends React.Component{
  constructor(props){
    super(props)
    this.loginClick = this.loginClick.bind(this);
    this.state={
      show:'block'
    }
  }
  loginClick(){
    console.log(111);
    this.setState({
     show:'none'
   })
   console.log(this.state.show)
  }
  render(){
    // const show=this.state.show;等于const {show}=this.state;
    const {show}=this.state;
    const formInstance = (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            邮件
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>
    
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            密码
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>
    
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>记住密码</Checkbox>
          </Col>
        </FormGroup>
    
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={()=>this.loginClick()}>
              登录
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
   

    return (
      <div className='loginBg' style={{display:show}}>
          <div className='loginContent'>
              {formInstance}
          </div>
      </div>
    )
    // ReactDOM.render(formInstance,document.getElementById(loginView));
  }
  
}
export default Login