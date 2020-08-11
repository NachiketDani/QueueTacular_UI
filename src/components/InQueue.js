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
import { data } from 'jquery';

//import { queue } from 'jquery';

class InQueue extends React.Component {
  constructor(props) {
    super(props);
    this.getPlaceInQueue = this.getPlaceInQueue.bind(this);
    this.getProgressViews = this.getProgressViews.bind(this);
    this.getEndDate = this.getEndDate.bind(this);
  }

  getPlaceInQueue() {
    let i;
    for (i = 0; i < this.props.queue.items.length; i++) {
      // console.log(this.props.queue.items);
      if (this.props.queue.items[i].user === this.props.userId) {
        // console.log('Determining place in line...');
        // console.log(i);
        return i;
      }
    }
  }

  getProgressViews() {
    const num = this.props.queue.items.length;
    let placeInQueue = this.getPlaceInQueue();
    const progressBars = [];
    let unit = 1 / num;
    let i;
    for (i = num - 1; i >= 0; i--) {
      let progressBar = (
        <Progress
          bar
          animated={placeInQueue === i ? true : false}
          color={placeInQueue === i ? 'danger' : 'success'}
          value={unit * 100}
          key={i.toString()}
        >
          {placeInQueue === i ? 'You Are Here' : ''}
        </Progress>
      );
      progressBars.push(progressBar);
    }
    return progressBars;
  }

  getEndDate() {
    const date = new Date(this.props.queue.endDate);
    // console.log(date);
    const end = ` ${date.toDateString()} at ${date.toLocaleTimeString()}`;
    return end;
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <div style={{ textAlign: 'right', verticalAlign: 'top' }}>
            <Badge
              color='danger'
              onClick={() => this.props.removeQueueDetail()}
              style={{ cursor: 'pointer' }}
            >
              <i className='nc-icon nc-simple-remove' />
            </Badge>
          </div>

          <CardTitle tag='h5'>{this.props.queue.title}</CardTitle>
          <p className='card-just-text'>{this.props.queue.description}</p>
          <p className='card-just-text'>
            <em>Your details: </em>
            {this.props.queue.items[this.getPlaceInQueue()].description}
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
              <Col xs='10'>
                <Progress multi>{this.getProgressViews()}</Progress>
              </Col>
              <Col xs='2'>
                <h6>
                  <Badge color='primary'>
                    Its your turn!
                    <div className='icon-big text-center icon-success'>
                      <i className='nc-icon nc-spaceship' />
                    </div>
                  </Badge>
                </h6>
              </Col>
            </Row>
            <br />
            <Row>
              <Col className='card-just-text'>
                In Queue - There are <strong>{this.getPlaceInQueue()}</strong>{' '}
                people ahead of you
              </Col>
            </Row>
          </div>
        </CardBody>
        <CardFooter>
          <hr />
          <div className='stats'>
            <i className='fa fa-history' />
            This queue will be open until:
            {this.getEndDate()}
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default InQueue;
