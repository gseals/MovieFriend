import PropTypes from 'prop-types';

const singleEventShape = PropTypes.shape({
  eventId: PropTypes.number.isRequired,
  movieId: PropTypes.number,
  hostId: PropTypes.number.isRequired,
  dateTime: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  dateEventCreated: PropTypes.string.isRequired,
  notes: PropTypes.string,
  inviteId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  dateJoined: PropTypes.string.isRequired,
  movieTitle: PropTypes.string.isRequired,
  moviePoster: PropTypes.string.isRequired,
});

export default { singleEventShape };
