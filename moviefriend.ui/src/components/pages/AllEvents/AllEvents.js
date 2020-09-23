import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import moment from 'moment';
import SingleEvent from '../../shared/SingleEvent/SingleEvent';
import SingleHostedEvent from '../../shared/SingleHostedEvent/SingleHostedEvent';
import eventData from '../../../helpers/data/eventData';
import userData from '../../../helpers/data/userData';
import inviteData from '../../../helpers/data/inviteData';
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

    deleteEventAndInviteAndMovie = (eventId) => {
      const userId = userData.getLoggedInUserId();
      eventData.deleteDataEventAndInviteAndMovie(eventId)
        .then(() => {
          eventData.getEventsByHostId(userId)
            .then((hostEvents) => {
              this.setState({ hostEvents });
            })
            .catch((errorFromGetHostEvents) => console.error({ errorFromGetHostEvents }));
        });
    }

    deleteInviteByInviteId = (inviteId) => {
      inviteData.deleteDataInviteByInviteId(inviteId);
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
          <div className="PastEvents">
          <p>Events You've Attended</p>
        {(pastEvents.length === 0)
          ? <p>You haven't attended any movie nights yet.
              <Link to={'/moviedatabase/'}>
                <Button variant="contained" color="secondary">
                You should see if people want to get together.
                </Button>
              </Link>
            </p>
          : pastEvents.map((event) => <SingleEvent key={event.eventId} event={event} />)}
          </div>
          <div className="FutureEvents">
          <p>Events You're Attending</p>
        {(futureEvents.length === 0)
          ? <p>No upcoming events.
              <Link to={'/moviedatabase/'}>
                <Button variant="contained" color="secondary">
                You should see if people want to get together.
                </Button>
              </Link>
            </p>
          : futureEvents.map((event) => <SingleEvent key={event.eventId} event={event} deleteInviteByInviteId={this.deleteInviteByInviteId}/>)}
          </div>
          <div>
          <p>Events You've Hosted</p>
        {(pastHostedEvents.length === 0)
          ? <p>You haven't hosted any movie nights yet.
              <Link to={'/moviedatabase/'}>
                <Button variant="contained" color="primary">
                  It's time to plan one.
              </Button>
            </Link>
          </p>
          : pastHostedEvents.map((event) => <SingleHostedEvent key={event.eventId} event={event} />)}
          </div>
          <div>
          <p>Events You're Hosting</p>
        {(futureHostedEvents.length === 0)
          ? <p>You aren't hosting any movie nights.
            <Link to={'/moviedatabase/'}>
              <Button variant="contained" color="primary">
            It's time to plan one.
              </Button>
            </Link>
          </p>
          : futureHostedEvents.map((event) => <SingleHostedEvent key={event.eventId} event={event} deleteEventAndInviteAndMovie={this.deleteEventAndInviteAndMovie} />)}
          </div>
        </div>
      );
    }
}

export default AllEvents;
