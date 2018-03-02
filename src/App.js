import React, { Component } from 'react';
import classes from './App.css';
import Peoples from './components/Peoples/Peoples';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Peoples />
      </div>
    );
  }
}

export default App;
