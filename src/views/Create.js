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

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      participant: 0,
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {title, description, participant, startDate, startTime, endDate, endTime} = this.state;
    const mutationForQueue = `mutation CreateOneQueue {
      queueCreateOne(record:{
          title: ${title}
          owner: "${this.props.userId}"
          description: ${description}
          maxParticipants: ${participant}
          startDate: ${startDate + "T" + startTime}
          endDate: ${endDate + "T" + endTime}
      }) {
       recordId
      }
    }`;

    const data = await graphQLFetch(mutationForQueue);
    alert(data);
    if (data) {
      
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value});
  }

  render() {
    return (
      <div className='content'>
        <Row>
          <Col md='12'>
            <Card>
              <CardHeader>Create a Queue</CardHeader>
              <CardBody>
                <Form 
                  onSubmit={this.handleSubmit}
                  onChange={this.handleChange}
                >
                  <FormGroup>
                    <Label for='title' className='mt-2'>Title</Label>
                    <Input
                      className='mt-2'
                      defaultValue={this.state.title}
                      type='text'
                      id='title'
                      placeholder='Text'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='description' className='mt-2'>Description</Label>
                    <Input
                      className='mt-2'
                      defaultValue={this.state.description}
                      type="textarea"
                      id="description" 
                      placeholder="Text"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='participant' className='mt-2'>Maximum Participant</Label>
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
                      <InputGroupAddon
                        className='mt-2'
                        addonType='append'>
                        persons
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Label for="startDate" className='mt-2'>Start Date</Label>
                      </Col>
                      <Col>
                        <Label for="startTime" className='mt-2'>Start Time</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <InputGroup>
                          <Input
                            className='border-left border-right mt-2'
                            defaultValue={this.state.startDate}
                            type="date"
                            id="startDate"
                            placeholder="date placeholder"
                          />
                        </InputGroup>
                      </Col>
                      <Col>
                        <InputGroup>
                          <Input
                            className='border-left border-right mt-2'
                            defaultValue={this.state.startTime}
                            type="time"
                            id="startTime"
                            placeholder="time placeholder"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Label for="endDate" className='mt-2'>End Date</Label>
                      </Col>
                      <Col>
                        <Label for="endTime" className='mt-2'>End Time</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <InputGroup>
                          <Input
                            className='border-left border-right mt-2'
                            defaultValue={this.state.endDate}
                            type="date"
                            id="endDate"
                            placeholder="date placeholder"
                          />
                        </InputGroup>
                      </Col>
                      <Col>
                        <InputGroup>
                          <Input
                            className='border-left border-right mt-2'
                            defaultValue={this.state.endTime}
                            type="time"
                            id="endTime"
                            placeholder="time placeholder"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <CardFooter>
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
