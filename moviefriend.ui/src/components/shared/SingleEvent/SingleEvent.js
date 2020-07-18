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
                <li>EventId: {event.eventId}</li>
                <li>MovieId: {event.movieId}</li>
                <li>HostId: {event.hostId}</li>
                <li>Date and Time of Event: {event.dateTime}</li>
                <li>Location: {event.location}</li>
                <li>Date Event Created: {event.dateEventCreated}</li>
                <li>Notes: {event.notes}</li>
            </ul>
        </div>
      );
    }
}

export default SingleEvent;
