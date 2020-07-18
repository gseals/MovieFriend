import axios from 'axios';

const getAllUsers = () => new Promise((resolve, reject) => {
    axios.get('https://localhost:44389/api/moviefriend/users/all/')
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

export default { getAllUsers };
