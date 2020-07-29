import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import SingleEvent from '../../shared/SingleEvent/SingleEvent';
import SingleHostedEvent from '../../shared/SingleHostedEvent/SingleHostedEvent';
import eventData from '../../../helpers/data/eventData';
import userData from '../../../helpers/data/userData';
import './AllEvents.scss';

class AllEvents extends React.Component {
    state = {
      events: [],
      hostEvents: [],
    }

    componentDidMount() {
      // this data contains more lines that could be displayed, like firstName, lastName, email
      const userId = userData.getLoggedInUserId();
      eventData.getEventsByUserId(userId)
        .then((events) => {
          this.setState({ events });
        })
        .catch((errorFromGetEvents) => console.error({ errorFromGetEvents }));
      eventData.getEventsByHostId(userId)
        .then((hostEvents) => {
          this.setState({ hostEvents });
        })
        .catch((errorFromGetHostEvents) => console.error({ errorFromGetHostEvents }));
    }

    render() {
      const { events, hostEvents } = this.state;
      // just look at that conditional. it works so well.
      const pastEvents = [];
      const futureEvents = [];
      const now = Date.now();
      for (let i = 0; i < events.length; i += 1) {
        if (new Date() > (moment(events[i].dateTime))) {
          pastEvents.push(events[i]);
        } else {
          futureEvents.push(events[i]);
        }
      }

      const pastHostedEvents = [];
      const futureHostedEvents = [];
      for (let i = 0; i < hostEvents.length; i += 1) {
        if (new Date() > (moment(hostEvents[i].dateTime))) {
          pastHostedEvents.push(hostEvents[i]);
        } else {
          futureHostedEvents.push(hostEvents[i]);
        }
      }

      return (
        <div className="AllEvents">
          <div>
          <Link className="nav-link navFont btn btn-info" to="/movieNights/create">Read to plan your next movie night?</Link>
          </div>
          <div className="PastEvents">
          <p>Past Events</p>
        { pastEvents.map((event) => <SingleEvent key={event.eventId} event={event} />)}
          </div>
          <div className="FutureEvents">
          <p>Future Events</p>
        { futureEvents.map((event) => <SingleEvent key={event.eventId} event={event} />)}
          </div>
          <div>
          <p>Events You've Hosted in the Past</p>
        { pastHostedEvents.map((event) => <SingleHostedEvent key={event.eventId} event={event} />)}
          </div>
          <div>
          <p>Upcoming Events You are Hosting</p>
        { futureHostedEvents.map((event) => <SingleHostedEvent key={event.eventId} event={event} />)}
          </div>
        </div>
      );
    }
}

export default AllEvents;
