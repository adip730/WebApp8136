import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Landing from './Components/AuthFlow/Landing';
import Register from './Components/AuthFlow/Register';
import LogIn from './Components/AuthFlow/LogIn';
import LogOut from './Components/AuthFlow/LogOut';
import ForgotPass from './Components/AuthFlow/ForgotPass';
import Home from './Components/AuthFlow/Home';
import RegTeamAth from './Components/AuthFlow/RegTeamAth';

import ExerciseLibrary from './Components/Exercises/ExerciseLibrary'
import WorkoutPreview from './Components/Workout/WorkoutPreview'
import Program from './Components/Program/Program'
import Entry from './Components/Progress/Entry'
import History from './Components/Progress/History'
import Profile from './Components/Profile/Profile'
import Settings from './Components/Profile/Settings'
import Error from './Components/Error';

import AuthUserContext from './AuthUserContext';


import MenuBar from './Components/MenuBar';
import SideBar from './Components/SideBar';

import withAuthentication from './withAuthentication';

import * as routes from './routes';
import {auth} from './firebase/firebase';

class App extends Component {

  render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
          }
        </AuthUserContext.Consumer>
      );
    }

  }

  const NavigationAuth = () =>
    <Router>
      <div>
        <MenuBar />

        <Switch>
          <Route path='/ExerciseLibrary' component={ExerciseLibrary}/>
          <Route path='/Workout' component={WorkoutPreview}/>
          <Route path='/Program' component={Program}/>
          <Route path='/Entry' component={Entry}/>
          <Route path='/History' component={History}/>
          <Route path='/Profile' component={Profile}/>
          <Route path='/Settings' component={Settings}/>
          <Route path='/LogOut' component={LogOut}/>
          <Route path={routes.HOME} component={Home}/>
          <Route path='/' component={Home}/>
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
            exact path={routes.LOG_IN} component={LogIn}
          />
          <Route
            exact path={routes.FORGOT_PASS} component={ForgotPass}
          />
        </Switch>
      </div>
    </Router>



export default withAuthentication(App);
