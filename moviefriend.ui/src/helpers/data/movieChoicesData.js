import axios from 'axios';

const getAllMovieChoices = () => new Promise((resolve, reject) => {
    axios.get('https://localhost:44389/api/moviefriend/moviechoices/all/')
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

export default { getAllMovieChoices };
