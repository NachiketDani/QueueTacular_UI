import React, { useState } from "react";
import { Collapse, Button, CardBody, Card, Row, Col } from "reactstrap";
import InQueueMini from "./InQueueMini.js";

const Example = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState("Closed");

  const onEntering = () => setStatus("Opening...");

  const onEntered = () => setStatus("Opened");

  const onExiting = () => setStatus("Closing...");

  const onExited = () => setStatus("Closed");

  const toggle = () => setCollapse(!collapse);

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
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
        <Row>
          <Col>
            <InQueueMini />
          </Col>
        </Row>
      </Collapse>
    </div>
  );
};

export default Example;
