import React from 'react';
import PropTypes from 'prop-types';

import playerData from '../../helpers/data/playerData';

import Player from '../Player/Player';

import './Team.scss';

class Team extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  state = {
    players: [],
  }

  getPlayers = () => {
    playerData.getPlayer()
      .then((players) => this.setState({ players }))
      .catch((err) => console.error('getPlayers did not work!', err));
  }

  componentDidMount() {
    this.getPlayers();
  }

  render() {
    const { players } = this.state;

    const playerCard = players.map((player) => <Player key={player.id} player={player} />);

    return (
      <div className="team-container team-page">
        {playerCard}
      </div>
    );
  }
}

// <img src="https://wallpaperaccess.com/full/1947580.jpg" className="img-fluid" alt="Tennessee Titans" />

export default Team;
