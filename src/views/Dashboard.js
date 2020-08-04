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
  render() {
    return (
      <>
        <div className='content'>
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
              <InQueue
                userId={this.props.userId}
                inQueueItemIds={this.props.inQueueItemIds}
                queueInTitle={this.props.queueInTitle}
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
