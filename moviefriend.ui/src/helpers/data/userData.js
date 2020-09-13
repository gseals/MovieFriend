import axios from 'axios';

import firebase from 'firebase/app';
import 'firebase/auth';

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44389/api/moviefriend/users/all/')
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getUserByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44389/api/moviefriend/users/id/${userId}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getUid = () => firebase.auth().currentUser.uid;

const getUserByUid = () => {
  const firebaseUid = getUid();
  axios.get(`https://localhost:44389/api/moviefriend/users/${firebaseUid}`)
    .then((result) => {
      const { userId } = result.data;
      sessionStorage.setItem('userId', userId);
    });
};

const getLoggedInUserId = () => parseInt(sessionStorage.getItem('userId'), 10);

export default {
  getAllUsers,
  getUid,
  getUserByUid,
  getLoggedInUserId,
  getUserByUserId,
};
