import React from 'react';
// reactstrap components
import { Row, Col, Progress, Badge } from 'reactstrap';

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
                <Progress multi>
                  <Progress bar color='success' value='40' />
                  <Progress bar animated color='new-blue' value='15' />
                  <Progress bar color='info' value='15' />
                  <Progress bar color='warning' value='15' />
                  <Progress bar color='danger' value='15' />
                </Progress>
              </Col>
              <Col>
                {this.props.status === 'Open' ? (
                  <Badge color='success'>
                    {this.props.status}
                    <div classname='icon-big text-center icon-warning'>
                      <i className='nc-icon nc-bulb-63' />
                    </div>
                  </Badge>
                ) : (
                  <Badge color='danger'>
                    {this.props.status}
                    <div classname='icon-big text-center icon-warning'>
                      <i className='nc-icon nc-time-alarm' />
                    </div>
                  </Badge>
                )}
              </Col>
            </Row>
            <Row>
              <Col>{this.props.items.length} Participants enqueued.</Col>
            </Row>
          </td>
        </tr>
      </>
    );
  }
}

export default CreatedQueueMini;
