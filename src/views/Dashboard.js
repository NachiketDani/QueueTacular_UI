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
// react plugin used to create charts
// import { Line, Pie } from 'react-chartjs-2';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from 'variables/charts.js';

import InQueue from '../components/InQueue.js';
import QueueMultiview from '../components/QueueMultiview.js';

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <div className='content'>
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
