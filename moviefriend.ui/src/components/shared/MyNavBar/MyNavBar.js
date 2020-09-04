import React from 'react';
import { Link } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';

import PropTypes from 'prop-types';

import firebase from 'firebase/app';
import 'firebase/auth';
import movieFriendImage from '../../../img/moviefriend.jpg';

import './MyNavBar.scss';

class MyNavBar extends React.Component {
  state = {
    isOpen: false,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  static propTypes = {
    authed: PropTypes.bool,
  }

  toggleNav = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggleNavButton = (isOpen) => {
    if (isOpen === true) {
      this.setState({
        isOpen: false,
      });
    }
  }

  render() {
    const { authed } = this.props;

    const buildNavBar = () => {
      if (authed) {
        return (
        <Nav className="navbar-nav ml-auto">
          <div className="d-flex flex-row">
          </div>
          {/* <NavItem className="nav-item">
            <Link className="nav-link navFont btn btn-info" to="/users">Users</Link>
          </NavItem>
          <NavItem className="nav-item">
            <Link className="nav-link navFont btn btn-info" to="/movieChoices">MovieChoices</Link>
          </NavItem> */}
          <NavItem className="nav-item">
            <Link className="nav-link navFont btn btn-info" onClick={this.toggleNav} to="/moviedatabase">MovieDatabase</Link>
          </NavItem>
          {/* <NavItem className="nav-item">
            <Link className="nav-link navFont btn btn-info" to="/movies">Movies</Link>
          </NavItem> */}
          <NavItem className="nav-item">
            <Link className="nav-link navFont btn btn-info" onClick={this.toggleNav} to="/movienights">Movie Nights</Link>
          </NavItem>
          {/* <NavItem className="nav-item">
            <Link className="nav-link navFont btn btn-info" to="/invites">Invites</Link>
          </NavItem> */}
          <NavItem className="nav-item">
            <button className="nav-link navFont btn btn-danger" onClick={this.logMeOut}>Logout</button>
          </NavItem>
        </Nav>
        );
      }

      return (<ul className="navbar-nav ml-auto"></ul>);
    };

    return (
      <div className="MyNavBar">
                <Navbar color="light" light expand="md" className="navbar navbar-expand-lg">
                  <NavItem>
              <Link className="navbar-brand btn-info logoImg" to="/"><img src={movieFriendImage} alt="logo for MovieF(r)iend" /></Link>
              </NavItem>
              <NavbarToggler onClick={this.toggleNav} className="toggler" />

          <Collapse isOpen={this.state.isOpen} navbar>
          { buildNavBar() }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavBar;
