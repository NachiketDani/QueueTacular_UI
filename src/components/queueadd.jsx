import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class QueueAdd extends Component {
  state = {  }
  render() { 
    return (
      <>
          <Button variant="primary">
            Join this queue!
          </Button>
      </>
    );
  }
}
 
export default QueueAdd;