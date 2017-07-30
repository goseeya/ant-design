import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import PropTypes from 'prop-types';

import TimePicker from 'antd';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
        <p>Timepicker poniżej </p>

        <TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss')} />
        </div>
        </div>
      </div>
    );
  }
}

export default App;
