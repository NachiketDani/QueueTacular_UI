import React, { Component } from "react";
import AsyncSelect from "react-select/lib/Async";
import graphQLFetch from "../GraphQLFetch.js";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
// import withToast from "./withToast";

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeSelection = this.onChangeSelection.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const queryForItems = `query {
      itemMany(filter:{
          status: Waiting,
          user: "${this.props.userId}",
      }) {
       _id
      }
    }`;

    const queryForQueue = `query {
      queueOne(filter:{
        items:[{
          user: "${this.props.userId}",
          status: Waiting
        }]
      }) {
        title
      }
    }`;

    const data = await graphQLFetch(queryForItems);
    if (data.itemMany.length > 0) {
      const queueData = await graphQLFetch(queryForQueue);
      this.setState({
        title: queueData.queueOne.title,
        description: queueData.queueOne.description,
      });
    }
  }

  onChangeSelection() {}

  async loadOptions() {
    //   if (term.length < 3) return [];
    //   const query = `query issueList($search: String) {
    //       issueList(search: $search) {
    //       issues {id title}
    //       }
  }

  //   const { showError } = this.props;
  //   const data = await graphQLFetch(query, { search: term }, showError);
  //   return data.issueList.issues.map((issue) => ({
  //     label: `#${issue.id}: ${issue.title}`,
  //     value: issue.id,
  //   }));
  // }

  render() {
    return (
      <div className="content">
        <h4>Join by Queue-tacular ID:</h4>
        <AsyncSelect>
          loadOptions = {this.loadOptions}
          filterOption={() => true}
        </AsyncSelect>
        <div>
          <Card body outline color="secondary">
            <CardTitle>
              <h4>Larry's shared washing machine</h4>
            </CardTitle>
            <CardText>
              Hey guys! Queue up using this tool - its awesome!. Please bring
              your own detergent. Clear our all your belongings after use and
              make sure to be courteous to others! Cheers..I love this Washing
              Machine
              <hr></hr>
              <ListGroup>
                <ListGroupItem>People currently in Queue: 2</ListGroupItem>
                <ListGroupItem>Estimated wait time: 85 min</ListGroupItem>
              </ListGroup>
            </CardText>
            <div>
              <Button>Join Queue!</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Join;
