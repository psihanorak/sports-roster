import React from 'react';

import playerShape from '../../helpers/propz/playerShape';

import './Player.scss';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
  }

  render() {
    const { player } = this.props;

    return (
      <div className="card text-center player-container">
        <img className="card-img-top" src={player.imageUrl} alt={player.name} />
        <div className="card-body">
          <h4 className="card-title">{player.name}</h4>
          <p className="card-text">Jersey: #{player.jersey}</p>
          <p className="card-text">{player.position}</p>
        </div>
      </div>
    );
  }
}

export default Player;
