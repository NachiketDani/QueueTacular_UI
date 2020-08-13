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
  constructor(props) {
    super(props);
    this.createCreatedQueueMiniTop = this.createCreatedQueueMiniTop.bind(this);
    this.restOfQueues = this.restOfQueues.bind(this);
  }
  createCreatedQueueMiniTop() {
    const rows = [];
    let i;
    let upper;
    this.props.createdQueues.length < 2
      ? (upper = this.props.createdQueues.length)
      : (upper = 2);
    for (i = 0; i < upper; i++) {
      const queueMini = (
        <CreatedQueueMini
          {...this.props.createdQueues[i]}
          showId={i}
          key={i.toString()}
          showCreated={this.props.showCreated}
          createdUsers={this.props.createdUsers[i]}
        />
      );
      rows.push(queueMini);
    }
    return rows;
  }

  restOfQueues(createdQueues, showCreated) {
    const rows = [];
    let i;
    for (i = 2; i < createdQueues.length; i++) {
      const queueMini = (
        <CreatedQueueMini
          {...createdQueues[i]}
          showId={i}
          key={i.toString()}
          showCreated={showCreated}
          createdUsers={this.props.createdUsers[i]}
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
        {this.props.createdQueues.length < 2 ? null : (
          <CardFooter>
            <Expandable {...this.props} restOfQueues={this.restOfQueues} />
          </CardFooter>
        )}
      </Card>
    );
  }
}

export default CreatedQueues;
