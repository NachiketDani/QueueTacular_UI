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
// reactstrap components
import { Row, Col } from 'reactstrap';

import QueueMultiview from '../components/QueueMultiview.js';
import CreatedQueues from '../components/CreatedQueues.js';
import CreatedQueue from '../components/CreatedQueue.js';
import InQueue from '../components/InQueue.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreatedBool: false,
      showId: 0,
      showQueueDetail: false,
      queueDetailId: 0,
    };
    this.showCreated = this.showCreated.bind(this);
    this.removeCreated = this.removeCreated.bind(this);
    this.showQueueDetail = this.showQueueDetail.bind(this);
    this.removeQueueDetail = this.removeQueueDetail.bind(this);
  }

  showCreated = (id) => {
    this.setState({
      showCreatedBool: true,
      showId: id,
    });
    // console.log('success');
  };

  removeCreated() {
    this.setState({
      showCreatedBool: false,
    });
    // console.log('removed');
  }

  showQueueDetail = (id) => {
    let queueID = id.substr(1);
    console.log('ID:', queueID);
    this.setState({
      showQueueDetail: true,
      queueDetailId: queueID,
    });
  };

  removeQueueDetail() {
    this.setState({
      showQueueDetail: false,
    });
  }

  render() {
    // console.log('showId:', `${this.state.showId}`);
    return (
      <>
        <div className='content'>
          {this.state.showQueueDetail ? (
            <InQueue
              removeQueueDetail={this.removeQueueDetail}
              queue={this.props.queues[this.state.queueDetailId]}
              userId={this.props.userId}
              loggedIn={this.state.loggedIn}
            />
          ) : null}
          <Row>
            <Col md='12'>
              <QueueMultiview
                userId={this.props.userId}
                queues={this.props.queues}
                showQueueDetail={this.showQueueDetail}
              />
            </Col>
          </Row>
          <Row>
            <Col md='12'>
              <CreatedQueues showCreated={this.showCreated} {...this.props} />
            </Col>
          </Row>
          {this.state.showCreatedBool ? (
            <CreatedQueue
              removeCreated={this.removeCreated}
              {...this.props.createdQueues[this.state.showId]}
              loggedIn={this.state.loggedIn}
            />
          ) : null}
        </div>
      </>
    );
  }
}

export default Dashboard;
