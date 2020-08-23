import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import date from '../../../helpers/data/date';
import singleHostedEventShape from '../../../helpers/propz/singleHostedEventShape';
import './SingleHostedEvent.scss';

class SingleHostedEvent extends Component {
    static propTypes = {
      event: singleHostedEventShape.singleHostedEventShape,
      deleteEventAndInviteAndMovie: PropTypes.func,
    }

    handleDeleteEventAndInviteAndMovie = (e) => {
      e.preventDefault();
      const { deleteEventAndInviteAndMovie, event } = this.props;
      deleteEventAndInviteAndMovie(event.eventId);
    }

    render() {
      const { event } = this.props;
      return (
        <div className="SingleEvent">
            <ul>
                {/* <li>EventId: {event.eventId}</li>
                <li>MovieId: {event.movieId}</li>
                <li>HostId: {event.hostId}</li> */}
                <li>Date and time of party: {moment(event.dateTime).format('LLL')}</li>
                <li>This event was at {event.location}</li>
                {/* <li>Date Event Created: {event.dateEventCreated}</li> */}
                <img className="eventImage" src={event.moviePoster} alt={`movie poster for ${event.movieTitle}`} />
                <li>Movie Title: {event.movieTitle}</li>
                <li>Notes about this event: {event.notes}</li>
                { moment(event.dateTime).format('LLL') > moment(new Date()).format('LLL')
                  ? <button className="btn btn-danger" onClick={this.handleDeleteEventAndInviteAndMovie}>
                Delete this event
                </button>
                  : null
                }
            </ul>
        </div>
      );
    }
}

export default SingleHostedEvent;
