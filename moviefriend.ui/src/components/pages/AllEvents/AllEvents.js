import React from 'react';
import SingleEvent from '../../shared/SingleEvent/SingleEvent';
import eventData from '../../../helpers/data/eventData';
import userData from '../../../helpers/data/userData';
import './AllEvents.scss';

class AllEvents extends React.Component {
    state = {
      events: [],
    }

    // getEventsByEventId(events.eventId)
    // .then((event) => {
    //   this.setState({ event });
    // })
    // .catch((errorFromGetEventsByEventId) => console.error({ errorFromGetEventsByEventId }));

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
      return (
        <div className="AllEvents">
        { events.map((event) => <SingleEvent key={event.eventId} event={event} />)}
        </div>
      );
    }
}

export default AllEvents;
