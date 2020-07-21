import React from 'react';
import SingleEvent from '../../shared/SingleEvent/SingleEvent';
import { getAllEvents, getEventsByEventId } from '../../../helpers/data/eventData';
import './AllEvents.scss';

class AllEvents extends React.Component {
    state = {
      events: [],
    }

    getAllEventsInComponent = () => {
      getAllEvents()
        .then((event) => {
          this.setState({ event });
        })
        .catch((errorFromGetEvents) => console.error({ errorFromGetEvents }));
    }

    componentDidMount() {
      const { events } = this.state;
      getEventsByEventId(events.eventId)
        .then((event) => {
          this.setState({ event });
        })
        .catch((errorFromGetEventsByEventId) => console.error({ errorFromGetEventsByEventId }));
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
