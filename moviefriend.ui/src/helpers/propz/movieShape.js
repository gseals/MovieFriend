import PropTypes from 'prop-types';

const movieShape = PropTypes.shape({
  movieId: PropTypes.number.isRequired,
  movieTitle: PropTypes.string.isRequired,
  moviePoster: PropTypes.string.isRequired,
});

export default { movieShape };
