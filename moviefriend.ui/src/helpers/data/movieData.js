import axios from 'axios';

const getAllMovies = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44389/api/moviefriend/movies/all/')
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

export default { getAllMovies };
