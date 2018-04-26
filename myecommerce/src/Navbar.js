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
          <a href="/redsticky"><li>Red Stickies!</li></a>
          <a href="/greensticky"><li>Green Stickies!</li></a>
          <a href="/bluesticky"><li>Blue Stickies!</li></a>
        </ul>
      </div>
        <span className="logo"><NavLink to="/">Ret Set Era!</NavLink></span>
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
