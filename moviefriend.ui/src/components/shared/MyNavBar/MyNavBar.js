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

import './MyNavBar.scss';

class MyNavBar extends React.Component {
  state = {
    isOpen: false,
  }

  static propTypes = {
    authed: PropTypes.bool,
  }

  toggleNav = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { authed } = this.props;

    const buildNavBar = () => {
      if (authed) {
        return (
        <Nav className="navbar-nav ml-auto">
          <div className="d-flex flex-row">
          </div>
          <NavItem className="nav-item">
            <Link className="nav-link navFont btn btn-info" to="/users">Users</Link>
          </NavItem>
          <NavItem className="nav-item">
            <Link className="nav-link navFont btn btn-info" to="/movieChoices">MovieChoices</Link>
          </NavItem>
          <NavItem className="nav-item">
            <Link className="nav-link navFont btn btn-info" to="/movies">Movies</Link>
          </NavItem>
          <NavItem className="nav-item">
            <Link className="nav-link navFont btn btn-info" to="/events">Events</Link>
          </NavItem>
          <NavItem className="nav-item">
            <Link className="nav-link navFont btn btn-info" to="/invites">Invites</Link>
          </NavItem>
          <NavItem className="nav-item">
            <Link className="nav-link navFont btn btn-danger" onClick={this.logMeOut}>Logout</Link>
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
              <Link className="navbar-brand btn btn-info removeMarginRight" to="/">MovieF(r)iend</Link>
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
