import React, { Component } from 'react';
import {
  Collapse,
  Button,
  CardBody,
  Card,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import posterImage from '../../../img/noPoster.jpg';
import singleEventShape from '../../../helpers/propz/singleEventShape';
import './SingleEvent.scss';

class SingleEvent extends Component {
    static propTypes = {
      event: singleEventShape.singleEventShape,
      deleteInviteByInviteId: PropTypes.func,
    }

    state = {
      isOpen: false,
    }

    toggle(isOpen) {
      if (isOpen === false) {
        this.setState({
          isOpen: true,
        });
      } else if (isOpen === true) {
        this.setState({
          isOpen: false,
        });
      }
    }

    handledeleteInviteByInviteId = (e) => {
      e.preventDefault();
      const { deleteInviteByInviteId } = this.props;
      const { inviteId } = this.props.event;
      deleteInviteByInviteId(inviteId);
      window.location.reload(false);
    }

    render() {
      const { event } = this.props;
      const { isOpen } = this.state;
      const eventDateTime = moment(event.dateTime);
      const now = moment(new Date());
      const shouldShowButton = eventDateTime > now;

      return (
        <div className="SingleEvent">
          <Button color="primary" onClick={() => this.toggle(isOpen)} style={{ marginBottom: '1rem' }}>{eventDateTime.format('LLL')}</Button>
          <Collapse isOpen={isOpen}>
            <div className="singleEventCard">
                <img className="eventImage" src=
                  {(event.moviePoster !== 'N/A')
                    ? event.moviePoster
                    : posterImage} alt={`movie poster for ${event.movieTitle}`} />
                <p>{event.movieTitle}</p>
                <p>Time and Date of Event: {eventDateTime.format('ll')}</p>
                <p>Notes: {event.notes}</p>
                <p>Location: {event.location}</p>
                <p>This event was created on {moment(event.dateEventCreated).format('ll')}</p>
                { shouldShowButton
                  ? <button className="btn btn-danger" onClick={this.handledeleteInviteByInviteId}>Can't make this event? Remove it from your schedule.</button>
                  : null
              }
            </div>
            </Collapse>
        </div>
      );
    }
}

export default SingleEvent;
