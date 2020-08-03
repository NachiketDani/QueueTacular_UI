import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { GoogleLoginButton } from 'react-social-login-buttons';

class Login extends React.Component {
  render() {
    return (
      <Form className='App'>
        <h1>Login</h1>
        <FormGroup>
          <Label>Email</Label>
          <Input type='email' placeholder='Email' />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type='password' placeholder='Password' />
        </FormGroup>
        <GoogleLoginButton />
      </Form>
    );
  }
}

export default Login;
