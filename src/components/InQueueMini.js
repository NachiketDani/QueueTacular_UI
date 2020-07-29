import React from "react";
// reactstrap components
import { Row, Col, Progress, Badge } from "reactstrap";

class InQueueMini extends React.Component {
  render() {
    return (
      <>
        <Row>
          <Col>
            <h6>A Queue Name</h6>
          </Col>
        </Row>
        <Row>
          <Col sm="11">
            <Progress multi>
              <Progress bar color="success" value="40" />
              <Progress bar animated color="new-blue" value="15" />
              <Progress bar color="info" value="15" />
              <Progress bar color="warning" value="15" />
              <Progress bar color="danger" value="15" />
            </Progress>
          </Col>
          <Col>
            <Badge color="danger">
              Closed
              <div classname="icon-big text-center icon-warning">
                <i className="nc-icon nc-simple-remove" />
              </div>
            </Badge>
          </Col>
        </Row>
      </>
    );
  }
}

export default InQueueMini;
