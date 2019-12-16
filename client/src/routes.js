import React from 'react';
import {Switch, Route } from 'react-router-dom';

import Layout from './components-hoc/layout-app'
import Home from './components/Home'
import RegisterLogin from './components/Register-Login'
import Register from './components/Register-Login/Register'

import UserDashboard from './components/User-Dashboard'

//stateless component
const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/register_login" exact component={RegisterLogin}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/user/dashboard" exact component={UserDashboard}/>
      </Switch>
    </Layout>

  )
}

export default Routes;
