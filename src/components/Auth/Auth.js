import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  }

  render() {
    return (
      <div className="home-page">
        <h1>Welcome to the Home of the TENNESSEE TITANS Roster</h1>
        <div className="login-btn">
          <button type="button" className="btn btn-danger" onClick={this.loginClickEvent}>Login</button>
        </div>
        <img src="https://static.clubs.nfl.com/image/private/f_auto/titans/ledjtyjd9zdjncb7byyi" className="img-fluid" alt="Tennessee Titans" />
      </div>
    );
  }
}

export default Auth;
