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
} from "reactstrap";

import graphQLFetch from "../GraphQLFetch";

class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
    this.loadData.bind(this);
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

    const data = await graphQLFetch(query, { id: this.props.queueId });
    if (data) {
      console.log(data);
      this.setState({ title: data.showQueue.title });
    }
  }

  render() {
    // let title = this.loadData();
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5">{this.state.title}</CardTitle>
          <p className="card-just-text">
            You have an estimated 30 mins remaining in the queue.
          </p>
        </CardHeader>
        <CardBody>
          <div>
            <Row>
              <Col>
                <p className="card-just-text">Queue Progress</p>
              </Col>
            </Row>
            <Row>
              <Col xs="11">
                <Progress multi>
                  <Progress bar color="success" value="40" />
                  <Progress bar animated color="new-blue" value="15">
                    You Are Here
                  </Progress>
                  <Progress bar color="info" value="15" />
                  <Progress bar striped color="warning" value="15">
                    5 Min Warning
                  </Progress>
                  <Progress bar color="danger" value="15">
                    Almost Ready!
                  </Progress>
                </Progress>
              </Col>
              <i className="nc-icon nc-user-run" />
            </Row>
            <br />
            <Row>
              <Col className="card-just-text">
                In Queue - There are 10 peaple ahead of you!
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
