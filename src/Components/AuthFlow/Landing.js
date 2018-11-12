import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo2 from './../logo2.png';
import * as routes from './../../routes';

class Landing extends Component {
  render() {
    return (
      <div style={{marginTop: '100px', display:'flex', flexDirection: 'column',
        alignItems:'center', justifyContent:'center'}}>
        <img src={logo2} width='250' height='200' />
        <br/>
          <button>
            <Link to={routes.LOG_IN}>Log In</Link>
          </button>
          <br/>
          <button>
            <Link to={routes.REGISTER}>Register</Link>
          </button>

      </div>
    )
  }
}

export default Landing;
