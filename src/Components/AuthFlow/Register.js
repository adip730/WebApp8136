import React, { Component } from 'react';
import * as routes from './../../routes';
import { Link, withRouter } from 'react-router-dom';

class Register extends Component {
  render() {
    return (
      <div style={{display:'flex', flexDirection: 'column',
        alignItems:'center', justifyContent:'center'}}>
        <h1 style={{marginTop: '100 px'}}>Register</h1>
        <Link to={routes.REGTEAMATH}>Team Athlete Registration</Link>
        <Link to={routes.REGINDATH}>Individual Athlete Registration</Link>
        <Link to={routes.REGISTER}>Coaches Registration</Link>

      </div>
    )
  }
}

export default Register;
