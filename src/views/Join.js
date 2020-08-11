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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { timers } from 'jquery';

// import withToast from "./withToast";

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeSelection = this.onChangeSelection.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.queueUpItem = this.queueUpItem.bind(this);
    this.onClickJoin = this.onClickJoin.bind(this);

    this.state = {
      queueId: '',
      title: '',
      description: '',
      peopleInQueue: [],
      status: '',
      newItemId: '',
      newItemDescription: '',
      newItemStatus: '',
    };
  }

  // This method loads the selected option from loadOptions on the screen by setting the Join component state
  onChangeSelection({ value }) {
    // const { history } = this.props;
    // history.push('/edit/${value}');
    console.log(value);
    this.setState({
      queueId: value._id,
      title: value.title,
      description: value.description,
      peopleInQueue: value.items,
      status: value.status,
    });
    console.log(value);
  }

  // This method is created to create an item from user login props information to prepare to add to a queue
  async onClickJoin() {
    const query = `mutation { itemCreateOne(
      record:{
        status: Waiting
        user: "${this.props.userId}"
        description: "I need service, test add"
        }) {
        record{
          status
          user
          description
          _id
        }
        }
    }`;
    const itemAdd = await graphQLFetch(query);
    if (itemAdd && itemAdd.itemCreateOne != null) {
      console.log(itemAdd.itemCreateOne.record);
      this.setState({
        newItemId: itemAdd.itemCreateOne.record._id,
        newItemDescription: itemAdd.itemCreateOne.record.description,
        newItemStatus: itemAdd.itemCreateOne.record.status,
      });
    }
    // Get new items array ready to be inserted into the queue
    // const newItemArray = this.state.peopleInQueue; //CHANGED HERE
    // newItemArray.push({
    //   status: this.state.newItemStatus,
    //   _id: this.state.newItemId,
    //   description: this.state.newItemDescription,
    //   user: this.props.userId,
    // });
    // this.setState({ peopleInQueue: newItemArray });
    // console.log('New array', newItemArray);
    // const stringedArray = JSON.stringify(newItemArray);
    this.queueUpItem(itemAdd);
  }

  // This method is to add the created item data to the queue currently in state
  async queueUpItem(newItemArray) {
    const updateQueue = `mutation queueInsertOneItem {
      queuePushToItems (_id: "${this.state.queueId}",
      record: {
        _id: "${this.state.newItemId}",
        status: Waiting,
        user: "${this.props.userId}",
        description: "${this.state.newItemDescription}",
        wait: 30
    }) {
      description title items {
        status description _id
      }
    }
  }`;
    console.log(updateQueue);
    const data = await graphQLFetch(updateQueue);
    console.log(data);
  }

  // Load options for search: needs 2 callbacks: loadOptions and filterOptions
  // Each option is an object with a label and value: label is what user sees and value is the unique identifier
  async loadOptions(term) {
    if (term.length < 5) return [];
    const query = `query queueMany {
      queueMany(filter: {title: "${term}"}) {
        _id
        title
        description
        status
        items {
          user
          _id
          status
          description
        }
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
        <h4>Search your Queue by Title:</h4>
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
                  People currently in Queue: {this.state.peopleInQueue.length}
                </ListGroupItem>
              </ListGroup>
            </CardText>
            <div>
              <Button
                // disabled='true'
                disabled={
                  this.state.title.length < 1 || this.props.loggedIn === false
                }
                color='primary'
                onClick={this.onClickJoin}
              >
                Join Queue!
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Join;
