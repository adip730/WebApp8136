import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from './../../routes';
import {auth} from './../../firebase/firebase';



const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});



class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null,
    };
  }




  onSubmit = (e) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({
          username: '',
          email: '',
          passwordOne: '',
          passwordTwo: '',
          error: null,
        });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    e.preventDefault();
  }




  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={username}
            onChange={e => this.setState(byPropKey('username', e.target.value))}
            type="text"
            placeholder="Full Name"
          />
          <input
            value={email}
            onChange={e => this.setState(byPropKey('email', e.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={passwordOne}
            onChange={e => this.setState(byPropKey('passwordOne', e.target.value))}
            type="password"
            placeholder="Password"
          />
          <input
            value={passwordTwo}
            onChange={e => this.setState(byPropKey('passwordTwo', e.target.value))}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit">
            Register
          </button>

          { error && <p>{error.message}</p> }
        </form>
        <li><Link to={routes.LOG_IN}>Already have an account? Click here to Log In</Link></li>
      </div>
    )
  }
}


export default withRouter(Register);
