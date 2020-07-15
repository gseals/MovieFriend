import PropTypes from 'prop-types';

const movieChoicesShape = PropTypes.shape({
    movieChoicesId: PropTypes.number.isRequired,
    movieId: PropTypes.number.isRequired,
    eventId: PropTypes.number.isRequired,
    votes: PropTypes.number
})

export default { movieChoicesShape };
