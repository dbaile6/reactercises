import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Title = styled.h1`
  color: ${props => props.theme[props.color]};
  font-family: 'Tajawal', sans-serif;
  font-size: ${props => props.fontSize}em;
`;

Title.propTypes = {
  theme: ThemePropTypes,
  fontSize: PropTypes.string,
  color: PropTypes.string,
};

Title.defaultProps = {
  fontSize: '7',
  color: 'dark',
};

Title.displayName = 'Title';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Retcetera</h1>
        </header>
        <h3 className="profile">Profile</h3>
        <h3 className="cart">Cart</h3>
        <p className="App-intro">
          Here's an ecommerce shop
        </p>
      </div>
    );
  }
}

export default App;
