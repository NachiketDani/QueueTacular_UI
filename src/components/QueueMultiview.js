import React from 'react';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Progress,
  Badge,
  Container,
  Button,
  Collapse,
} from 'reactstrap';

import InQueueMini from '../components/InQueueMini.js';
import Example from '../components/Example.js';
import graphQLFetch from '../GraphQLFetch.js';

class QueueMultiview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queueHistory: [],
    };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const queryForItems = `query {
      itemMany(filter:{
          status: Complete,
          user: "${this.props.userId}",
      }) {
       _id
      }
    }`;

    const queryForQueue = `query {
      queueMany(filter:{
        status: Closed,
        items:[{
          user: "${this.props.userId}",
          status: Complete
        }]
      }) {
        title
      }
    }`;

    const data = await graphQLFetch(queryForItems);
    console.log(data);
    if (data.itemMany.length > 0) {
      const queueData = await graphQLFetch(queryForQueue);
      console.log(queueData);
      const queueHistory = [];
      queueData.queueMany.forEach((queue) => {
        queueHistory.push(queue);
      });
      this.setState({
        queueHistory,
      });
    }
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag='h5'>My Queue History</CardTitle>
          <hr />
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <InQueueMini queue={this.state.queueHistory[0]} />
            </Col>
          </Row>
          <br />
          <hr />
          <br />
          <Row>
            <Col>
              <InQueueMini queue={this.state.queueHistory[1]} />
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <hr />
          <Example />
        </CardFooter>
      </Card>
    );
  }
}

export default QueueMultiview;
