import React, { Component } from 'react';
import * as routes from './../../routes';
import { Link, withRouter } from 'react-router-dom';

class Register extends Component {
  render() {
    return (
      <div>
        <h1>Register</h1>
        <li><Link to={routes.REGTEAMATH}>Team Athlete Registration</Link></li>
        <li><Link to={routes.REGISTER}>Individual Athlete Registration</Link></li>
        <li><Link to={routes.REGISTER}>Coaches Registration</Link></li>

      </div>
    )
  }
}

export default Register;
