import axios from 'axios';

const getAllInvites = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44389/api/moviefriend/invites/all')
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const deleteDataInviteByInviteId = (inviteId) => axios.delete(`https://localhost:44389/api/moviefriend/invites/remove/${inviteId}`);

export default { getAllInvites, deleteDataInviteByInviteId };
