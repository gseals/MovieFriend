import React, { Component } from 'react';
import AllUsers from '../components/pages/AllUsers/AllUsers';
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
    </div>
    );
  }
}

export default App;
