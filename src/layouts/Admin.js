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
// import { Card, CardBody, CardText } from 'reactstrap';

import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
// import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js';

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
      inQueueItems: [],
      queues: [],
      createdQueues: [],
      loggedIn: false,
      userItems: [],
    };
    this.mainPanel = React.createRef();
    this.responseGoogle = this.responseGoogle.bind(this);
    this.getInQueueItems = this.getInQueueItems.bind(this);
    this.getQueuesCurrentlyIn = this.getQueuesCurrentlyIn.bind(this);
    this.loadData = this.loadData.bind(this);
    this.signoutGoogle = this.signoutGoogle.bind(this);
    this.signInFailure = this.signInFailure.bind(this);
  }

  async componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle('perfect-scrollbar-on');
    }
    if (this.state.userId !== '') {
      this.loadData();
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.body.classList.toggle('perfect-scrollbar-on');
    }
  }

  async componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
    if (this.state.userId !== '') {
      this.loadData();
    }
  }

  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };

  async loadData() {
    // console.log('loading data..', this.state.userId);
    const items = await this.getInQueueItems();
    if (items && items.itemMany != null) {
      this.setState({ inQueueItems: items });
      if (this.state.inQueueItems.length > 0) {
        const queues = await this.getQueuesCurrentlyIn();
        this.setState({ queues: queues });
      }
    }
  }

  signInFailure() {
    console.log('Sign in failed');
  }

  signoutGoogle() {
    this.setState({
      loggedIn: false,
      userId: '',
      name: '',
      inQueueItems: [],
      queues: [],
      createdQueues: [],
    });
  }

  async responseGoogle(response) {
    // console.log(response);
    // console.log(response.profileObj.givenName);
    this.setState({
      name: response.profileObj.givenName,
      email: response.profileObj.email,
      loggedIn: true,
    });

    const queryForUserId = `query {
      userOne(filter:{
          email: "${this.state.email}",
      }) {
       _id
      }
    }`;

    const data = await graphQLFetch(queryForUserId);
    // if user is alaready in the DB
    if (data && data.userOne != null) {
      this.setState({ userId: data.userOne._id });
      const items = await this.getInQueueItems();
      this.setState({ inQueueItems: items });
      if (this.state.inQueueItems.length > 0) {
        // console.log(this.state.inQueueItems.length);
        // console.log(this.state.inQueueItems);
        // console.log('Got the items... on to the queues!');
        const queues = await this.getQueuesCurrentlyIn();
        // console.log(queues);
        this.setState({ queues: queues });
        // console.log(this.state.queues);
      }
    }
    // user is not in the DB yet, create a new one
    else if (data && data.userOne == null) {
      const mutationForNewUser = `mutation {
        userCreateOne(record:{
            username: "${this.state.name}",
            email: "${this.state.email}",
        }) {
         recordId
        }
      }`;

      const data = await graphQLFetch(mutationForNewUser);
      if (data) {
        this.setState({
          userId: data.userCreateOne.recordId,
        });
      }
    }
    const queues = await this.getCreatedQueues();
    if (queues) {
      this.setState({ createdQueues: queues });
    }
    //  Tim: ate some homemade spaghetti
    // const users = await this.getCreatedUsersInfo();
    // if (users) {
    //   this.setState({ userItems: users });
    // }
  }

  async getInQueueItems() {
    const queryForItems = `query {
      itemMany(filter:{
          status: Waiting,
          user: "${this.state.userId}",
      }) {
        _id
        status
        description
      }
    }`;

    const data = await graphQLFetch(queryForItems);
    // console.log(data);
    if (data != null && data.itemMany != null) {
      // console.log(data.itemMany);
      let i;
      let items = [];
      for (i = 0; i < data.itemMany.length; i++) {
        items.push(data.itemMany[i]);
      }
      // console.log('items list to return', items);
      return items;
    }
  }

  async getQueuesCurrentlyIn() {
    let queues = [];
    let i;
    // console.log(this.state.inQueueItems);
    // console.log('Items to iterate over', this.state.inQueueItems);
    for (i = 0; i < this.state.inQueueItems.length; i++) {
      let itemId = this.state.inQueueItems[i]._id;
      const queryForQueue = `query {
        queueOne(filter:{
          status: Open,
          items:[{
            _id: "${itemId}",
          }]
        }) {
          _id
          description
          title
          endDate
          status
          items {
            user
            status
            description
          }
        }
      }`;
      const data = await graphQLFetch(queryForQueue);
      // console.log(data);
      if (data != null && data.queueOne != null) {
        queues.push(data.queueOne);
      }
    }
    return queues;
  }

  async getCreatedQueues() {
    const queryForQueues = `query {
      queueMany(filter:{
        owner: "${this.state.userId}"
      }){
        _id
        title
        owner
        description
        status
        maxParticipants
        startDate
        endDate
        items {
          _id user wait description status
        }
      }
    }`;

    const data = await graphQLFetch(queryForQueues);
    if (data && data.queueMany !== null && data.queueMany.length > 0)
      return data.queueMany;
  }

  // Tim: creates a list of objects with _id: that contain lists of user's MongoID
  async getCreatedUsers() {
    const queues = await this.getCreatedQueues();
    const users = queues.map((queue) => {
      return queue.items.map((item) => {
        return { _id: JSON.stringify(item.user) };
      });
    });
    return users;
  }

  // Tim: homemade speciality spaghetti with JSON stringify,
  // nested array of objectsm and meatball
  // async getCreatedUsersInfo() {
  //   const users = await this.getCreatedUsers();
  //   if (users == null) return [];
  //   let userInfo = [];
  //   let i;
  //   for (i = 0; i < 1; i++) {
  //     let userList = users[i];
  //     let j;
  //     for (j = 0; j < userList.length; j++) {
  //       let jsonObject = JSON.stringify(userList[i][j]);
  //       jsonObject.replace(/"([^"]+)":/g, '$1:');
  //     }
  //     if (userList.length) {
  //       const queryForUsers = `query {
  //         userMany(filter: {
  //           OR: ${userList[i]}
  //         }) {
  //           username email
  //         }
  //       }`;
  //       const data = await graphQLFetch(queryForUsers);
  //       if (data && data.userMany !== null) {
  //         userInfo.push(data.userMany);
  //       }
  //     } else {
  //       userInfo.push([]);
  //     }
  //   }
  //   return userInfo;
  // }

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
            loggedIn={this.state.loggedIn}
            onSignOut={this.signoutGoogle}
            onSignInFailure={this.signInFailure}
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
                        queues={this.state.queues}
                        loggedIn={this.state.loggedIn}
                        createdQueues={this.state.createdQueues}
                        onSignOut={this.signoutGoogle}
                        onSignInFailure={this.signInFailure}
                        onSignIn={this.responseGoogle}
                        userItems={this.state.userItems}
                      />
                    )}
                  />
                );
              })}
            </Switch>
          }
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default App;
