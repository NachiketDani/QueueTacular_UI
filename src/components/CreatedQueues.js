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
          <CardTitle tag='h5'>My Created Queues</CardTitle>
        </CardHeader>
        <CardBody>
          <Table hover>
            <tbody>{this.createCreatedQueueMini()}</tbody>
          </Table>
        </CardBody>
        <CardFooter>
          <Expandable />
        </CardFooter>
      </Card>
    );
  }
}

export default CreatedQueues;
