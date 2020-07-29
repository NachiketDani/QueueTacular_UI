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
import graphQLFetch from "../GraphQLFetch";

class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queueID: "5f210d29cbf9a1561cd58d2e",
    };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    console.log("Hello\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    this.loadData();
  }

  async loadData() {
    const query = `query showQueueById( $_id: MongoID! ) {
      queueById ( _id: $_id )
      {
        title description
      }
    }`;

    const data = await graphQLFetch(query, { _id: this.state.queueID });
    if (data) {
      console.log(data);
      return data;
    }
  }

  render() {
    const data = this.loadData();
    console.log(data);
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5">{data.title}</CardTitle>
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
                  <div className="icon-big text-center icon-warning">
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
