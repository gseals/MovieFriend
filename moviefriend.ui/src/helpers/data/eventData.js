import axios from 'axios';

const getAllEvents = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44389/api/moviefriend/events/all')
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

export default { getAllEvents };
