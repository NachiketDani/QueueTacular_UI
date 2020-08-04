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
} from 'reactstrap';

import graphQLFetch from '../GraphQLFetch';

class InQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'You are not currently in any queues',
      description: '',
    };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const queryForItems = `query {
      itemMany(filter:{
          status: Waiting,
          user: "${this.props.userId}",
      }) {
       _id
      }
    }`;

    const queryForQueue = `query {
      queueOne(filter:{
        status: Open,
        items:[{
          user: "${this.props.userId}",
          status: Waiting
        }]
      }) {
        title
      }
    }`;

    const data = await graphQLFetch(queryForItems);
    if (data.itemMany.length > 0) {
      const queueData = await graphQLFetch(queryForQueue);
      this.setState({
        title: queueData.queueOne.title,
        description: queueData.queueOne.description,
      });
    }
  }

  render() {
    const data = this.loadData();
    console.log(data);
    return (
      <Card>
        <CardHeader>
          <CardTitle tag='h5'>{this.state.title}</CardTitle>
          <hr />
          You have an estimated 30 mins remaining in the queue.
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
              <Col>
                <Badge color='danger'>
                  Wait.
                  <div classname='icon-big text-center icon-warning'>
                    <i className='nc-icon nc-simple-remove' />
                  </div>
                </Badge>
              </Col>
            </Row>
            <br />
            <Row>
              <Col className='card-just-text'>
                In Queue - There are 10 people ahead of you!
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

export default InQueue;
