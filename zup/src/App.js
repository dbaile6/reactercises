import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from 'moment';

let zups = {name:'Dylan', body:'Just ran into some drama. #Millenials', date: moment.from(s).toString;
name:'Leopard', body: 'Here we go again', date: moment.from(s).toString;
name:'Polm', body: 'Poetwe', date: moment.from(s).toString;
}


class TheZup extends React.Component {
const ZupsUp = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/mine">Mine</Link>
        </li>
        <li>
          <Link to="/other">Other</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/mine" component={mine} />
      <Route path="/other" component={Other} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Mine = () => (
  <div>
    <h2>Mine</h2>
  </div>
);

const Other = ({ match }) => (
  <div>
    <h2>Other</h2>
    <ul>
      <li>
        <Link to={'/'}>homepage</Link>
      </li>
      <li>
        <Link to={`Mine`}>mine</Link>
      </li>
      <li>
        <Link to={`Other`}>others</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);
};
export default ZupsUp;
