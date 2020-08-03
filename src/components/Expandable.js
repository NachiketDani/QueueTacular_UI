import React, { useState } from "react";
import { Collapse, Button, CardBody, Card, Row, Col, Table } from "reactstrap";
import InQueueMini from "./InQueueMini.js";

const Expandable = (props) => {
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
        <Table hover>
          <tbody>
            <tr>
              <td>
                <InQueueMini />
              </td>
            </tr>
            <tr>
              <td>
                <InQueueMini />
              </td>
            </tr>
          </tbody>
        </Table>
      </Collapse>
    </div>
  );
};

export default Expandable;
