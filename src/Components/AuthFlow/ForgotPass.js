import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from './../../firebase/firebase';
import * as routes from './../../routes';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class ForgotPass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: null,
    };
  }

  onSubmit = (e) => {
    const { email } = this.state;

    auth.sendPasswordResetEmail(email)
      .then(() => {
        this.setState({
          email: '',
          error: null,
        });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    e.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <div>
        <h1>Forgot Password</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.email}
            onChange={e => this.setState(byPropKey('email', e.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <button disabled={isInvalid} type="submit">
            Reset My Password
          </button>

          { error && <p>{error.message}</p> }
        </form>
      </div>

    );
  }
}

export default ForgotPass;
