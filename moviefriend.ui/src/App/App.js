import React, { Component } from 'react';
import AllUsers from '../components/pages/AllUsers/AllUsers';
import AllMovieChoices from '../components/pages/AllMovieChoices/AllMovieChoices';
import './App.scss';

class App extends React.Component {
  testClick() {
    console.log('test');
  }

  render() {
    return (
    <div className="App">
      <button
        className="btn btn-danger"
        onClick={() => this.testClick()}
        >
          Test
        </button>
        <AllUsers />
        <AllMovieChoices />
    </div>
    );
  }
}

export default App;
