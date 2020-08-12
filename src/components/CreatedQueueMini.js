import React from 'react';
// reactstrap components
import { Row, Col, Progress, Badge } from 'reactstrap';

import CreatedQueueParticipantHover from './CreatedQueueParticipantHover';

class CreatedQueueMini extends React.Component {
  render() {
    const queueTitle =
      this.props.title != null ? this.props.title : 'Title is missing';
    return (
      <>
        <tr
          onClick={() => this.props.showCreated(this.props.showId)}
          style={{ cursor: 'pointer' }}
        >
          <td>
            <Row>
              <Col>
                <h6>{queueTitle}</h6>
              </Col>
            </Row>
            <Row>
              <Col sm='11'>
                <CreatedQueueParticipantHover items={this.props.items} />
              </Col>
              <Col>
                {this.props.status === 'Open' ? (
                  <Badge color='success'>
                    {this.props.status}
                    <div className='icon-big text-center icon-warning'>
                      <i className='nc-icon nc-bulb-63' />
                    </div>
                  </Badge>
                ) : (
                  <Badge color='danger'>
                    {this.props.status}
                    <div className='icon-big text-center icon-warning'>
                      <i className='nc-icon nc-time-alarm' />
                    </div>
                  </Badge>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {
                  this.props.items.filter(
                    (item) =>
                      item.status === 'Waiting' || item.status === 'Serving'
                  ).length
                }{' '}
                Participants enqueued.
              </Col>
            </Row>
          </td>
        </tr>
      </>
    );
  }
}

export default CreatedQueueMini;
