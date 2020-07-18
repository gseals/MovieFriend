import React, { Component } from 'react';
import inviteShape from '../../../helpers/propz/inviteShape';
import './SingleInvite.scss';

class SingleInvite extends Component {
    static propTypes = {
      invite: inviteShape.inviteShape,
    }

    render() {
      const { invite } = this.props;
      return (
        <div className="SingleInvite">
            <ul>
                <li>InviteId: {invite.inviteId}</li>
                <li>UserId: {invite.userId}</li>
                <li>EventId: {invite.eventId}</li>
            </ul>
        </div>
      );
    }
}

export default SingleInvite;
