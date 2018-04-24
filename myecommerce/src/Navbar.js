import React, { Component } from 'react';
import {HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <Router>

    <nav>
      <div className="left-nav">
        <div id="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
          <a href=""><li>Clothes</li></a>
          <a href=""><li>Prints</li></a>
          <a href=""><li>Crafts</li></a>
        </ul>
      </div>
        <span className="logo"><NavLink to="/">ETSETERA</NavLink></span>
      </div>

      <div className="right-nav">
        <NavLink to="/signin">Sign In</NavLink>
        <NavLink to="/cart"><i class="fas fa-shopping-cart"></i></NavLink>
      </div>
      

    </nav>
    </Router>

    );
  }
}

export default Navbar;
