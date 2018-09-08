import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from './Navigation';
import Landing from './Components/AuthFlow/Landing';
import Register from './Components/AuthFlow/Register';
import LogIn from './Components/AuthFlow/LogIn';
import ForgotPass from './Components/AuthFlow/ForgotPass';
import Home from './Components/AuthFlow/Home';
import Account from './Components/AuthFlow/Account';
import * as routes from './routes';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />

          <hr/>

          <Route
            exact path={routes.LANDING}
            component={Landing}
          />
          <Route
            exact path={routes.REGISTER}
            component={Register}
          />
          <Route
            exact path={routes.LOG_IN}
            component={LogIn}
          />
          <Route
            exact path={routes.PASSWORD_FORGET}
            component={ForgotPass}
          />
          <Route
            exact path={routes.HOME}
            component={Home}
          />
          <Route
            exact path={routes.ACCOUNT}
            component={Account}
          />
        </div>
      </Router>
    );
  }
}

export default App;
