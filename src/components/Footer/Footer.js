/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from 'react';
import { Container, Row } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from 'prop-types';

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={'footer' + (this.props.default ? ' footer-default' : '')}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>
            <nav className='footer-nav'>
              <ul>
                <li>
                  <a href='./about'>About</a>
                </li>
                <li>
                  <a
                    href='https://www.creative-tim.com/license'
                    target='_blank'
                  >
                    Licenses
                  </a>
                </li>
                <li>
                  <a href='mailto:spaceforcegroup@gmail.com' target='_blank'>
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
            <div className='credits ml-auto'>
              <div className='copyright'>
                &copy; {1900 + new Date().getYear()}, Bootstrap Skin made with{' '}
                <i className='fa fa-heart heart' /> by Creative Tim
              </div>
            </div>
          </Row>
          <Row>
            <div className='credits ml-auto'>
              <div className='copyright'>
                Queue-Tacular by Space Force{'  '}
                <i className='nc-icon nc-spaceship' />
              </div>
            </div>
          </Row>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
