import React, { Component } from 'react';
import {auth} from './firebase/firebase';
import AuthUserContext from './AuthUserContext';


export default class AuthProvider extends Component {

  state = {
    authUser: null,
    name: '',
    organization: '',
    prog: '',
    sport: '',
    level: '',

    seasonStart: '',
    weeksUntil: '',

    thisWeek: {},
    days: [],

  }

  render () {
    return (
      <AuthUserContext.Provider value={this.state}>
        {this.props.children}
      </AuthUserContext.Provider>
    )
  }
}
