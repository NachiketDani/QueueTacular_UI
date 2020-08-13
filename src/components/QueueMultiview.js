import React from 'react';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  // CardFooter,
  CardTitle,
  Table,
} from 'reactstrap';

import InQueueMini from '../components/InQueueMini.js';

class QueueMultiview extends React.Component {
  createQueueViews() {
    const rows = [];
    let i;
    for (i = 0; i < this.props.queues.length; i++) {
      const inQueue = (
        <tr key={'row' + i}>
          <td key={'td' + i}>
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
              Please Login or click "Join" to join a Queue!
            </CardTitle>
          ) : (
            <CardTitle tag='h5'>Currently Waiting In:</CardTitle>
          )}
        </CardHeader>
        <CardBody>
          {this.props.queues.length === 0 ? (
            <h6>No joined queues to show!</h6>
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
