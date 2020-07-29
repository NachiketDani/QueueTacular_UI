import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Progress,
  Badge,
  Container,
  Button,
  Collapse,
} from "reactstrap";

import InQueueMini from "../components/InQueueMini.js";
import Example from "../components/Example.js";

class QueueMultiview extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5">My Queue History</CardTitle>
          <hr />
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <InQueueMini />
            </Col>
          </Row>
          <br />
          <hr />
          <br />
          <Row>
            <Col>
              <InQueueMini />
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <hr />
          <Example />
        </CardFooter>
      </Card>
    );
  }
}

export default QueueMultiview;
