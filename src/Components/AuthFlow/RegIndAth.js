import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from './../../routes';
import {auth, db} from './../../firebase/firebase';



const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});



class RegIndAth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      sport: '',
      level: '',
      error: null,
    };
  }



  createActDB(name, email, sport, level, id) {

    var prog = '';
    db.collection('programs').where('sport', '==', sport).where('level', '==', level)
    .get()
    .then((doc) => {
      doc.forEach((p) => {
        prog = p.data().pid;
      })
      const newUser = {
        name: name,
        email: email,
        organization: 'None',
        seasonStart: 'n/a',
        sport: sport,
        level: level,
        program: prog,
        type: 'individual'
      }
      console.log(prog);
      db.collection('users').doc(id).set(newUser)
      .then(() => {
        console.log('check')
      })
    });
  };



  onSubmit = (e) => {
    const {
      username,
      email,
      passwordOne,
      sport,
      level,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.createActDB(username, email, sport, level, authUser.user.uid);
        console.log(authUser.user.uid);
        this.setState({
          username: '',
          email: '',
          passwordOne: '',
          passwordTwo: '',
          teamCode: '',
          error: null,
        });
        history.push(routes.HOME);

      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      }).then(() => {
        //history.push(routes.HOME);
      });

      e.preventDefault();
  }


  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      sport,
      level,
      error,
    } = this.state;

    const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '' ||
        sport === '' ||
        level === '';

    return (
      <div style={{display:'flex', flexDirection: 'column',
        alignItems:'center', justifyContent:'center'}}>
        <h1>Individual Athlete Registration</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={username}
            onChange={e => this.setState(byPropKey('username', e.target.value))}
            type="text"
            placeholder="Full Name"
          /><br/>
          <input
            value={email}
            onChange={e => this.setState(byPropKey('email', e.target.value))}
            type="text"
            placeholder="Email Address"
          /><br/>
          <input
            value={passwordOne}
            onChange={e => this.setState(byPropKey('passwordOne', e.target.value))}
            type="password"
            placeholder="Password"
          /><br/>
          <input
            value={passwordTwo}
            onChange={e => this.setState(byPropKey('passwordTwo', e.target.value))}
            type="password"
            placeholder="Confirm Password"
          /><br/>
          <select
            value={sport}
            onChange={e => this.setState(byPropKey('sport', e.target.value))}>
            <option value="Basketball">Basketball</option>
            <option value="Football">Football</option>
            <option value="Lacrosse">Lacrosse</option>
            <option value="Soccer">Soccer</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Wrestling">Wrestling</option>
          </select><br/>
          <select
            value={level}
            onChange={e => this.setState(byPropKey('level', e.target.value))} >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select><br/>
          <button disabled={isInvalid} type="submit">
            Register
          </button>

          { error && <p>{error.message}</p> }
        </form>
        <Link to={routes.LOG_IN}>Already have an account? Click here to Log In</Link>
      </div>
    )
  }
}


export default withRouter(RegIndAth);
