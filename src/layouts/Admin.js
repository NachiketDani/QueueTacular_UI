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
import { Card, CardBody, CardText } from 'reactstrap';

import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js';

import routes from 'routes.js';
import graphQLFetch from '../GraphQLFetch';

var ps;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'black',
      activeColor: 'info',
      userId: '',
      name: '',
      inQueueItemIds: [],
      inQueueIds: [],
      queueInTitle: '',
    };
    this.mainPanel = React.createRef();
    this.responseGoogle = this.responseGoogle.bind(this);
    this.getInQueueItems = this.getInQueueItems.bind(this);
    this.getQueueCurrentlyIn = this.getQueueCurrentlyIn.bind(this);
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

  async responseGoogle(response) {
    console.log(response);
    console.log(response.profileObj.givenName);
    this.setState({
      name: response.profileObj.givenName,
      email: response.profileObj.email,
    });

    const queryForUserId = `query {
      userOne(filter:{
          email: "${this.state.email}",
      }) {
       _id
      }
    }`;

    const data = await graphQLFetch(queryForUserId);
    if (data) {
      this.setState({ userId: data.userOne._id });
      const itemIds = await this.getInQueueItems();
      this.setState({ inQueueItemIds: itemIds });
      if (itemIds.length > 0) {
        const inQueueTitle = await this.getQueueCurrentlyIn();
        this.setState({ queueInTitle: inQueueTitle });
      }
    }
  }

  async getInQueueItems() {
    const queryForItems = `query {
      itemMany(filter:{
          status: Waiting,
          user: "${this.state.userId}",
      }) {
        _id
      }
    }`;

    const data = await graphQLFetch(queryForItems);
    console.log(data);
    if (data != null) {
      const itemIds = data.itemMany.map((item) => item._id);
      console.log(itemIds);
      return itemIds;
    }
  }

  async getQueueCurrentlyIn() {
    const queryForQueue = `query {
      queueOne(filter:{
        status: Open,
        items:[{
          _id: "${this.state.inQueueItemIds[0]}",
        }]
      }) {
        title
        description
      }
    }`;

    // Get the appropriate queue
    console.log(this.state.inQueueItemIds[0]);
    const data = await graphQLFetch(queryForQueue);
    console.log(data);
    if (data != null) {
      const queueTitle = data.queueOne.title;
      return queueTitle;
    }
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
          <DemoNavbar
            {...this.props}
            onSignIn={this.responseGoogle}
            name={this.state.name}
          />
          {
            <Switch>
              {routes.map((prop, key) => {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    key={key}
                    render={(props) => (
                      <prop.component
                        {...props}
                        userId={this.state.userId}
                        inQueueItemIds={this.state.inQueueItemIds}
                        queueInTitle={this.state.queueInTitle}
                      />
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
