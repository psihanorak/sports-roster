import PropTypes from 'prop-types';

const playerShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  jersey: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  teamId: PropTypes.string.isRequired,
});

export default { playerShape };
