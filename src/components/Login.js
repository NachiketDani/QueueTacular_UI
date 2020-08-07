import React from 'react';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

require('dotenv').config();

const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  '853849420986-fr4bopp51rbkquud8e8jd4jbhp356cir.apps.googleusercontent.com';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.chooseDisplay = this.chooseDisplay.bind(this);
  }

  chooseDisplay() {
    if (this.props.loggedIn) {
      return (
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          buttonText='Logout'
          onLogoutSuccess={this.props.onSignOut}
        />
      );
    } else {
      return (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText='Login with Google'
          onSuccess={this.props.onSignIn}
          onFailure={this.props.SignInFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      );
    }
  }

  render() {
    return <>{this.chooseDisplay()}</>;
  }
}

export default Login;
