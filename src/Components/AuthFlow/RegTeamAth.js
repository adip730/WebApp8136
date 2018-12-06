import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from './../../routes';
import {auth, db} from './../../firebase/firebase';

import setUpSession from './../../setUpSession';



const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});



class RegTeamAth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      teamCode: '',
      error: null,
    };
  }



  createActDB(name, email, tCode, id) {

    const teamRef = db.collection('teams').doc(tCode);
    var prog = '';
    teamRef.get().then((doc) => {
      db.collection('programs').where('sport', '==', doc.data().sport).where('level', '==', doc.data().level)
      .get()
      .then((qSnap) => {
        qSnap.forEach((p) => {
          prog = p.data().pid;
        })
        const newUser = {
          name: name,
          email: email,
          organization: doc.data().organization,
          sport: doc.data().sport,
          level: doc.data().level,
          seasonStart: doc.data().seasonStart,
          program: prog,
          type: 'team',
        }
        return newUser;
      }).then((newUser) => {
        db.collection('users').doc(id).set(newUser)
        .then(() => {
          console.log('check')
        })
      })
    });
  }

  onSubmit = (e) => {
    const {
      username,
      email,
      passwordOne,
      teamCode,
    } = this.state;

    const {
      history,
    } = this.props;

    const teamRef = db.collection('teams').doc(teamCode);
    teamRef.get().then((doc) => {
        if (doc.exists) {
        auth.createUserWithEmailAndPassword(email, passwordOne)
          .then(authUser => {
            this.createActDB(username, email, teamCode, authUser.user.uid);
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

          })/*.then(() => {
            console.log('go to home')
            history.push(routes.HOME);
          })*/
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

      } else {
          //make notification to enter valid team code
      }}).catch(function(error) {
          console.log("Invalid team code", error);
      });

    e.preventDefault();
  }




  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      teamCode,
      error,
    } = this.state;

    const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '' ||
        teamCode === '';

    return (
      <div style={{display:'flex', flexDirection: 'column',
        alignItems:'center', justifyContent:'center'}}>
        <h1>Team Athlete Registration</h1>
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
          <input
            value={teamCode}
            onChange={e => this.setState(byPropKey('teamCode', e.target.value))}
            type="text"
            placeholder="Team Code"
          /><br/>
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


export default withRouter(RegTeamAth);
