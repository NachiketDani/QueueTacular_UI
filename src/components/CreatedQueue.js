import React from 'react';
import { Redirect } from 'react-router-dom';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Button,
  Table,
} from 'reactstrap';

import CreatedQueueParticipantHover from './CreatedQueueParticipantHover';
import ExpandableTable from './ExpandableTable';

class CreatedQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referrer: null,
    };
  }

  onDelete = (newItems, i) => {
    // const items = newItems.filter((p) => p.item.id !== i);
    // this.setState({ items });
  };

  tryRedirect = () => {
    console.log('clicky clicky!');
    this.setState({ referrer: './edit' });
  };

  render() {
    const { referrer } = this.state;
    if (referrer)
      return (
        <Redirect
          to={{
            pathname: referrer,
            state: { id: '123' },
          }}
        />
      );

    return (
      <Card>
        <CardBody>
          <Table style={{ marginBottom: 0 }} size='sm' borderless>
            <tbody>
              <tr style={{ marginTop: 0, marginBottom: 0 }}>
                <td
                  style={{ marginTop: 0, marginBottom: 0, textAlign: 'right' }}
                >
                  <Button
                    onClick={this.tryRedirect}
                    style={{ marginRight: 10 }}
                  >
                    <i
                      style={{ marginRight: 10 }}
                      className='nc-icon nc-settings-gear-65'
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
              <tr>
                <td style={{ marginTop: 0, marginBottom: 0 }}>
                  <h5
                    style={{
                      verticalAlign: 'top',
                      textAlign: 'left',
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    {this.props.title}
                  </h5>
                </td>
              </tr>
            </tbody>
          </Table>
          <hr style={{ marginTop: 0 }} />
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
                  <CreatedQueueParticipantHover items={this.props.items} />
                </td>
              </tr>
              <tr>
                <td>
                  Estimated end of queue current wait time is <b>15</b> minutes.
                </td>
              </tr>
              <tr>
                <td>
                  {this.props.status === 'Open' ? (
                    <Badge color='success'>
                      <div style={{ marginLeft: 10, marginBottom: 0 }}>
                        Active.
                        <i
                          style={{ marginRight: 10 }}
                          className='nc-icon nc-bulb-63'
                        />
                      </div>
                    </Badge>
                  ) : (
                    <Badge color='danger'>
                      <div style={{ marginLeft: 10, marginBottom: 0 }}>
                        Closed
                        <i
                          style={{ marginRight: 10 }}
                          className='nc-icon nc-time-alarm'
                        />
                      </div>
                    </Badge>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
          <hr style={{ marginBottom: 0, marginTop: 0 }} />
        </CardBody>
        <CardFooter>
          <div>
            <ExpandableTable {...this.props} onDelete={this.onDelete} />
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
