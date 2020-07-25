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
      const futureEvents = [];
      // const now = Date.now();
      console.log(events.length);
      console.log(events[0]);
      console.log(new Date());
      for (let i = 0; i < events.length; i += 1) {
        if (new Date() > (moment(events[i].dateTime).format('LLLL'))) {
          pastEvents.push(events[i]);
        } else {
          futureEvents.push(events[i]);
        }
      }

      return (
        <div className="AllEvents">
          {/* <div className="PastEvents">
          All Events
        { events.map((event) => <SingleEvent key={event.eventId} event={event} />)}
          </div> */}
          <div className="PastEvents">
          Past Events
        { pastEvents.map((event) => <SingleEvent key={event.eventId} event={event} />)}
          </div>
          <div className="FutureEvents">
          Future Events
        { futureEvents.map((event) => <SingleEvent key={event.eventId} event={event} />)}
          </div>
        </div>
      );
    }
}

export default AllEvents;
