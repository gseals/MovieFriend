import React, { Component } from 'react';

import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';

import Auth from '../components/pages/Auth/Auth';
import AllUsers from '../components/pages/AllUsers/AllUsers';
import AllMovieChoices from '../components/pages/AllMovieChoices/AllMovieChoices';
import AllMovies from '../components/pages/AllMovies/AllMovies';
import AllInvites from '../components/pages/AllInvites/AllInvites';
import Create from '../components/pages/Create/Create';
import AllEvents from '../components/pages/AllEvents/AllEvents';
import MovieDatabase from '../components/pages/MovieDatabase/MovieDataBaseMain/MovieDatabase';
import MyNavBar from '../components/shared/MyNavBar/MyNavBar';

import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

firebaseConnection();

class App extends Component {
  state = {
    authed: true,
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
          <PublicRoute path="/auth" exact component={Auth} authed={authed}/>

          {/* <PrivateRoute path="/users" exact component={AllUsers} authed={authed} />
          <PrivateRoute path="/moviechoices" exact component={AllMovieChoices} authed={authed} /> */}
          <PrivateRoute path="/" exact component={MovieDatabase} authed={authed} />
          <PrivateRoute path="/movieDatabase" exact component={MovieDatabase} authed={authed} />
          <PrivateRoute path="/movieNights/create" exact component={Create} authed={authed}/>
          {/* <PrivateRoute path="/movies" exact component={AllMovies} authed={authed} /> */}
          <PrivateRoute path="/movieNights" exact component={AllEvents} authed={authed} />
          {/* <PrivateRoute path="/invites" exact component={AllInvites}authed={authed} /> */}
        </Switch>
        </div>
      </Router>
    </div>
    );
  }
}

export default App;
