import PropTypes from 'prop-types';

const singleHostedEventShape = PropTypes.shape({
  eventId: PropTypes.number.isRequired,
  movieId: PropTypes.number,
  hostId: PropTypes.number.isRequired,
  dateTime: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  dateEventCreated: PropTypes.string.isRequired,
  notes: PropTypes.string,
  userId: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  dateJoined: PropTypes.string.isRequired,
  firebaseUid: PropTypes.string,
  movieTitle: PropTypes.string.isRequired,
  moviePoster: PropTypes.string.isRequired,
});

export default { singleHostedEventShape };
