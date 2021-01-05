import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import appRoutes from './common/constants/appRoutes';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Redirect to={appRoutes.login} />
        </Route>
        <Route path={appRoutes.login} component={Login} />
        <Route path={appRoutes.home.baseurl} component={Dashboard} />
        <Route path={appRoutes.profile} component={Profile} />
      </Switch>
    );
  }
}

export default Routes;
