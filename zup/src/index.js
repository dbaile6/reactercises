import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AllUsersScreen from './AllUsersScreen';
import ProfileScreen from './ProfileScreen';
import Homepage from './Homepage';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';

let TopLevel = () => 
 <Router>
    <div>
        <nav id="nav">
            <NavLink to="/">*Home*</NavLink>
            <NavLink to="/users">*All Users*</NavLink>
            <NavLink to="/users/Dylan">*User Profile*</NavLink>
        </nav>
        <Route path="/" exact component={Homepage} />
        <Route path="/users" exact component={AllUsersScreen} />
        <Route path="/users/:id" exact component={ProfileScreen} />
    </div>
</Router>
   
ReactDOM.render(<TopLevel />, document.getElementById('root'));
