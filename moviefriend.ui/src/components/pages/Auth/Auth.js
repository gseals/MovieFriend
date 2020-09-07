import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';
import userData from '../../../helpers/data/userData';
import CarouselComponent from '../Carousel/Carousel';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        userData.getUserByUid();
      });
  }

  render() {
    return (
      <div className="Auth">
          <CarouselComponent/>
      </div>
    );
  }
}

export default Auth;
