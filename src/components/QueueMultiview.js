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

  componentDidMount() {
    // this.loadData();
  }

  createQueueViews() {
    const rows = [];
    let i;
    for (i = 0; i < this.props.queues.length; i++) {
      const inQueue = (
        <tr>
          <td>
            <InQueue queue={this.props.queues[i]} userId={this.props.userId} />
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
          <CardTitle tag='h5'>My Queues</CardTitle>
        </CardHeader>
        <CardBody>
          <Table hover>
            <tbody>{this.createQueueViews()}</tbody>
          </Table>
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
