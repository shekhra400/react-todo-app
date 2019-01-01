import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import HomeComponent from './HomeComponent/HomeComponent';

class App extends Component {
  render() {
    return (
      <div className="App container">
          <HomeComponent />
      </div>
    );
  }
}

export default App;
