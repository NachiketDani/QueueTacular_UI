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
} from "reactstrap";

class Queue extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Zack's Queue Name Here</CardTitle>
          <hr />
          <div className="card-just-text">
            You have an estimated 30 mins remaining in the queue.
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <Row>
              <Col>
                <h6 className="card-just-text">Queue Progress</h6>
              </Col>
            </Row>
            <Row>
              <Col sm="11">
                <Progress multi>
                  <Progress bar color="success" value="40" />
                  <Progress bar animated color="new-blue" value="15">
                    You Are Here
                  </Progress>
                  <Progress bar color="info" value="15" />
                  <Progress bar color="warning" value="15">
                    5 Min Warning
                  </Progress>
                  <Progress bar color="danger" value="15">
                    Almost Ready!
                  </Progress>
                </Progress>
              </Col>
              <Col>
                <Badge color="danger">
                  Wait.
                  <div classname="icon-big text-center icon-warning">
                    <i className="nc-icon nc-simple-remove" />
                  </div>
                </Badge>
              </Col>
            </Row>
            <Row>
              <Col className="card-just-text">
                In Queue - There are 10 people ahead of you!
              </Col>
            </Row>
          </div>
        </CardBody>
        <CardFooter>
          <hr />
          <div className="stats">
            <i className="fa fa-history" /> Updated 3 mins ago
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default Queue;
