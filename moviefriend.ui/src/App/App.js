import React, { Component } from 'react';

import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';

import Auth from '../components/pages/Auth/Auth';
import Create from '../components/pages/Create/Create';
import Update from '../components/pages/Update/Update';
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

          <PrivateRoute path="/" exact component={MovieDatabase} authed={authed} />
          <PrivateRoute path="/movieDatabase" exact component={MovieDatabase} authed={authed} />
          <PrivateRoute path="/movieNights/:imdbID/create" exact component={Create} authed={authed}/>
          <PrivateRoute path="/movieNights/:eventId/update" exact component={Update} authed={authed}/>
          <PrivateRoute path="/movieNights" exact component={AllEvents} authed={authed} />
        </Switch>
        </div>
      </Router>
    </div>
    );
  }
}

export default App;
