import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

const getUid = () => firebase.auth().currentUser.uid;

const getUserByUid = () => {
  const firebaseUid = getUid(); // OsiM38S0luW81im2RDGpwQtYiKo1
  axios.get(`https://localhost:44389/api/moviefriend/users/${firebaseUid}`)
    .then((result) => {
      const userId = result.data.id;
      sessionStorage.setItem('userId', userId);
    });
};

const getLoggedInUserId = () => sessionStorage.getItem('userId');

export { getUid, getUserByUid, getLoggedInUserId };
