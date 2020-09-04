import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';

import Player from '../Player/Player';
import AddForm from '../AddForm/AddForm';

import './Team.scss';

class Team extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  state = {
    players: [],
    formOpen: false,
  }

  getPlayers = () => {
    playerData.getPlayersByUid(authData.getUid())
      .then((players) => this.setState({ players }))
      .catch((err) => console.error('getPlayers did not work!', err));
  }

  componentDidMount() {
    this.getPlayers();
  }

  deletePlayer = (playerId) => {
    playerData.deletePlayer(playerId)
      .then(() => this.getPlayers())
      .catch((err) => console.error('deletePlayer did not work!', err));
  }

  createPlayer = (newPlayer) => {
    playerData.createPlayer(newPlayer)
      .then(() => {
        this.getPlayers();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('createPlayer did not work!', err));
  }

  closeForm = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { players, formOpen } = this.state;

    const playerCard = players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer} />);

    return (
      <div className="team-page">
        <div className="sign-player">
        { !formOpen ? <button className="btn btn-primary" onClick={() => { this.setState({ formOpen: true }); }}>Sign Player</button> : '' }
        { formOpen ? <AddForm createPlayer={this.createPlayer} closeForm={this.closeForm} /> : '' }
        </div>
        <div className="team-container">
          { playerCard }
        </div>
      </div>
    );
  }
}

export default Team;
