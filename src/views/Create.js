import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

import graphQLFetch from '../GraphQLFetch.js';
import NotificationAlert from 'react-notification-alert';

let optionSuccess = {
  place: 'br',
  message: (
    <div>
      <div>'Successfully created queue.'</div>
    </div>
  ),
  type: 'success',
  autoDismiss: 3,
};

let optionFailure = {
  place: 'br',
  message: (
    <div>
      <div>'Failed to create queue.'</div>
    </div>
  ),
  type: 'danger',
  autoDismiss: 3,
};

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      participant: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSuccess = this.submitSuccess.bind(this);
    this.submitFailure = this.submitFailure.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {
      title,
      description,
      participant,
      startDate,
      startTime,
      endDate,
      endTime,
    } = this.state;
    const start = new Date(startDate + 'T' + startTime).toISOString();
    const end = new Date(endDate + 'T' + endTime).toISOString();
    const record = {
      title: title,
      status: 'Open',
      owner: this.props.userId,
      description: description,
      maxParticipants: parseFloat(participant),
      startDate: start,
      endDate: end,
    };
    const mutationForQueue = `mutation queueCreateOne($record: CreateOneQueueInput!) {
      queueCreateOne(record: $record) {
        recordId
      }
    }`;

    const data = await graphQLFetch(mutationForQueue, { record });
    if (data) {
      console.log(data.queueCreateOne.recordId);
      this.submitSuccess();
    } else {
      // Failure doesn't trigger right now because of compiler error
      this.submitFailure();
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  submitSuccess() {
    this.refs.notify.notificationAlert(optionSuccess);
  }

  submitFailure() {
    this.refs.notify.notificationAlert(optionFailure);
  }

  render() {
    return (
      <div className='content'>
        <Row>
          <Col md='12'>
            <Card>
              <CardHeader>Create a Queue</CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                  <FormGroup>
                    <Label for='title' className='mt-2'>
                      Title
                    </Label>
                    <Input
                      className='mt-2'
                      defaultValue={this.state.title}
                      type='text'
                      id='title'
                      placeholder='Text'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='description' className='mt-2'>
                      Description
                    </Label>
                    <Input
                      className='mt-2'
                      defaultValue={this.state.description}
                      type='textarea'
                      id='description'
                      placeholder='Text'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='participant' className='mt-2'>
                      Maximum Participant
                    </Label>
                    <InputGroup>
                      <Input
                        className='mt-2'
                        defaultValue={this.state.participant}
                        min={0}
                        type='number'
                        step='1'
                        id='participant'
                        placeholder='Number'
                      />
                      <InputGroupAddon className='mt-2' addonType='append'>
                        person(s)
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Label for='startDate' className='mt-2'>
                          Start Date
                        </Label>
                      </Col>
                      <Col>
                        <Label for='startTime' className='mt-2'>
                          Start Time
                        </Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <InputGroup>
                          <Input
                            className='border-left border-right mt-2'
                            defaultValue={this.state.startDate}
                            type='date'
                            id='startDate'
                            placeholder='date placeholder'
                          />
                        </InputGroup>
                      </Col>
                      <Col>
                        <InputGroup>
                          <Input
                            className='border-left border-right mt-2'
                            defaultValue={this.state.startTime}
                            type='time'
                            id='startTime'
                            placeholder='time placeholder'
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Label for='endDate' className='mt-2'>
                          End Date
                        </Label>
                      </Col>
                      <Col>
                        <Label for='endTime' className='mt-2'>
                          End Time
                        </Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <InputGroup>
                          <Input
                            className='border-left border-right mt-2'
                            defaultValue={this.state.endDate}
                            type='date'
                            id='endDate'
                            placeholder='date placeholder'
                          />
                        </InputGroup>
                      </Col>
                      <Col>
                        <InputGroup>
                          <Input
                            className='border-left border-right mt-2'
                            defaultValue={this.state.endTime}
                            type='time'
                            id='endTime'
                            placeholder='time placeholder'
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <CardFooter>
                      <NotificationAlert ref='notify' />
                      <Button color='primary'>Submit</Button>
                    </CardFooter>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Create;
