import React, { Component } from 'react';
import {HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import CartSite from './CartSite';
import LandingPage from './LandingPage';
import SignInPage from './SignInPage';
import ProductSite from './ProductSite';
import Menu from './Menu';
import CategoryPage from './CategoryPage';

class Main extends Component {
// componentDidMount() {
//   fetch('/json/products.json')
//   .then(res => res.json()
//     .then(json => console.log(json))
// };
  render() {
    return (
      <Router>

    <main>
      <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/cart" exact component={CartSite} />
      <Route path="/signin" exact component={SignInPage} />
      <Route path="/products" exact component={ProductSite} />
      <Route path="/products/:category" exact component={CategoryPage} />
      </Switch>
    </main>
    </Router>

    );
  }
}

export default Main;
