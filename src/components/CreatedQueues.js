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

class CreatedQueues extends React.Component {
  createCreatedQueueMiniTop() {
    const rows = [];
    let i;
    for (i = 0; i < 2; i++) {
      const queueMini = (
        <CreatedQueueMini
          {...this.props.createdQueues[i]}
          showId={i}
          key={i.toString()}
          showCreated={this.props.showCreated}
        />
      );
      rows.push(queueMini);
    }
    return rows;
  }

  restOfQueues() {
    console.log('rest of queues');
    console.log(this.props);
    if (this.props.createdQueues.length > 2) {
      return null;
    }
    const rows = [];
    let i;
    for (i = 2; i < this.props.createdQueues.length; i++) {
      const queueMini = (
        <CreatedQueueMini
          {...this.props.createdQueues[i]}
          showId={i}
          key={i.toString()}
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
              <tbody>{this.createCreatedQueueMiniTop()}</tbody>
            </Table>
          )}
        </CardBody>
        {this.props.createdQueues.length === 0 ? null : (
          <CardFooter>
            <Expandable {...this.props} restOfQueues={this.restOfQueues} />
          </CardFooter>
        )}
      </Card>
    );
  }
}

export default CreatedQueues;
