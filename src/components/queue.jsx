import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import QueueAdd from './queueadd';

class Queue extends Component {
  state = {
    title: "Ellie's Office Hours"
  }
  render() {
    return (
      <>
        <h2>{this.state.title}</h2>
        <Table bordered condensed>
          <thead>
              <tr>
                <th>Number</th>
                  <th>Name</th>
              </tr>
          </thead>
          <tbody>
            <td>
              1
            </td>
              <td>
                Person A
              </td>
          </tbody>
        </Table>
        <QueueAdd />
      </>
    );
  }
}

export default Queue;