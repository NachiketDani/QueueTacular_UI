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
} from 'reactstrap';

import graphQLFetch from '../GraphQLFetch';
//import { queue } from 'jquery';

class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    if (this.props.userId !== '') {
      // this.loadData();
    }
  }

  async loadData() {
    const queryForQueue = `query {
      queueOne(filter:{
        status: Open,
        items:[{
          _id: "${this.props.inQueueItemIds[0]}",
        }]
      }) {
        title
        description
      }
    }`;

    // const data = await graphQLFetch(queryForItems);
    // if (data.itemMany != null && data.itemMany.length > 0) {
    //   console.log(data);
    //   const itemId = data.itemMany[0]._id;
    //   console.log(itemId);
    //   this.setState({ itemId: itemId });
    //   console.log(this.state.itemId);

    // Get the appropriate queue
    console.log(this.props.inQueueItemIds[0]);
    const queueData = await graphQLFetch(queryForQueue);
    console.log(queueData);
    if (queueData != null && queueData.queueOne !== null) {
      this.setState({
        title: queueData.queueOne.title,
        description: queueData.queueOne.description,
      });
    }
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag='h5'>{this.props.queueInTitle}</CardTitle>
          <p className='card-just-text'>
            You have an estimated 30 mins remaining in the queue.
          </p>
        </CardHeader>
        <CardBody>
          <div>
            <Row>
              <Col>
                <p className='card-just-text'>Queue Progress</p>
              </Col>
            </Row>
            <Row>
              <Col xs='11'>
                <Progress multi>
                  <Progress bar color='success' value='40' />
                  <Progress bar animated color='new-blue' value='15'>
                    You Are Here
                  </Progress>
                  <Progress bar color='info' value='15' />
                  <Progress bar striped color='warning' value='15'>
                    5 Min Warning
                  </Progress>
                  <Progress bar color='danger' value='15'>
                    Almost Ready!
                  </Progress>
                </Progress>
              </Col>
              <i className='nc-icon nc-user-run' />
            </Row>
            <br />
            <Row>
              <Col className='card-just-text'>
                In Queue - There are 10 peaple ahead of you!
              </Col>
            </Row>
          </div>
        </CardBody>
        <CardFooter>
          <hr />
          <div className='stats'>
            <i className='fa fa-history' /> Updated 3 mins ago
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default Queue;
