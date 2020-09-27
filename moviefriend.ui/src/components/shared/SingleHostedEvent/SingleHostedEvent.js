import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Button,
} from 'reactstrap';
import moment from 'moment';
import posterImage from '../../../img/noPoster.jpg';
import singleHostedEventShape from '../../../helpers/propz/singleHostedEventShape';
import './SingleHostedEvent.scss';

class SingleHostedEvent extends Component {
    static propTypes = {
      event: singleHostedEventShape.singleHostedEventShape,
      deleteEventAndInviteAndMovie: PropTypes.func,
    }

    state = {
      isOpen: false,
    }

    handleDeleteEventAndInviteAndMovie = (e) => {
      e.preventDefault();
      const { deleteEventAndInviteAndMovie, event } = this.props;
      deleteEventAndInviteAndMovie(event.eventId);
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
      const { eventId } = this.props.event;
      const { isOpen } = this.state;
      const eventDateTime = moment(event.dateTime);
      const now = moment(new Date());
      const shouldShowButton = eventDateTime > now;

      return (
      <div className="SingleHostedEvent">
        <Button color="primary" onClick={() => this.toggle(isOpen)} style={{ marginBottom: '1rem' }}>{eventDateTime.format('LLL')}</Button>
        <Collapse isOpen={isOpen}>
          <div className="singleEventCard">
                <img className="eventImage" src=
                  {(event.moviePoster !== 'N/A')
                    ? event.moviePoster
                    : posterImage} alt={`movie poster for ${event.movieTitle}`} />
                <p>{event.movieTitle}</p>
                <p>{eventDateTime.format('LLL')}</p>
                <p>Notes: {event.notes}</p>
                <p>Location: {event.location}</p>
                <p>You sent this invite out on {moment(event.dateEventCreated).format('ll')}</p>
                { shouldShowButton
                  ? <div>
                <button className="btn btn-danger" onClick={this.handleDeleteEventAndInviteAndMovie}>
                Delete this event
                </button>
                <br/>
                <Link className="btn btn-success" to={`/movieNights/${eventId}/update`}>
                Edit this event
                </Link>
                </div>
                  : null
                }
                </div>
      </Collapse>
      </div>
      );
    }
}

export default SingleHostedEvent;
