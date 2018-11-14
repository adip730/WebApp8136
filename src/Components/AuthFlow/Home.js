import React, { Component } from 'react';
import { Jumbotron, Button, Nav, NavItem, NavLink } from 'reactstrap';
import {auth,db} from './../../firebase/firebase'

import Loading from './../Loading';

class Home extends Component {

  constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        loaded: false
      };
    }

  componentDidMount() {
    this.setState({loaded: !this.state.loaded});
    auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
  }

  render() {
    const curr = auth.currentUser;
    const name = this.props.name;
    const days = this.props.days;
    console.log(this.props.name)
    console.log(this.props.days)
    var show;
    if(this.props.loaded) {
      show = <div>

          <Jumbotron style={{display:'flex', flexDirection: 'column',
            alignItems:'center', justifyContent:'center', }}>
            <h3 className="display-3">Welcome {name} !</h3>
            <p className="lead">This is the Athlead Training App</p>

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
    } else {
      show = <Loading/>
    }

    return (
      <div>

          {show}

      </div>
    )
  }
};

export default Home;
