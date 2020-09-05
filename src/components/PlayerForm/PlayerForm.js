import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

import './PlayerForm.scss';

class PlayerForm extends React.Component {
  static propTypes = {
    createPlayer: PropTypes.func.isRequired,
    updatePlayer: PropTypes.func.isRequired,
    playerThatIAmEditing: PropTypes.object.isRequired,
    closeForm: PropTypes.func.isRequired,
  }

  state = {
    imageUrl: '',
    name: '',
    jersey: '',
    position: '',
    isEditing: false,
  }

  componentDidMount() {
    const { playerThatIAmEditing } = this.props;
    if (playerThatIAmEditing.name) {
      this.setState({
        imageUrl: playerThatIAmEditing.imageUrl,
        name: playerThatIAmEditing.name,
        jersey: playerThatIAmEditing.jersey,
        position: playerThatIAmEditing.position,
        isEditing: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevPlayer = prevProps.playerThatIAmEditing;
    const incomingPlayer = this.props.playerThatIAmEditing;
    if (prevPlayer.name !== incomingPlayer.name) {
      this.setState({
        imageUrl: incomingPlayer.imageUrl || '',
        name: incomingPlayer.name || '',
        jersey: incomingPlayer.jersey || '',
        position: incomingPlayer.position || '',
        // eslint-disable-next-line no-unneeded-ternary
        isEditing: incomingPlayer.name ? true : false,
      });
    }
  }

  changeImageUrlEvent = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  changeJerseyEvent = (e) => {
    e.preventDefault();
    this.setState({ jersey: e.target.value });
  }

  changePositionEvent = (e) => {
    e.preventDefault();
    this.setState({ position: e.target.value });
  }

  signPlayerEvent = (e) => {
    e.preventDefault();
    const {
      imageUrl,
      name,
      jersey,
      position,
    } = this.state;
    const { createPlayer } = this.props;

    const newPlayer = {
      imageUrl,
      name,
      jersey,
      position,
      uid: authData.getUid(),
    };

    createPlayer(newPlayer);
  };

  editPlayerEvent = (e) => {
    e.preventDefault();
    const {
      imageUrl,
      name,
      jersey,
      position,
    } = this.state;

    const { updatePlayer, playerThatIAmEditing } = this.props;

    const myPlayerWithChanges = {
      imageUrl,
      name,
      jersey,
      position,
      uid: authData.getUid(),
    };

    updatePlayer(playerThatIAmEditing.id, myPlayerWithChanges);
  }

  closeFormEvent = (e) => {
    e.preventDefault();
    this.props.closeForm();
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="image">Player Image</label>
          <input type="text" className="form-control" id="image" placeholder="Add Player Image" onChange={this.changeImageUrlEvent} />
        </div>
        <div className="form-group">
          <label htmlFor="playerName">Player Name</label>
          <input type="text" className="form-control" id="playerName" placeholder="Enter Full Name" onChange={this.changeNameEvent} />
        </div>
        <div className="form-group">
          <label htmlFor="jerseyNumber">Jersey</label>
          <input type="text" className="form-control" id="jerseyNumber" placeholder="Enter Jersey Number" onChange={this.changeJerseyEvent} />
        </div>
        <div className="form-group">
          <label htmlFor="positionSelect">Position</label>
          <select className="form-control" id="positionSelect" onChange={this.changePositionEvent}>
            <option defaultValue>Choose...</option>
            <option>Quarterback</option>
            <option>Running Back</option>
            <option>Wide Receiver</option>
            <option>Tight End</option>
            <option>Tackle</option>
            <option>Guard</option>
            <option>Center</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={this.signPlayerEvent}>Sign Player</button>
        <button className="btn btn-dark" onClick={this.editPlayerEvent}>Substitute Player</button>
        <button className="btn btn-secondary" onClick={this.closeFormEvent}>Cancel</button>
      </form>
    );
  }
}

export default PlayerForm;
