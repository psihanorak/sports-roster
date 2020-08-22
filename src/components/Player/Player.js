import React from 'react';

class Player extends React.Component {
  render() {
    return (
      <div className="card">
        <img className="card-img-top" src="..." alt="" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This is a Tennessee Titans player.</p>
        </div>
      </div>
    );
  }
}

export default Player;
