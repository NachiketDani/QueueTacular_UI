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

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      participant: 0,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {title, description, participant, startDate, startTime, endDate, endTime} = this.state;
    alert(`${title}, ${description}, ${participant}, ${startDate}, ${startTime}, ${endDate}, ${endTime}`)
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value}, () => {
        console.log(this.state);
    });
  }

  render() {
    return (
      <div className='content'>
        <Row>
          <Col md='12'>
            <Card>
              <CardHeader>Create a Queue</CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for='title' className='mt-2'>Title</Label>
                    <Input
                      className='mt-2'
                      defaultValue={this.state.title}
                      type='text'
                      id='title'
                      placeholder='Text'
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <CardFooter>
                      <Button>Submit</Button>
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
