import SelectAsync from 'react-select/lib/Async';
import graphQLFetch from '../GraphQLFetch.js';
import Login from '../components/Login.js';
import {
  Card,
  Row,
  Col,
  CardHeader,
  Button,
  CardTitle,
  CardBody,
  CardText,
  ListGroup,
  ListGroupItem,
  Alert,
  FormGroup,
  Label,
  Input,
  Form,
} from 'reactstrap';
import NotificationAlert from 'react-notification-alert';

// import withToast from "./withToast";

let optionSuccess = {
  place: 'bl',
  message: (
    <div>
      <div>Successfully joined queue!</div>
    </div>
  ),
  type: 'success',
  autoDismiss: 3,
};

let optionFailure = {
  place: 'bl',
  message: (
    <div>
      <div>You are already in the queue!</div>
    </div>
  ),
  type: 'danger',
  autoDismiss: 3,
};

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeSelection = this.onChangeSelection.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.queueUpItem = this.queueUpItem.bind(this);
    this.onClickJoin = this.onClickJoin.bind(this);
    this.submitSuccess = this.submitSuccess.bind(this);
    this.submitFailure = this.submitFailure.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      queueId: '',
      title: '',
      description: '',
      peopleInQueue: [],
      status: '',
      maxParticipants: 999,
      newItemId: '',
      newItemDescriptor: '',
      newItemStatus: '',
    };
  }

  // async handleSubmit() {
  //   this.onClickJoin();
  // }

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
      maxParticipants: value.maxParticipants,
    });
    console.log(value);
  }

  handleChange(event) {
    this.setState({ newItemDescriptor: event.target.value });
  }

  handleSubmit(event) {
    //alert('Queue joined!\n Description:' + this.state.newItemDescriptor);
    event.preventDefault();
  }

  // This method is created to create an item from user login props information to prepare to add to a queue
  async onClickJoin(event) {
    let userInArray = this.state.peopleInQueue.filter(
      (item) => item.user === this.props.userId
    );
    if (
      userInArray.length > 0 ||
      this.state.peopleInQueue === this.state.maxParticipants
    ) {
      console.log('Already in queue!');
      this.submitFailure();
      return;
    }

    const query = `mutation { itemCreateOne(
      record:{
        status: Waiting
        user: "${this.props.userId}"
        description: "${this.state.newItemDescriptor}"
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
        newItemDescriptor: itemAdd.itemCreateOne.record.description,
        newItemStatus: itemAdd.itemCreateOne.record.status,
      });
    }

    this.queueUpItem();
  }

  // This method is to add the created item data to the queue currently in state
  async queueUpItem() {
    const updateQueue = `mutation queueInsertOneItem {
      queuePushToItems (_id: "${this.state.queueId}",
      record: {
        _id: "${this.state.newItemId}",
        status: Waiting,
        user: "${this.props.userId}",
        description: "${this.state.newItemDescriptor}",
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
    if (data) {
      this.submitSuccess();
    } else {
      this.submitFailure();
    }
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
        maxParticipants
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

  submitSuccess() {
    this.refs.notify.notificationAlert(optionSuccess);
  }

  submitFailure() {
    this.refs.notify.notificationAlert(optionFailure);
  }

  render() {
    //return (
    let display =
      this.props.loggedIn === false ? (
        <>
          <div className='content'>
            <Row>
              <Col md='6'>
                <Card body inverse color='primary'>
                  <CardHeader>
                    <CardTitle tag='h5'>
                      Please login to create a queue
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Login onSignIn={this.props.onSignIn} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <div className='content'>
          <h4>Search your Queue by the exact title:</h4>
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
              <CardBody>
                <CardTitle>
                  <h4>{this.state.title}</h4>
                </CardTitle>
                <CardText>
                  {this.state.description}
                  <ListGroup>
                    <ListGroupItem>
                      {this.state.queueId !== ''
                        ? `People currently in Queue: ${this.state.peopleInQueue.length}`
                        : ''}
                    </ListGroupItem>
                  </ListGroup>
                </CardText>
                <div>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label>
                        Optional: A brief description for services required
                      </Label>
                      <Input
                        type='text'
                        value={this.state.newItemDescriptor}
                        onChange={this.handleChange}
                        placeholder='Text'
                      ></Input>
                    </FormGroup>
                    <Button
                      // disabled='true'
                      disabled={
                        this.state.title.length < 1 ||
                        this.props.loggedIn === false
                      }
                      color='primary'
                      onClick={this.onClickJoin}
                    >
                      Join Queue!
                    </Button>
                    <Alert
                      color='warning'
                      isOpen={this.props.loggedIn === false}
                    >
                      Please login to Queue-Tacular to join a queue!
                    </Alert>
                    <NotificationAlert ref='notify' />
                  </Form>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    return display;
  }
}

export default Join;
