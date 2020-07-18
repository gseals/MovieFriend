import PropTypes from 'prop-types';

const eventShape = PropTypes.shape({
  eventId: PropTypes.number.isRequired,
  movieId: PropTypes.number,
  hostId: PropTypes.number.isRequired,
  dateTime: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  dateEventCreated: PropTypes.string.isRequired,
  notes: PropTypes.string,
});

export default { eventShape };
