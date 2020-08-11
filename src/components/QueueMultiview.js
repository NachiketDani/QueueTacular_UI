import React from 'react';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table,
} from 'reactstrap';

import InQueueMini from '../components/InQueueMini.js';
import InQueue from '../components/InQueue.js';
import graphQLFetch from '../GraphQLFetch.js';
import Expandable from './Expandable.js';

class QueueMultiview extends React.Component {
  constructor(props) {
    super(props);
  }

  createQueueViews() {
    const rows = [];
    let i;
    for (i = 0; i < this.props.queues.length; i++) {
      const inQueue = (
        <tr>
          <td>
            <InQueueMini
              {...this.props.queues[i]}
              userId={this.props.userId}
              queueId={i}
              key={'Q' + i.toString()}
              showQueueDetail={this.props.showQueueDetail}
            />
          </td>
        </tr>
      );
      rows.push(inQueue);
    }
    return rows;
  }

  render() {
    return (
      <Card>
        <CardHeader>
          {this.props.queues.length === 0 ? (
            <CardTitle tag='h5'>
              You are not waiting in any queues. Click login to join a Queue!
            </CardTitle>
          ) : (
            <CardTitle tag='h5'>Currently Waiting In:</CardTitle>
          )}
        </CardHeader>
        <CardBody>
          {this.props.queues.length === 0 ? (
            <h6>No queues to show!</h6>
          ) : (
            <Table hover>
              <tbody>{this.createQueueViews()}</tbody>
            </Table>
          )}
        </CardBody>
        {/*
        <CardFooter>
          <Expandable />
        </CardFooter>
        */}
      </Card>
    );
  }
}

export default QueueMultiview;
