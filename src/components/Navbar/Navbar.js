import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import Auth from '../Auth/Auth';

import './Navbar.scss';

class Navbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;

    return (
      <nav className="navbar sticky-top navbar-light bg-light">
        <a className="navbar-brand" href="https://www.tennesseetitans.com">
          <img src="https://1000logos.net/wp-content/uploads/2018/06/Tennessee-Titans-Logo-768x432.png" alt="Titans Logo" />
        </a>
        {
          authed
            ? <button type="button" className="btn btn-primary logout-btn" onClick={this.logoutClickEvent}>Logout</button>
            : <Auth />
        }
      </nav>
    );
  }
}

export default Navbar;
