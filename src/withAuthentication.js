import React, { Component } from 'react';
import {auth} from './firebase/firebase';
import AuthUserContext from './AuthUserContext';

const withAuthentication = (Component) => {
  class WithAuthentication extends Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }


    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
    }

    render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
}

export default withAuthentication;
