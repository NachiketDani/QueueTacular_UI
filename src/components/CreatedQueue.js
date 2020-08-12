import React from 'react';
import { Redirect } from 'react-router-dom';

// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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

  onDelete = (item) => {
    // console.log('this works?');
    // const items = this.state.items.filter((c) => c.item !== item);
    // this.setState({ items });
  };

  tryRedirect = () => {
    this.setState({ referrer: './edit' });
  };

  render() {
    const { referrer } = this.state;
    if (referrer)
      return (
        <Redirect
          to={{
            pathname: referrer,
            state: {
              id: this.props._id,
              title: this.props.title,
              description: this.props.description,
              maxParticipants: this.props.maxParticipants,
              startDate: this.props.startDate,
              endDate: this.props.endDate,
            },
          }}
        />
      );

    let display =
      this.props.loggedIn === true && this.props.items != null ? (
        <Card>
          <CardBody>
            <Table style={{ marginBottom: 0 }} size='sm' borderless>
              <tbody>
                <tr>
                  <CardHeader tag='h5' style={{ verticalAlign: 'top' }}>
                    {this.props.title}
                  </CardHeader>
                  <td style={{ textAlign: 'right' }}>
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
                      {this.props.status === 'Open'
                        ? this.props.items.length
                        : 0}
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
                    Estimated end of queue current wait time is <b>15</b>{' '}
                    minutes.
                  </td>
                </tr>
                <td>
                  {this.props.status === 'Open' ? (
                    <Badge color='success'>
<<<<<<< HEAD
                      <div style={{ marginLeft: 10, marginBottom: 0 }}>
                        Active.{'  '}
=======
                      <h5 style={{ marginLeft: 10, marginBottom: 0 }}>
                        Active{'  '}
>>>>>>> master
                        <i
                          style={{ marginRight: 10 }}
                          className='nc-icon nc-bulb-63'
                        />
                      </h5>
                    </Badge>
                  ) : (
                    <Badge color='danger'>
<<<<<<< HEAD
                      <div style={{ marginLeft: 10, marginBottom: 0 }}>
=======
                      <h5 style={{ marginLeft: 10, marginBottom: 0 }}>
>>>>>>> master
                        Closed{'  '}
                        <i
                          style={{ marginRight: 10 }}
                          className='nc-icon nc-time-alarm'
                        />
                      </h5>
                    </Badge>
                  )}
                </td>
              </tbody>
            </Table>
            <hr style={{ marginBottom: 0, marginTop: 0 }} />
          </CardBody>
          <CardFooter>
            <div>
              <ExpandableTable
                {...this.props}
                items={this.props.items}
                onDelete={this.onDelete}
              />
            </div>
          </CardFooter>
        </Card>
      ) : null;
    return display;
  }
}

export default CreatedQueue;
