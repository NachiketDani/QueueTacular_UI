import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import graphQLFetch from '../GraphQLFetch.js';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Form,
  Input,
  FormGroup,
} from 'reactstrap';

// import withToast from "./withToast";

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeSelection = this.onChangeSelection.bind(this);
    // this.loadOptions = this.loadOptions.bind(this);
    // this.loadData = this.loadData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickJoin = this.onClickJoin.bind(this);
  }

  state = {
    queueId: '',
    title: '',
    description: '',
    people_in_queue: [],
  };

  // componentDidMount() {
  //   this.loadData();
  // }

  // async loadData() {
  //   const queryForItems = `query {
  //     itemMany(filter:{
  //         status: Waiting,
  //         user: "${this.props.userId}",
  //     }) {
  //      _id
  //     }
  //   }`;

  //   const queryForQueue = `query queueById($queueId: MongoID!) {
  //     queueById(_id: $queueId) {
  //         title, description, items {
  //           user
  //         }
  //       }
  //   }`;

  //   const data = await graphQLFetch(queryForQueue, {
  //     queueId: this.state.queueId,
  //   });
  //   console.log(data);
  //   if (data) {
  //     this.setState({
  //       title: data.queueById.title,
  //       description: data.queueById.description,
  //       people_in_queue: data.queueById.items.length,
  //     });
  //   }
  // }

  async onSubmit(title) {
    const queryForQueue = `query {
      queueOne(filter:{
        title: "${title}"
      }) {
        title
        description
        _id
        items {
          user
        }
      }
    }`;

    const data = await graphQLFetch(queryForQueue);
    if (data && data.queueOne != null) {
      console.log(data);
      this.setState({
        queueId: data.queueOne._id,
        title: data.queueOne.title,
        description: data.queueOne.description,
        items: data.queueOne.items,
      });
    }
  }

  async onClickJoin() {}

  onChangeSelection() {}

  // async loadOptions() {
  //     if (term.length < 3) return [];
  //     const query = `query issueList($search: String) {
  //         issueList(search: $search) {
  //         issues {id title}
  //         }
  // }

  //   const { showError } = this.props;
  //   const data = await graphQLFetch(query, { search: term }, showError);
  //   return data.issueList.issues.map((issue) => ({
  //     label: `#${issue.id}: ${issue.title}`,
  //     value: issue.id,
  //   }));
  // }

  render() {
    return (
      <div className='content'>
        <h4>Join by Queue Title:</h4>
        {/*
        <AsyncSelect>
          loadOptions = {this.loadOptions}
          filterOption={() => true}
        </AsyncSelect>
        */}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input
              type='textarea'
              name='title'
              id='title'
              placeholder='Queue title'
            />
            <Button color='primary'>Find Queue!</Button>
          </FormGroup>
        </Form>
        <div>
          <Card body outline color='secondary'>
            <CardTitle>
              <h4>{this.state.title}</h4>
              <em>Queue-tacular ID:{this.state.queueId}</em>
            </CardTitle>
            <CardText>
              {this.state.description}
              <hr></hr>
              <ListGroup>
                <ListGroupItem>
                  People currently in Queue: {this.state.people_in_queue}
                </ListGroupItem>
                <ListGroupItem>Estimated wait time: 85 min</ListGroupItem>
              </ListGroup>
            </CardText>
            <div>
              <Button color='primary' onClick={this.onClickJoin}>
                Join Queue!
              </Button>{' '}
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Join;
