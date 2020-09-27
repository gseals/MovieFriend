import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
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
        <MuiThemeProvider>
          <AppBar title="Your Events" showMenuIconButton={false}/>
          <br/>
        <div className="AllEvents">
          <div className="PastEvents">
          <Button variant="contained" className="event-title">Events You've Attended</Button>
          <br/>
          <br/>

        {(pastEvents.length === 0)
          ? <Link to={'/moviedatabase/'}>
                <Button variant="contained" color="secondary">
                You haven't attended any movie nights yet. You should see if people want to get together.
                </Button>
              </Link>
          : pastEvents.map((event) => <SingleEvent key={event.eventId} event={event} />)}
          </div>
          <br/>
          <div className="FutureEvents">
          <Button variant="contained" className="event-title">Events You're Attending</Button>
          <br/>
          <br/>
        {(futureEvents.length === 0)
          ? <Link to={'/moviedatabase/'}>
                <Button variant="contained" color="secondary">
                No upcoming events. You should see if people want to get together.
                </Button>
              </Link>
          : futureEvents.map((event) => <SingleEvent key={event.eventId} event={event} deleteInviteByInviteId={this.deleteInviteByInviteId}/>)}
          </div>
          <br/>
          <div>
            <Button variant="contained" className="event-title">Events You've Hosted</Button>
            <br/>
            <br/>
        {(pastHostedEvents.length === 0)
          ? <Link to={'/moviedatabase/'}>
                <Button variant="contained" color="primary">
                You haven't hosted any movie nights yet. It's time to plan one.
              </Button>
            </Link>
          : pastHostedEvents.map((event) => <SingleHostedEvent key={event.eventId} event={event} />)}
          </div>
          <br/>
          <div>
            <Button variant="contained" className="event-title">Events You're Hosting</Button>
            <br/>
            <br/>
        {(futureHostedEvents.length === 0)
          ? <Link to={'/moviedatabase/'}>
              <Button variant="contained" color="primary">
              You aren't hosting any movie nights. It's time to plan one.
              </Button>
            </Link>
          : futureHostedEvents.map((event) => <SingleHostedEvent key={event.eventId} event={event} deleteEventAndInviteAndMovie={this.deleteEventAndInviteAndMovie} />)}
          </div>
        </div>
        </MuiThemeProvider>
      );
    }
}

export default AllEvents;
