import React, { Component } from 'react';
import { Jumbotron, Button, Nav, NavItem, NavLink } from 'reactstrap';
import {auth,db} from './../../firebase/firebase'

class Home extends Component {

  constructor() {
      super();

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
    const curr = auth.currentUser;

    return (
      <div>
      <Jumbotron>
        <h1 className="display-3">Welcome!</h1>
        <p className="lead">This is the Athlead Training App</p>
        {curr != null &&
          <p>{curr.uid}</p>
        }
        <hr className="my-2" />
        <p>View your personalized training resources and track your progress</p>
        <Nav className='nav-list'>
          <NavItem>
            <NavLink href="/Workout">Today's Workout</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Program">Your Program</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Profile">Your Profile</NavLink>
          </NavItem>
        </Nav>
      </Jumbotron>
    </div>
    )

  }
};

export default Home;
