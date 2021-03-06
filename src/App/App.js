import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import Navbar from '../components/Navbar/Navbar';
import TeamComponent from '../components/Team/Team';

import './App.scss';

fbConnection();

class App extends React.Component {
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

    const loadComponent = () => {
      if (authed) {
        return (
          <div>
            <Navbar authed={authed} />
            <TeamComponent />
          </div>
        );
      }

      return <Auth />;
    };

    return (
      <div className="App">
        {loadComponent()}
      </div>
    );
  }
}

export default App;
