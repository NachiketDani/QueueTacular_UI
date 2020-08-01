import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row,
         Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';


// Fields:
// Title: TEXT
// Description: TEXT
// maxParticipants: INT
// maxWaitTime: INT
// TODO: Date and time field

class Create extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    title: null,
    description: null,
    participants: null,
    wait: null
  }
}

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.tiel]: event.target.value
    })
  }

  render() {
    // const { title, description, participants, wait } = this.state;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>Create a Queue</CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="createTitle">Title</Label>
                    <Input
                      placeholder="Title"
                      type="text"
                      title="empty title"
                      id="createTitle"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="createDescription">Description</Label>
                    <Input
                      placeholder="Description"
                      type="textarea"
                      description="empty description"
                      name="text"
                      id="createDescription" 
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="createParticipants">Maximum Participants</Label>
                    <InputGroup>
                      <Input
                        placeholder="Maximum Participants"
                        min={0}
                        type="number"
                        step="1"
                        id ="createParticipants"
                      />
                      <InputGroupAddon addonType="append">persons</InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label for="createWaitHours">Maximum Wait Time</Label>
                    <Row>
                      <Col>
                        <InputGroup>
                          <Input
                            placeholder="Hours"
                            min={0}
                            type="number"
                            step="1"
                            id="createWaitHours"
                          />
                          <InputGroupAddon addonType="append">hours</InputGroupAddon>
                        </InputGroup>
                      </Col>
                      <Col>
                        <InputGroup>
                          <Input
                            placeholder="Minutes"
                            min={0}
                            max={59}
                            type="number"
                            step="15"
                            id="createWaitMinutes"
                          />
                          <InputGroupAddon addonType="append">minutes</InputGroupAddon>
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