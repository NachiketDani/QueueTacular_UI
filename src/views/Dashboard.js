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

import InQueue from '../components/InQueue.js';
import QueueMultiview from '../components/QueueMultiview.js';
import CreatedQueues from '../components/CreatedQueues.js';
import CreatedQueue from '../components/CreatedQueue.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreatedBool: false,
    };
    this.showCreated = this.showCreated.bind(this);
    this.removeCreated = this.removeCreated.bind(this);
  }

  showCreated() {
    this.setState({
      showCreatedBool: true,
    });
    console.log('success');
  }

  removeCreated() {
    this.setState({
      showCreatedBool: false,
    });
    console.log('removed');
  }

  render() {
    return (
      <>
        <div className='content'>
          {this.state.showCreatedBool ? (
            <CreatedQueue removeCreated={this.removeCreated} />
          ) : null}
          {/* <Row>
            <Col md='12'>
              <CreatedQueue />
            </Col>
          </Row> */}
          <Row>
            <Col md='12'>
              <CreatedQueues showCreated={this.showCreated} />
            </Col>
          </Row>
          <Row>
            <Col md='12'>
              <CreatedQueue userId={this.props.userId} />
            </Col>
          </Row>
          <Row>
            <Col md='12'>
              <CreatedQueues userId={this.props.userId} />
            </Col>
          </Row>
          <Row>
            <Col md='12'>
              <QueueMultiview
                userId={this.props.userId}
                queues={this.props.queues}
              />
            </Col>
          </Row>
          <Row>
            <Col md='12'>
              {/*<QueueMultiview userId={this.props.userId} />*/}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
