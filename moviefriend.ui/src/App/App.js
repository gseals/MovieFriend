import React, { Component } from 'react';

import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import firebase from 'firebase/app';

import AllUsers from '../components/pages/AllUsers/AllUsers';
import AllMovieChoices from '../components/pages/AllMovieChoices/AllMovieChoices';
import AllMovies from '../components/pages/AllMovies/AllMovies';
import AllInvites from '../components/pages/AllInvites/AllInvites';
import AllEvents from '../components/pages/AllEvents/AllEvents';
import MyNavBar from '../components/shared/MyNavBar/MyNavBar';

import './App.scss';

import 'firebase/auth';

import firebaseConnection from '../helpers/data/connection';

import Auth from '../components/pages/Auth/Auth';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

firebaseConnection();

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
    <div className="App">
      <Router>
        <MyNavBar authed={authed} />
        <div className="display-margin-top">
        <Switch>
          <Route path="/auth" exact component={Auth} authed={authed}/>

          <PrivateRoute path="/users" exact component={AllUsers} authed={authed} />
          <PrivateRoute path="/moviechoices" exact component={AllMovieChoices} authed={authed} />
          <PrivateRoute path="/movies" exact component={AllMovies} authed={authed} />
          <PrivateRoute path="/events" exact component={AllEvents} authed={authed} />
          <PrivateRoute path="/invites" exact component={AllInvites}authed={authed} />
        </Switch>
        </div>
      </Router>
    </div>
    );
  }
}

export default App;
