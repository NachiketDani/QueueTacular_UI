import React, { Component } from 'react';
import SelectAsync from 'react-select/lib/Async';
import graphQLFetch from '../GraphQLFetch.js';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

// import withToast from "./withToast";

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeSelection = this.onChangeSelection.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.loadData = this.loadData.bind(this);
    // this.changeState = this.changeState.bind(this);
  }

  state = {
    //queueId: '5f2a5c5f5e1e5314e0be64e8',
    queueId: '',
    title: '',
    description: '',
    people_in_queue: [],
  };

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

    const queryForQueue = `query{ queueOne(
      filter:{
        title: "Doctor's visit"
      }) 
      {
        title, description, items {
          user
          }
        }
    }`;

    const data = await graphQLFetch(queryForQueue);
    //console.log(data);
    if (data && data.queueOne != null) {
      this.setState({
        title: data.queueOne.title,
        description: data.queueOne.description,
        people_in_queue: data.queueOne.items.length,
      });
    }
  }

  onChangeSelection({ value }) {
    // const { history } = this.props;
    // history.push('/edit/${value}');
    console.log(value);
    this.setState({
      queueId: value.queueId,
      title: value.title,
      description: value.description,
      people_in_queue: value.items.length,
    });
    console.log(value);
  }

  // Load options for search: needs 2 callbacks: loadOptions and filterOptions
  // Each option is an object with a label and value: label is what user sees and value is the unique identifier
  async loadOptions(term) {
    if (term.length < 5) return [];
    const query = `query queueMany {
      queueMany(filter: {title: "${term}"}) {
        title
        description
        items {user}
      }
  }`;
    //const { showError } = this.props;
    const data = await graphQLFetch(query, { search: term });
    console.log(data);
    return data.queueMany.map((queue) => ({
      label: queue.title,
      value: queue,
    }));
  }

  render() {
    return (
      <div className='content'>
        <h4>Join by Queue-tacular ID:</h4>
        <SelectAsync
          instanceId='search-select'
          value=''
          loadOptions={this.loadOptions}
          filterOption={() => true}
          onChange={this.onChangeSelection}
          components={{ DropdownIndicator: null }}
        />
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
                <ListGroupItem>Estimated wait time: </ListGroupItem>
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
