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
  }
  render() {
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>Create a Queue</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="createTitle">Title</Label>
                    <Input placeholder="Title" type="text" id="createTitle" required/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="createDescription">Description</Label>
                    <Input placeholder="Description" type="textarea" name="text" id="createDescription" required/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="createParticipants">Maximum Participants</Label>
                    <InputGroup>
                      <Input placeholder="Maximum Participants" min={0}
                      type="number" step="1" id ="createParticipants"/>
                      <InputGroupAddon addonType="append">persons</InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label for="createParticipants">Maximum Wait Time</Label>
                    <InputGroup>
                      <Input placeholder="Maximum Wait Time" min={0} type="number" step="15" />
                      <InputGroupAddon addonType="append">minutes</InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Create;