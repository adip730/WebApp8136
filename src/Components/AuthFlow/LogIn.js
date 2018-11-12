import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from './../../routes';
import {auth} from './../../firebase/firebase';



const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          email: '',
          password: '',
          error: null,
        });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div style={{display:'flex', flexDirection: 'column',
        alignItems:'center', justifyContent:'center'}}>
        <h1>Log In</h1>
        <br/>
        <form onSubmit={this.onSubmit}>
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          /><br/>
          <input
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            placeholder="Password"
          /><br/>
          <button disabled={isInvalid} type="submit">
            Log In
          </button>

          { error && <p>{error.message}</p> }
        </form>
        <br/>
        <Link to={routes.FORGOT_PASS}>Forgot your Password? Click here to recover it</Link>
        
        <Link to={routes.REGISTER}>Don't have an account? Click here to Register</Link>
      </div>

    );
  }
}

export default withRouter(LogIn);
