import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Landing from './Components/AuthFlow/Landing';
import Register from './Components/AuthFlow/Register';
import LogIn from './Components/AuthFlow/LogIn';
import LogOut from './Components/AuthFlow/LogOut';
import ForgotPass from './Components/AuthFlow/ForgotPass';
import Home from './Components/AuthFlow/Home';
import Account from './Components/AuthFlow/Account';

import ExerciseLibrary from './Components/Exercises/ExerciseLibrary'
import WorkoutPreview from './Components/Workout/WorkoutPreview'
import Program from './Components/Program/Program'
import Entry from './Components/Progress/Entry'
import History from './Components/Progress/History'
import Profile from './Components/Profile/Profile'
import Settings from './Components/Profile/Settings'
import Error from './Components/Error';


import MenuBar from './Components/MenuBar';
import SideBar from './Components/SideBar';

import * as routes from './routes';

class App extends Component {
  render() {
    return (
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
            

            <Route
              exact path={routes.LANDING} component={Landing}
            />
            <Route
              exact path={routes.REGISTER} component={Register}
            />
            <Route
              exact path={routes.LOG_IN} component={LogIn}
            />
            <Route
              exact path={routes.PASSWORD_FORGET} component={ForgotPass}
            />
            <Route
              exact path={routes.HOME} component={Home}
            />
            <Route
              exact path={routes.ACCOUNT} component={Account}
            />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
