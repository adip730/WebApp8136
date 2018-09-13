import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from './../../routes';
import {auth} from './../../firebase/firebase';




class LogOut extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  onSubmit = () => {

      const {
        history,
      } = this.props;

      auth.signOut()
        .then(() => {
          history.push(routes.LANDING);
      });

  }
  render() {
    return (
      <button
        type="button"
        onClick={this.onSubmit}

      >
        Log Out
      </button>
    )
  }
}


export default withRouter(LogOut);
