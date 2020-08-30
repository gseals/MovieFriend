import React from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

import eventData from '../../../helpers/data/eventData';
import userData from '../../../helpers/data/userData';

import './Update.scss';

class Update extends React.Component {
  state = {
    possibleInvites: [],
    imdbID: '',
    dateTime: '',
    location: '',
    notes: '',
    invitedUsers: [],
    newInvitedUsers: [],
    moviePoster: '',
    movieTitle: '',
    dateEventCreated: '',
  }

    allPossibleInvites = () => {
      const userId = userData.getLoggedInUserId();
      const noHost = [];
      userData.getAllUsers()
        .then((invites) => {
          for (let i = 0; i < invites.length; i += 1) {
            if (invites[i].userId !== userId) {
              noHost.push(invites[i]);
            }
          }
          this.setState({ possibleInvites: noHost });
        })
        .catch((err) => console.error('error in get items'));
    }

    thisOneEvent = () => {
      const { eventId } = this.props.match.params;
      eventData.getEventsByEventId(eventId)
        .then((response) => {
          const event = response[0];
          this.setState({
            imdbID: event.movieDBId,
            dateTime: event.dateTime,
            location: event.location,
            notes: event.notes,
            moviePoster: event.moviePoster,
            movieTitle: event.movieTitle,
            dateEventCreated: event.dateEventCreated,
          });
        })
        .catch((err) => console.error('error with thisOneEvent', err));
    }

    componentDidMount() {
      this.allPossibleInvites();
      this.thisOneEvent();
    }

    updatedDateAndTimeOfEventAction = (e) => {
      e.preventDefault();
      this.setState({ dateTime: e.target.value });
    }

    updatedLocationAction = (e) => {
      e.preventDefault();
      this.setState({ location: e.target.value });
    }

    updatedNotesAction = (e) => {
      e.preventDefault();
      this.setState({ notes: e.target.value });
    }

    updatedInvitedUserAction = (selectedItems, lastSelectedItem) => {
      const selectedFirstName = lastSelectedItem.split(' ')[0];
      const selectedLastName = lastSelectedItem.split(' ')[1];
      const selectedUser = this.state.possibleInvites.find((user) => user.firstName === selectedFirstName && user.lastName === selectedLastName);
      this.setState({
        newInvitedUsers: [
          ...this.state.newInvitedUsers,
          selectedUser.userId,
        ],
      });
    }

    updateMovieEvent = (e) => {
      e.preventDefault();
      const { eventId } = this.props.match.params;
      const { imdbID } = this.state;
      const userId = userData.getLoggedInUserId();
      const updatedEvent = {
        movieDBId: imdbID,
        hostId: userId,
        dateTime: this.state.dateTime,
        location: this.state.location,
        dateEventCreated: this.state.dateEventCreated,
        notes: this.state.notes,
        invitedUsers: this.state.newInvitedUsers,
        movieTitle: this.state.movieTitle,
        moviePoster: this.state.moviePoster,
      };
      eventData.createNewEventAndMovieAndInvite(updatedEvent);
      eventData.deleteDataEventAndInviteAndMovie(eventId)
        .then(() => this.props.history.push('/movieNights'))
        .catch((err) => console.error('error from save new event', err));
    }

    render() {
      const {
        possibleInvites,
        dateTime,
        location,
        notes,
        newInvitedUsers,
        moviePoster,
        movieTitle,
      } = this.state;

      return (
        <div>
        <div className="Create col-10 m-auto">
        <h1 className="textColor marginTop">Let's update your movie night</h1>
        <form onSubmit={this.updateMovieEvent} className="Create col-6 m-auto">
        <div className="centered">
        <h2 className="textColor marginTop">{movieTitle} is still a great choice!</h2>
        <div className='card2'>
            <div className='card-inner2'>
                <div className='card-front2'>
                    <img src={moviePoster} alt={movieTitle} />
                </div>
            </div>
            </div>
        </div>
        <div className="form-group">
          <h3><label htmlFor="dateTime"></label></h3>
          <input
          type="datetime-local"
          className="form-control"
          id="dateTime"
          placeholder="Date and Time of event"
          value={dateTime}
          onChange={this.updatedDateAndTimeOfEventAction}
          required
          />
        </div>
        <div className="form-group">
        <h5><label htmlFor="invites">Let's redo that invite list while we're at it</label></h5>
        <Multiselect
          type="text"
          className="form-control"
          id="invites"
          options={possibleInvites.map((invite) => (`${invite.firstName} ${invite.lastName}`))}
          isObject={false}
          value={newInvitedUsers}
          onSelect={this.updatedInvitedUserAction}
          required
        />
        </div>
        <div className="form-group">
          <h3><label htmlFor="location"></label></h3>
          <input
          type="text"
          className="form-control"
          id="location"
          placeholder="Location?"
          value={location}
          onChange={this.updatedLocationAction}
          required
          />
        </div>
        <div className="form-group">
          <h3><label htmlFor="notes"></label></h3>
          <textarea
          type="text"
          className="form-control"
          id="notes"
          placeholder="Notes"
          value={notes}
          onChange={this.updatedNotesAction}
          required
          />
        </div>
        <button type="submit" className="btn btn-success">Update your movie night</button>
      </form>
      </div>
            </div>
      );
    }
}

export default Update;
