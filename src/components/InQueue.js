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

//import { queue } from 'jquery';

class InQueue extends React.Component {
  constructor(props) {
    super(props);
    this.getPlaceInQueue = this.getPlaceInQueue.bind(this);
    this.getPlaceInProgressBar = this.getPlaceInProgressBar.bind(this);
  }

  getPlaceInQueue() {
    let i;
    for (i = 0; i < this.props.queue.items.length; i++) {
      console.log(this.props.queue.items);
      if (this.props.queue.items[i].user === this.props.userId) {
        console.log('Determining place in line...');
        console.log(i);
        return i;
      }
    }
  }

  getPlaceInProgressBar() {
    const progress =
      100 - (this.getPlaceInQueue() / this.props.queue.items.length) * 100;
    console.log(progress);
    if (progress <= 25) {
      return 1;
    } else if (progress > 25 && progress <= 50) {
      return 2;
    } else if (progress > 50 && progress <= 85) {
      return 3;
    } else {
      return 4;
    }
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag='h5'>{this.props.queue.title}</CardTitle>
          <p className='card-just-text'>{this.props.queue.description}</p>
        </CardHeader>
        <CardBody>
          <div>
            <Row>
              <Col>
                <p className='card-just-text'>Queue Progress</p>
              </Col>
            </Row>
            <Row>
              <Col xs='10'>
                <Progress multi>
                  <Progress
                    bar
                    animated={this.getPlaceInProgressBar() === 1 ? true : false}
                    color={
                      this.getPlaceInProgressBar() === 1 ? 'info' : 'success'
                    }
                    value='25'
                  >
                    {this.getPlaceInProgressBar() === 1 ? 'You Are Here' : ''}
                  </Progress>
                  <Progress
                    bar
                    animated={this.getPlaceInProgressBar() === 2 ? true : false}
                    color={
                      this.getPlaceInProgressBar() === 2 ? 'info' : 'success'
                    }
                    value='25'
                  >
                    {this.getPlaceInProgressBar() === 2 ? 'You Are Here' : ''}
                  </Progress>
                  <Progress
                    bar
                    animated={this.getPlaceInProgressBar() === 3 ? true : false}
                    color={
                      this.getPlaceInProgressBar() === 3 ? 'info' : 'success'
                    }
                    value='35'
                  >
                    {this.getPlaceInProgressBar() === 3 ? 'You Are Here' : ''}
                  </Progress>
                  <Progress
                    bar
                    animated={this.getPlaceInProgressBar() === 4 ? true : false}
                    color={
                      this.getPlaceInProgressBar() === 4 ? 'danger' : 'success'
                    }
                    value='15'
                  >
                    {this.getPlaceInProgressBar() === 4 ? 'You Are Here' : ''}
                  </Progress>
                </Progress>
              </Col>
              <Col xs='2'>
                <h6>
                  <Badge color='primary'>
                    Its your turn!
                    <div classname='icon-big text-center icon-success'>
                      <i className='nc-icon nc-spaceship' />
                    </div>
                  </Badge>
                </h6>
              </Col>
            </Row>
            <br />
            <Row>
              <Col className='card-just-text'>
                In Queue - There are {this.getPlaceInQueue()} people ahead of
                you
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
