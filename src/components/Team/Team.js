import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';

import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

import './Team.scss';

class Team extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  state = {
    players: [],
    formOpen: false,
    editPlayer: {},
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

  editAPlayer = (editThisPlayer) => {
    this.setState({ formOpen: true, editPlayer: editThisPlayer });
  }

  updatePlayer = (playerId, editedPlayer) => {
    playerData.updatePlayer(playerId, editedPlayer)
      .then(() => {
        this.getPlayers();
        this.setState({ formOpen: false, editPlayer: {} });
      })
      .catch((err) => console.error('updatePlayer did not work!', err));
  }

  closeForm = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { players, formOpen, editPlayer } = this.state;

    const playerCard = players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer} editAPlayer={this.editAPlayer} />);

    return (
      <div className="team-page">
        <div className="sign-player">
        { !formOpen ? <button className="btn btn-primary" onClick={() => { this.setState({ formOpen: true, editPlayer: {} }); }}>Player Form</button> : '' }
        { formOpen ? <PlayerForm createPlayer={this.createPlayer} playerThatIAmEditing={editPlayer} updatePlayer={this.updatePlayer} closeForm={this.closeForm} /> : '' }
        </div>
        <div className="team-container">
          { playerCard }
        </div>
      </div>
    );
  }
}

export default Team;
