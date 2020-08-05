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
    return progress;
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
              <Col xs='11'>
                <Progress multi>
                  {/*<Progress bar color='success' value='25'></Progress>*/}
                  <Progress bar animated color='new-blue' value='25'>
                    {this.getPlaceInProgressBar() <= 25 ? 'You Are Here' : ''}
                  </Progress>
                  <Progress bar color='info' value='25'>
                    {this.getPlaceInProgressBar() > 25 &&
                    this.getPlaceInProgressBar() <= 50
                      ? 'You Are Here'
                      : ''}
                  </Progress>
                  <Progress bar striped color='warningvalue' value='25'>
                    {this.getPlaceInProgressBar() > 50 &&
                    this.getPlaceInProgressBar() <= 75
                      ? 'You Are Here'
                      : ''}
                  </Progress>
                  <Progress bar color='danger' value='25'>
                    {this.getPlaceInProgressBar() > 75 &&
                    this.getPlaceInProgressBar() <= 100
                      ? 'You Are Here'
                      : ''}
                  </Progress>
                </Progress>
              </Col>
              <Col>
                <Badge color='success'>
                  Its your turn!
                  <div classname='icon-big text-center icon-success'>
                    <i className='nc-icon nc-simple-remove' />
                  </div>
                </Badge>
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
