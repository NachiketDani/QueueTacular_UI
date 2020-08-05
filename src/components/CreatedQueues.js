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

import graphQLFetch from '../GraphQLFetch.js';
import CreatedQueueMini from './CreatedQueueMini.js';
import Expandable from './Expandable.js';

class CreatedQueues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queueHistory: [],
    };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    // this.loadData();
  }

  async loadData() {
    const queryForItems = `query {
      itemMany(filter:{
          status: Removed,
          user: "${this.props.userId}",
      }) {
       _id
      }
    }`;

    const queryForQueue = `query {
      queueMany(filter:{
        items:[{
          user: "${this.props.userId}",
          status: Waiting
        }]
      }) {
        title
      }
    }`;

    const data = await graphQLFetch(queryForItems);
    console.log(data);
    if (data.itemMany.length > 0) {
      const queueData = await graphQLFetch(queryForQueue);
      console.log(queueData);
      const queueHistory = [];
      queueData.queueMany.forEach((queue) => {
        queueHistory.push(queue);
      });
      this.setState({
        queueHistory,
      });
    }
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag='h5'>My Created Queues</CardTitle>
        </CardHeader>
        <CardBody>
          <Table hover>
            <tbody>
              <tr>
                <td>
                  <CreatedQueueMini queue={this.state.queueHistory[0]} />
                </td>
              </tr>
              <tr>
                <td>
                  <CreatedQueueMini queue={this.state.queueHistory[1]} />
                </td>
              </tr>
            </tbody>
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
