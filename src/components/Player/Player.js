import React from 'react';
import PropTypes from 'prop-types';

import playerShape from '../../helpers/propz/playerShape';

import './Player.scss';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
    deletePlayer: PropTypes.func.isRequired,
    editAPlayer: PropTypes.func.isRequired,
  }

  deletePlayerEvent = (e) => {
    e.preventDefault();
    const { player, deletePlayer } = this.props;
    deletePlayer(player.id);
  }

  editPlayerEvent = (e) => {
    e.preventDefault();
    const { player, editAPlayer } = this.props;
    editAPlayer(player);
  }

  render() {
    const { player } = this.props;

    return (
      <div className="card text-center player-container" id={player.id}>
        <img className="card-img-top" src={player.imageUrl} alt={player.name} />
        <div className="card-body">
          <h4 className="card-title">{player.name}</h4>
          <p className="card-text">Jersey: {player.jersey}</p>
          <p className="card-text">Position: {player.position}</p>
          <button className="btn btn-danger" onClick={this.deletePlayerEvent}>Release Player</button>
          <button className="btn btn-secondary" onClick={this.editPlayerEvent}><i className="far fa-edit"></i></button>
        </div>
      </div>
    );
  }
}

export default Player;
