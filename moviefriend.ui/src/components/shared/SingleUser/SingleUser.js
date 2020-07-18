import React, { Component } from 'react';
import userShape from '../../../helpers/propz/userShape';
import './SingleUser.scss';

class SingleUser extends Component {
    static propTypes = {
      user: userShape.userShape,
    }

    render() {
      const { user } = this.props;
      return (
        <div className="SingleUser">
            <ul>
                <li>UserId: {user.userId}</li>
                <li>First Name: {user.firstName}</li>
                <li>Last Name: {user.lastName}</li>
                <li>E-Mail: {user.email}</li>
                <li>Date Joined: {user.dateTime}</li>
            </ul>
        </div>
      );
    }
}

export default SingleUser;
