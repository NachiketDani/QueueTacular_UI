import React from 'react';
// reactstrap components
import { Row, Table, Col, Progress, Badge } from 'reactstrap';

class InQueueMini extends React.Component {
  constructor(props) {
    super(props);
    this.getPlaceInQueue = this.getPlaceInQueue.bind(this);
    this.getProgressViews = this.getProgressViews.bind(this);
  }

  getPlaceInQueue() {
    let i;
    for (i = 0; i < this.props.items.length; i++) {
      // console.log(this.props.queue.items);
      if (this.props.items[i].user === this.props.userId) {
        // console.log('Determining place in line...');
        // console.log(i);
        return i;
      }
    }
  }

  getProgressViews() {
    const num = this.props.items.length;
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

  render() {
    const queueTitle = this.props.title != null ? this.props.title : '';
    return (
      <>
        <div
          onClick={() =>
            this.props.showQueueDetail('Q' + this.props.queueId.toString())
          }
          style={{ cursor: 'pointer' }}
        >
          <Row>
            <Col>
              <h6>{queueTitle}</h6>
            </Col>
          </Row>
          <Row>
            <Col xs='10'>
              <Progress multi>{this.getProgressViews()}</Progress>
            </Col>
            <Col xs='2'>
              <h6>
                {this.props.status === 'Open' ? (
                  <Badge color='success'>
                    <h5 style={{ marginLeft: 10, marginBottom: 0 }}>
                      Open
                      <i
                        style={{ marginRight: 10 }}
                        className='nc-icon nc-bulb-63'
                      />
                    </h5>
                  </Badge>
                ) : (
                  <Badge color='danger'>
                    <h5 style={{ marginLeft: 10, marginBottom: 0 }}>
                      Closed
                      <i
                        style={{ marginRight: 10 }}
                        className='nc-icon nc-time-alarm'
                      />
                    </h5>
                  </Badge>
                )}
                {/*
              <Badge color='primary'>
                Its your turn!
                <div className='icon-big text-center icon-success'>
                  <i className='nc-icon nc-spaceship' />
                </div>
              </Badge>
              */}
              </h6>
            </Col>
          </Row>
          <Row>
            <Col className='card-just-text'>
              There are <strong>{this.getPlaceInQueue()}</strong> people ahead
              of you
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default InQueueMini;
