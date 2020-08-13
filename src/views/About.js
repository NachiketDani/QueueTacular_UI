import React from 'react';
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';

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
                manage capacities during the Covid-19 pandemic of 2020. Created
                by Danielle Mallare-Dani, Tim Gao, Nachiket Dani.
              </div>
              <br />
              <div>Login to get started with Queue-Tacular now.</div>
              <hr />
              {/* target='_blank' is a safety risk according to console - Tim */}
              <a href='mailto:spaceforcegroup@gmail.com'>
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
