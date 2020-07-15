import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
    userId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dateJoined: PropTypes.string.isRequired
})

export default { userShape };
