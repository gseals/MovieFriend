import PropTypes from 'prop-types';

const inviteShape = PropTypes.shape({
  inviteId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  eventId: PropTypes.number.isRequired,
});

export default { inviteShape };
