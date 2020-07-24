import React from 'react';
import moment from 'moment';
import SingleEvent from '../../shared/SingleEvent/SingleEvent';
import eventData from '../../../helpers/data/eventData';
import userData from '../../../helpers/data/userData';
import './AllEvents.scss';

class AllEvents extends React.Component {
    state = {
      events: [],
    }

    componentDidMount() {
      // this data contains more lines that could be displayed, like firstName, lastName, email
      const userId = userData.getLoggedInUserId();
      eventData.getEventsByUserId(userId)
        .then((events) => {
          this.setState({ events });
        })
        .catch((errorFromGetEvents) => console.error({ errorFromGetEvents }));
    }

    render() {
      const { events } = this.state;

      const pastEvents = [];
      const futureEvent = [];
      const now = Date.now();
      (now > events.dateTime) ? futureEvent.push(events) : pastEvents.push(events);

      return (
        <div className="AllEvents">
          <div className="PastEvents">
          Past Events
        { events.map((event) => <SingleEvent key={event.eventId} event={event} />)}
          </div>
          <div className="FutureEvents">
          Future Events
        { events.map((event) => <SingleEvent key={event.eventId} event={event} />)}
          </div>
        </div>
      );
    }
}

export default AllEvents;
