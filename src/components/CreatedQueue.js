import React from 'react';
import { Redirect } from 'react-router-dom';

import NotificationAlert from 'react-notification-alert';

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

let optionSuccessCompleted = {
  place: 'br',
  message: (
    <div>
      <div>'Successfully marked item as "Completed".'</div>
    </div>
  ),
  type: 'success',
  autoDismiss: 3,
};

let optionFailureCompleted = {
  place: 'br',
  message: (
    <div>
      <div>'Failed to mark item as "Completed".'</div>
    </div>
  ),
  type: 'danger',
  autoDismiss: 3,
};

let optionSuccessServed = {
  place: 'br',
  message: (
    <div>
      <div>'Successfully marked item as "Served".'</div>
    </div>
  ),
  type: 'success',
  autoDismiss: 3,
};

let optionFailureServed = {
  place: 'br',
  message: (
    <div>
      <div>'Failed to mark item as "Served".'</div>
    </div>
  ),
  type: 'danger',
  autoDismiss: 3,
};

class CreatedQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referrer: null,
    };
    this.markSuccessCompleted = this.markSuccessCompleted.bind(this);
    this.markFailureCompleted = this.markFailureCompleted.bind(this);
    this.markSuccessServed = this.markSuccessServed.bind(this);
    this.markFailureServed = this.markFailureServed.bind(this);
  }

  tryRedirect = () => {
    this.setState({ referrer: './edit' });
  };

  markSuccessCompleted() {
    this.refs.notify.notificationAlert(optionSuccessCompleted);
  }

  markFailureCompleted() {
    this.refs.notify.notificationAlert(optionFailureCompleted);
  }

  markSuccessServed() {
    this.refs.notify.notificationAlert(optionSuccessServed);
  }

  markFailureServed() {
    this.refs.notify.notificationAlert(optionFailureServed);
  }

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
                  <td>
                    <CardHeader tag='h5' style={{ verticalAlign: 'top' }}>
                      {this.props.title}
                    </CardHeader>
                  </td>
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
                      color='danger'
                      onClick={() => this.props.removeCreated()}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'right',
                        verticalAlign: 'top',
                      }}
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
                      {
                        this.props.items.filter(
                          (item) =>
                            item.status === 'Waiting' ||
                            item.status === 'Serving'
                        ).length
                      }
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
                    <CreatedQueueParticipantHover
                      createdUsers={this.props.createdUsers}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    Estimated end of queue current wait time is{' '}
                    <b>
                      {this.props.items == null
                        ? 0
                        : 5 *
                          this.props.items.filter(
                            (item) =>
                              item.status === 'Waiting' ||
                              item.status === 'Serving'
                          ).length}
                    </b>{' '}
                    minute(s).
                  </td>
                </tr>
                <tr>
                  {this.props.status === 'Open' ? (
                    <td>
                      <Badge color='success'>
                        <h5 style={{ marginLeft: 10, marginBottom: 0 }}>
                          Active{'  '}
                          <i
                            style={{ marginRight: 10 }}
                            className='nc-icon nc-bulb-63'
                          />
                        </h5>
                      </Badge>
                    </td>
                  ) : (
                    <td>
                      <Badge color='danger'>
                        <h5 style={{ marginLeft: 10, marginBottom: 0 }}>
                          Closed{'  '}
                          <i
                            style={{ marginRight: 10 }}
                            className='nc-icon nc-time-alarm'
                          />
                        </h5>
                      </Badge>
                    </td>
                  )}
                </tr>
              </tbody>
            </Table>
            <hr style={{ marginBottom: 0, marginTop: 0 }} />
          </CardBody>
          <CardFooter>
            <NotificationAlert ref='notify' />
            <div>
              <ExpandableTable
                {...this.props}
                items={this.props.items}
                onDelete={this.onDelete}
                serveUser={this.props.serveUser}
              />
            </div>
          </CardFooter>
        </Card>
      ) : null;
    return display;
  }
}

export default CreatedQueue;
