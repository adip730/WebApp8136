import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import './index.css';
import Progress from "react-progress-2";

import Landing from './Components/AuthFlow/Landing';
import Register from './Components/AuthFlow/Register';
import LogIn from './Components/AuthFlow/LogIn';
import LogOut from './Components/AuthFlow/LogOut';
import ForgotPass from './Components/AuthFlow/ForgotPass';
import Home from './Components/AuthFlow/Home';
import RegTeamAth from './Components/AuthFlow/RegTeamAth';
import RegIndAth from './Components/AuthFlow/RegIndAth';

import ExerciseLibrary from './Components/Exercises/ExerciseLibrary'
import Workout from './Components/Workout/Workout'
import Program from './Components/Program/Program'
import Entry from './Components/Progress/Entry'
import History from './Components/Progress/History'
import Profile from './Components/Profile/Profile'
import Settings from './Components/Profile/Settings'
import Error from './Components/Error';

import AuthUserContext from './AuthUserContext';


import MenuBar from './Components/MenuBar';
import SideBar from './Components/SideBar';

import setUpSession from './setUpSession';

import * as routes from './routes';
import {auth} from './firebase/firebase';

class App extends Component {

  render() {
      return (

        <AuthUserContext.Consumer>
          {authUser => authUser.authUser
            ? <NavigationAuth {...authUser} />
            : <NavigationNonAuth />
          }
        </AuthUserContext.Consumer>
      );
    }

  }

  const NavigationAuth = (props) =>

    <Router>
      <div>
        <MenuBar />

        <Switch>
          <Route path='/ExerciseLibrary' component={ExerciseLibrary}/>
          <Route path='/Workout' render={() => <Workout {...props}/>}/>
          <Route path='/Program' render={() => <Program {...props}/>}/>
          <Route path='/Entry' component={Entry}/>
          <Route path='/History' component={History}/>
          <Route path='/Profile' render={() => <Profile {...props}/>}/>
          <Route path='/Settings' component={Settings}/>
          <Route path={routes.HOME} render={() => <Home {...props}/>}/>
          <Route exact path='/' render={() => <Home {...props}/>}/>
        </Switch>
      </div>
    </Router>



  const NavigationNonAuth = () =>
    <Router>
      <div>
        <Switch>
          <Route
            exact path={routes.LANDING} component={Landing}
          />
          <Route
            exact path={routes.REGISTER} component={Register}
          />
          <Route
            exact path={routes.REGTEAMATH} component={RegTeamAth}
          />
          <Route
            exact path='/regindath' component={RegIndAth}
          />
          <Route
            exact path={routes.LOG_IN} component={LogIn}
          />
          <Route
            exact path={routes.FORGOT_PASS} component={ForgotPass}
          />
        </Switch>
      </div>
    </Router>


export default setUpSession(App);
