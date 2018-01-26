import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar/NavBar.js'
import Footer from './Footer/Footer.js'

import Agencies from './Agencies/Agencies.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Agencies/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Footer/>
      </div>
    );
  }
}

export default App;
