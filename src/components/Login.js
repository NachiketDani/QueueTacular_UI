import React from 'react';
import { Button } from 'reactstrap';

import GraphQLFetch from '../GraphQLFetch.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
  }

  render() {
    return (
      <div class='g-signin2' data-onsuccess='onSignIn'>
        <Button>
          <img src='https://goo.gl/4yjp6B' alt='Sign In' />
        </Button>
      </div>
      //   <Form className='App'>
      //     <FormGroup>
      //       <Label>Email</Label>
      //       <Input type='email' placeholder='Email' />
      //     </FormGroup>
      //     <FormGroup>
      //       <Label>Password</Label>
      //       <Input type='password' placeholder='Password' />
      //     </FormGroup>
      //   </Form>
    );
  }
}

export default Login;
