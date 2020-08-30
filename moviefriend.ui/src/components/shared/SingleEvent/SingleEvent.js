import React, { Component } from 'react';
import {
  Collapse,
  Button,
  CardBody,
  Card,
} from 'reactstrap';
import moment from 'moment';
import singleEventShape from '../../../helpers/propz/singleEventShape';
import './SingleEvent.scss';

class SingleEvent extends Component {
    static propTypes = {
      event: singleEventShape.singleEventShape,
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
            <ul>
                {/* <li>EventId: {event.eventId}</li>
                <li>MovieId: {event.movieId}</li>
                <li>HostId: {event.hostId}</li> */}
                <li>Date and time of party: {eventDateTime.format('ll')}</li>
                <li>This event was at {event.location}</li>
                <li>This event was created on {moment(event.dateEventCreated).format('ll')}</li>
                <img className="eventImage" src={event.moviePoster} alt={`movie poster for ${event.movieTitle}`} />
                <li>Movie Title: {event.movieTitle}</li>
                <li>Notes about this event: {event.notes}</li>
                { shouldShowButton
                  ? <button className="btn btn-danger">Can't make this event? Remove it from your schedule.</button>
                  : null
              }
            </ul>
            </Collapse>
        </div>
      );
    }
}

export default SingleEvent;
