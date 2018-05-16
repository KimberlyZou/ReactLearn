import React from 'react'
import './Login.scss';
import { Form, FormGroup, Col, Button, Checkbox, FormControl, ControlLabel } from 'react-bootstrap';


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.loginClick = this.loginClick.bind(this);
    this.state = {
      show: 'block',
      btnDisable:true,
      username: {
        value: '',
        valid:false,
        error:''
      },
      password: {
        value: '',
        valid:false,
        error:''
      }
    }
  }
  loginClick() {
    
    this.setState({
      show: 'none'
    })
  }
  //此处有bug...
  handleFormChange(filed, value) {
    const newChangeobj = { value, valid:true, error:'' }
    
    
    switch (filed) {
      case 'username': {
        if (value.length === 0) {
          newChangeobj.error = '用户名不能为空';
          newChangeobj.valid = false;
        }else{
          newChangeobj.valid==true
        }
        this.setState({
          username:newChangeobj
        })
        break;
      }
      case 'password': {
        if (value.length === 0) {
          newChangeobj.error = '密码不能为空';
          newChangeobj.valid = false;
        }else{
          newChangeobj.valid==true
        }
        this.setState({
          password:newChangeobj
        })
        break;
      }
    }
    if(this.state.username.valid==true&&this.state.password.valid){
      this.setState({
        btnDisable:false
      })
    }else{
      this.setState({
        btnDisable:true
      })
    }
    console.log(JSON.stringify(this.state.username),JSON.stringify(this.state.password))
    // alert(this.state.btnDisable)
  }
  render() {
    // es6
    const { show } = this.state;
    const { username,password ,btnDisable} = this.state;
    const formInstance = (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            用户名
          </Col>
          <Col sm={10}>
            <FormControl type="text" value={username.value} placeholder="Username" onChange={(e) => this.handleFormChange('username', e.target.value)} />
            <div className='validMessage'> {!username.valid && <p>{username.error}</p>}</div>
          </Col>
        
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            密码
          </Col>
          <Col sm={10}>
            <FormControl type="password" value={password.value} placeholder="Password" onChange={(e) => this.handleFormChange('password', e.target.value)} />
            <div className='validMessage'> {!password.valid && <span>{password.error}</span>} </div>
          </Col>
         
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>记住密码</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={() => this.loginClick()} disabled={btnDisable}>
              登录
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );


    return (
      <div className='loginBg' style={{ display: show }}>
        <div className='loginContent'>
          {formInstance}
        </div>
      </div>
    )
    // ReactDOM.render(formInstance,document.getElementById(loginView));
  }

}
export default Login