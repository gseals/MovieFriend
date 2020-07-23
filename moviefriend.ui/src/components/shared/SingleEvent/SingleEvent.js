import React, { Component } from 'react';
import eventShape from '../../../helpers/propz/eventShape';
import './SingleEvent.scss';

class SingleEvent extends Component {
    static propTypes = {
      event: eventShape.eventShape,
    }

    render() {
      const { event } = this.props;
      return (
        <div className="SingleEvent">
            <ul>
                {/* <li>EventId: {event.eventId}</li>
                <li>MovieId: {event.movieId}</li>
                <li>HostId: {event.hostId}</li> */}
                <li>Date and time of party: moment({event.dateTime}).format('ll')</li>
                <li>This event was at {event.location}</li>
                {/* <li>Date Event Created: {event.dateEventCreated}</li> */}
                <img src={event.moviePoster} alt={`movie poster for ${event.movieTitle}`} />
                <li>Movie Title: {event.movieTitle}</li>
                <li>Notes about this event: {event.notes}</li>
            </ul>
        </div>
      );
    }
}

export default SingleEvent;
