import React, { Component } from 'react';

import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import AllUsers from '../components/pages/AllUsers/AllUsers';
import AllMovieChoices from '../components/pages/AllMovieChoices/AllMovieChoices';
import AllMovies from '../components/pages/AllMovies/AllMovies';
import AllInvites from '../components/pages/AllInvites/AllInvites';
import AllEvents from '../components/pages/AllEvents/AllEvents';
import MyNavBar from '../components/shared/MyNavBar/MyNavBar';

import './App.scss';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends Component {
  state ={
    authed: true,
  }

  render() {
    const { authed } = this.state;

    return (
    <div className="App">
      <Router>
        <MyNavBar authed={authed} />
        <Switch>
          <Route path="/users" exact component={AllUsers} authed={authed} />
          <Route path="/moviechoices" exact component={AllMovieChoices} authed={authed} />
          <Route path="/movies" exact component={AllMovies} authed={authed} />
          <Route path="/events" exact component={AllEvents} authed={authed} />
          <Route path="/invites" exact component={AllInvites}authed={authed} />
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
