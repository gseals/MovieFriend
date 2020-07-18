import React, { Component } from 'react';
import AllUsers from '../components/pages/AllUsers/AllUsers';
import AllMovieChoices from '../components/pages/AllMovieChoices/AllMovieChoices';
import AllMovies from '../components/pages/AllMovies/AllMovies';
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
        <h2>Users</h2>
        <AllUsers />
        <h2>Movie Choices</h2>
        <AllMovieChoices />
        <h2>Movies</h2>
        <AllMovies />
    </div>
    );
  }
}

export default App;
