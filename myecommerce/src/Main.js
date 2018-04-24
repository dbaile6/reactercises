import React, { Component } from 'react';
import {HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import CartPage from './CartPage';
import LandingPage from './LandingPage';
import SignInPage from './SignInPage';


class Main extends Component {

  render() {
    return (
      <Router>

    <main>
      <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/cart" exact component={CartPage} />
      <Route path="/signin" exact component={SignInPage} />
      </Switch>
    </main>
    </Router>

    );
  }
}

export default Main;
