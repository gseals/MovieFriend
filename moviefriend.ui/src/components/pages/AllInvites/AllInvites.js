import React from 'react';
import SingleInvite from '../../shared/SingleInvite/SingleInvite';
import inviteData from '../../../helpers/data/inviteData';
import './AllInvites.scss';

class AllInvites extends React.Component {
    state = {
      invites: [],
    }

    componentDidMount() {
      inviteData.getAllInvites()
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
