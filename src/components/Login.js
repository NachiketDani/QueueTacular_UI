import React from 'react';
import GoogleLogin from 'react-google-login';

require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
  }

  render() {
    return (
      <GoogleLogin
        clientId='853849420986-fr4bopp51rbkquud8e8jd4jbhp356cir.apps.googleusercontent.com'
        buttonText='Login with Google'
        onSuccess={this.props.onSignIn}
        onFailure={this.props.onSignIn}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
      //   <Form className='App'>
      //     <FormGroup>
      //       <Label>Email</Label>
      //       <Input type='email' placeholder='Email' />
      //     </FormGroup>
      //     <FormGroup>
      //       <Label>Password</Label>
      //       <Input type='password' placeholder='Password' />
      //     </FormGroup>
      //   </Form>
    );
  }
}

export default Login;
