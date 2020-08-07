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
  Button,
  Table,
  Tooltip,
} from 'reactstrap';

import CreatedQueueParticipantHover from './CreatedQueueParticipantHover';
import ExpandableTable from './ExpandableTable';

class CreatedQueue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardBody>
          <Table style={{ marginBottom: 0 }} size='sm' borderless>
            <tbody>
              <tr>
                <CardHeader tag='h5' style={{ verticalAlign: 'top' }}>
                  {this.props.title}
                </CardHeader>
                <td style={{ textAlign: 'right' }}>
                  <Button style={{ marginRight: 10 }}>
                    <i
                      style={{ marginRight: 10 }}
                      className='nc-icon nc-settings-gear-65'
                      onClick={this.try}
                    />
                    Edit
                  </Button>
                  <Badge
                    style={{ textAlign: 'right', verticalAlign: 'top' }}
                    color='danger'
                    onClick={() => this.props.removeCreated()}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className='nc-icon nc-simple-remove' />
                  </Badge>
                </td>
              </tr>
            </tbody>
          </Table>
          <hr />
          <Table style={{ marginBottom: 0 }} size='sm' borderless responsive>
            <tbody>
              <tr>
                <td>{this.props.description}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    {this.props.status === 'Open' ? this.props.items.length : 0}
                  </b>{' '}
                  participant(s) currently waiting.
                </td>
              </tr>
              <tr>
                <td>
                  Queue is capped at <b>{this.props.maxParticipants}</b>{' '}
                  participant(s).
                </td>
              </tr>
              <tr>
                <td>
                  <CreatedQueueParticipantHover />
                </td>
              </tr>
              <tr>
                <td>
                  Estimated end of queue current wait time is <b>15</b> minutes.
                </td>
              </tr>
              <td>
                <Badge color='success'>
                  <h5 style={{ marginLeft: 10, marginBottom: 0 }}>
                    Active.
                    <i
                      style={{ marginRight: 10 }}
                      className='nc-icon nc-bulb-63'
                    />
                  </h5>
                </Badge>
              </td>
            </tbody>
          </Table>
          <hr style={{ marginBottom: 0, marginTop: 0 }} />
        </CardBody>
        <CardFooter>
          <div>
            <ExpandableTable {...this.props} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <i className='fa fa-history' /> Updated 3 mins ago
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default CreatedQueue;
