import React from 'react';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';

class About extends React.Component {
  render() {
    return (
      <>
        <div className='content'>
          <Card>
            <CardHeader>
              <CardTitle tag='h5'>About Queue-Tacular</CardTitle>
            </CardHeader>
            <hr />
            <CardBody>
              <div>
                Queue-Tacular is a general purpose queue management app for
                businesses of all shapes and sizes. Inspired by the needs of
                local business to strictly manage capacities during the Covid-19
                pandemic of 2020, Danielle Mallare-Dani, Tim Gao, Nachiket Dani,
                and Zack Katancik set out to create a queue management
                technology designed with all business in mind, not just
                restaurants.
              </div>
              <br />
              <div>Login to get started with Queue-Tacular now.</div>
              <hr />
              <a href='mailto:spaceforcegroup@gmail.com' target='_blank'>
                Email us here for inquiries!
              </a>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

export default About;
