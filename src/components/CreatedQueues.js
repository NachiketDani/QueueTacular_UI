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

import CreatedQueueMini from './CreatedQueueMini.js';
import Expandable from './Expandable.js';
import CreatedQueue from './CreatedQueue.js';

class CreatedQueues extends React.Component {
  constructor(props) {
    super(props);
  }

  createCreatedQueueMini() {
    const rows = [];
    let i;
    for (i = 0; i < this.props.createdQueues.length; i++) {
      const queueMini = (
        <CreatedQueueMini
          {...this.props.createdQueues[i]}
          showId={i}
          showCreated={this.props.showCreated}
        />
      );
      rows.push(queueMini);
    }
    return rows;
  }

  render() {
    return (
      <Card>
        <CardHeader>
          {this.props.createdQueues.length === 0 ? (
            <CardTitle tag='h5'>
              Please Login or click "Create" to create a Queue!
            </CardTitle>
          ) : (
            <CardTitle tag='h5'>My Created Queues:</CardTitle>
          )}
        </CardHeader>
        <CardBody>
          {this.props.createdQueues.length === 0 ? (
            <h6>No created Queues to show!</h6>
          ) : (
            <Table hover>
              <tbody>{this.createCreatedQueueMini()}</tbody>
            </Table>
          )}
        </CardBody>
        {this.props.createdQueues.length === 0 ? null : (
          <CardFooter>
            <Expandable {...this.props} />
          </CardFooter>
        )}
      </Card>
    );
  }
}

export default CreatedQueues;
