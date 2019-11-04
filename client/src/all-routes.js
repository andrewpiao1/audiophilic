import React from 'react';
import {Switch, Route } from 'react-router-dom';

import Layout from './components-hoc/layout'
import Home from './components/Home'
import RegisterLogin from './components/Register-Login'

//stateless component
const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/register_login" exact component={RegisterLogin}/>
      </Switch>
    </Layout>



  )
}

export default Routes;
