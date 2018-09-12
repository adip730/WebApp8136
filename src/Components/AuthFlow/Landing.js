import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import * as routes from './../../routes';

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Landing</h1>
        <ul>
          <li><Link to={routes.LOG_IN}>Click here to Log In</Link></li>
          <li><Link to={routes.REGISTER}>Click here to Register</Link></li>

        </ul>

      </div>
    )
  }
}

export default Landing;
