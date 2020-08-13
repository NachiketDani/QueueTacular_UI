import React from 'react';
import { Row, Col, Progress, Badge } from 'reactstrap';

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
            <Col sm='11'>
              <Progress multi>{this.getProgressViews()}</Progress>
            </Col>
            <Col>
              {this.props.items[this.getPlaceInQueue()].status === 'Waiting' ? (
                <Badge color='warning'>
                  Waiting
                  <div className='icon-big text-center icon-warning'>
                    <i className='nc-icon nc-time-alarm' />
                  </div>
                </Badge>
              ) : (
                <Badge color='primary'>
                  Its your turn!
                  <div className='icon-big text-center icon-success'>
                    <i className='nc-icon nc-spaceship' />
                  </div>
                </Badge>
              )}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default InQueueMini;
