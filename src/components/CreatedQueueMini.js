import React from 'react';
// reactstrap components
import { Row, Col, Progress, Badge } from 'reactstrap';

class CreatedQueueMini extends React.Component {
  render() {
    const queueTitle = this.props.queue != null ? this.props.queue.title : '';
    console.log(this.props);
    return (
      <>
        <Row>
          <Col>
            <h6>{queueTitle}</h6>
          </Col>
        </Row>
        <Row>
          <Col sm='11'>
            <Progress multi>
              <Progress bar color='success' value='40' />
              <Progress bar animated color='new-blue' value='15' />
              <Progress bar color='info' value='15' />
              <Progress bar color='warning' value='15' />
              <Progress bar color='danger' value='15' />
            </Progress>
          </Col>
          <Col>
            <Badge color='success'>
              Active
              <div classname='icon-big text-center icon-warning'>
                <i className='nc-icon nc-bulb-63' />
              </div>
            </Badge>
          </Col>
        </Row>
        <Row>
          <Col>30 Participants enqueued.</Col>
        </Row>
      </>
    );
  }
}

export default CreatedQueueMini;
