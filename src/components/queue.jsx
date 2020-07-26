import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import graphQLFetch from '../GraphQLFetch';

import QueueAdd from './queueadd';

/*
function QueueItem({ item }) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
    </tr>
  );
}
*/

class Queue extends Component {

  constructor() {
    super();
    this.state = {
      id: 2,
      title: '',
      description: '',
      queueItems: []
    }

    this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {

    const query = `query showQueue(
      $id: Int!
    ) {
      showQueue(
        id: $id
      ) {
        title description
        items {
          name
        }
      }
    }`;

    const data = await graphQLFetch(query, {'id': this.state.id});
    if (data) {
      this.setState({
        title: data.showQueue.title,
        description: data.showQueue.description,
        queueItems: data.showQueue.queueItems
      });
      console.log(this.state.title);
    }
  }

  render() {
    return (
      <>
        <h2>{this.state.title}</h2>
        <h3>{this.state.description}</h3>
        <Table bordered condensed>
          <thead>
              <tr>
                <th>Number</th>
                  <th>Name</th>
              </tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
        <QueueAdd />
      </>
    );
  }
}

export default Queue;