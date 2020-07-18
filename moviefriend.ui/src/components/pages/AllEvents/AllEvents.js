import React from 'react';
import SingleEvent from '../../shared/SingleEvent/SingleEvent';
import eventData from '../../../helpers/data/eventData';
import './AllEvents.scss';

class AllEvents extends React.Component {
    state = {
      events: [],
    }

    componentDidMount() {
      eventData.getAllEvents()
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
