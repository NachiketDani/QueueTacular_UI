/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import { Route, Switch } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js';

import routes from 'routes.js';
import Login from '../components/Login.js';

require('dotenv').config();

var ps;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'black',
      activeColor: 'info',
      userId: '5f28be621c0d9905080ade83',
      name: '',
    };
    this.mainPanel = React.createRef();
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle('perfect-scrollbar-on');
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.body.classList.toggle('perfect-scrollbar-on');
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };

  responseGoogle(response) {
    console.log(response);
    console.log(response.profileObj.givenName);
    this.setState({ name: response.profileObj.givenName });
  }

  render() {
    return (
      <div className='wrapper'>
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className='main-panel' ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <h1>Welcome {this.state.name}</h1>
          <GoogleLogin
            clientId='853849420986-fr4bopp51rbkquud8e8jd4jbhp356cir.apps.googleusercontent.com'
            buttonText='Login with Google'
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
          {
            <Switch>
              {routes.map((prop, key) => {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    key={key}
                    render={(props) => (
                      <prop.component {...props} userId={this.state.userId} />
                    )}
                  />
                );
              })}
            </Switch>
          }
          <Footer fluid />
        </div>
        {/* <FixedPlugin
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          handleActiveClick={this.handleActiveClick}
          handleBgClick={this.handleBgClick}
        /> */}
      </div>
    );
  }
}

export default App;
