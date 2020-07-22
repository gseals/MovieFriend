import React from 'react';
import SingleInvite from '../../shared/SingleInvite/SingleInvite';
import inviteData from '../../../helpers/data/inviteData';
import userData from '../../../helpers/data/userData';
import './AllInvites.scss';

class AllInvites extends React.Component {
    state = {
      invites: [],
    }

    componentDidMount() {
      const userId = userData.getLoggedInUserId();
      // here we will write something that pulls items through based on the userId of the logged in person so
      // we'll have to write a function that runs from the SQL to here
      inviteData.getAllInvites(userId)
        .then((invites) => {
          this.setState({ invites });
        })
        .catch((errorFromGetInvites) => console.error({ errorFromGetInvites }));
    }

    render() {
      const { invites } = this.state;
      return (
        <div className="AllInvites">
        { invites.map((invite) => <SingleInvite key={invite.inviteId} invite={invite} />)}
        </div>
      );
    }
}

export default AllInvites;
