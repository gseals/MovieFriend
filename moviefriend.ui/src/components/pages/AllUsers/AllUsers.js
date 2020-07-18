import React from 'react';
import SingleUser from '../../shared/SingleUser/SingleUser';
import userData from '../../../helpers/data/userData';
import './AllUsers.scss';

class AllUsers extends React.Component {
    state = {
      users: [],
    }

    componentDidMount() {
      userData.getAllUsers()
        .then((users) => {
          this.setState({ users });
        })
        .catch((errorFromGetUsers) => console.error({ errorFromGetUsers }));
    }

    render() {
      const { users } = this.state;
      return (
        <div className="AllUsers">
        { users.map((user) => <SingleUser key={user.userId} user={user} />)}
        </div>
      );
    }
}

export default AllUsers;
