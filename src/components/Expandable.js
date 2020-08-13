import React, { useState } from 'react';
import { Collapse, Button, Table } from 'reactstrap';

const Expandable = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState('Closed');

  const onEntering = () => setStatus('Opening...');

  const onEntered = () => setStatus('Opened');

  const onExiting = () => setStatus('Closing...');

  const onExited = () => setStatus('Closed');

  const toggle = () => setCollapse(!collapse);

  return (
    <div>
      <Button color='primary' onClick={toggle} style={{ marginBottom: '1rem' }}>
        Expand
      </Button>
      {/* <h5>Current state: {status}</h5> */}
      <Collapse
        isOpen={collapse}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      >
        {props.createdQueues.length < 3 ? (
          <h6>No created Queues to show!</h6>
        ) : (
          <Table hover>
            <tbody>
              {props.restOfQueues(props.createdQueues, props.showCreated)}
            </tbody>
          </Table>
        )}
      </Collapse>
    </div>
  );
};

export default Expandable;
