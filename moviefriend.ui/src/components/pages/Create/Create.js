import React from 'react';

import { Multiselect } from 'multiselect-react-dropdown';

import eventData from '../../../helpers/data/eventData';
import userData from '../../../helpers/data/userData';
import date from '../../../helpers/data/date';
import './Create.scss';

class Create extends React.Component {
    state = {
      possibleInvites: [],
      movieDBId: '',
      dateTime: '',
      location: '',
      notes: '',
      invitedUsers: [],
      movieTitle: '',
      moviePoster: '',
    }

    allPossibleInvites = () => {
      userData.getAllUsers()
        .then((invites) => this.setState({ possibleInvites: invites }))
        .catch((err) => console.error('error in get items'));
    }

    componentDidMount() {
      this.allPossibleInvites();
    }

    newMovieDBIdAction = (e) => {
      e.preventDefault();
      this.setState({ movieDBId: e.target.value });
    }

    newDateAndTimeOfEventAction = (e) => {
      e.preventDefault();
      this.setState({ dateTime: e.target.value });
    }

    newLocationAction = (e) => {
      e.preventDefault();
      this.setState({ location: e.target.value });
    }

    newNotesAction = (e) => {
      e.preventDefault();
      this.setState({ notes: e.target.value });
    }

    newInvitedUserAction = (e) => {
      e.preventDefault();
      this.setState({ invitedUsers: e.target.value });
    }

    newMovieTitleAction = (e) => {
      e.preventDefault();
      this.setState({ movieTitle: e.target.value });
    }

    newMoviePosterAction = (e) => {
      e.preventDefault();
      this.setState({ moviePoster: e.target.value });
    }

    saveMovieEvent = (e) => {
      e.preventDefault();
      const newEvent = {
        movieDBId: this.state.movieDBId,
        hostId: userData.getLoggedInUserId(),
        dateTime: this.state.dateTime,
        location: this.state.location,
        dateEventCreated: date.createDate(),
        notes: this.state.notes,
        invitedUsers: this.state.invitedUsers,
        movieTitle: this.state.movieTitle,
        moviePoster: this.state.moviePoster,
      };
      eventData.createNewEventAndMovieAndInvite(newEvent)
        .then(() => this.props.history.push('/movieDatabase'))
        .catch((err) => console.error('error from save new event', err));
    }

    render() {
      const {
        possibleInvites,
        movieDBId,
        dateTime,
        location,
        notes,
        invitedUsers,
        movieTitle,
        moviePoster,
      } = this.state;

      return (
        <div>
        <div className="Create col-10 m-auto">
        <h1 className="textColor marginTop">Let's plan your next movie night</h1>
        <form onSubmit={this.saveMovieEvent} className="Create col-6 m-auto">
        <div className="form-group">
          <h3><label htmlFor="movieDBId"></label></h3>
          <textarea
          type="text"
          className="form-control"
          id="movieDBId"
          placeholder="MovieDBId"
          value={movieDBId}
          onChange={this.newMovieDBIdAction}
          required
          />
        </div>
        <div className="form-group">
          <h3><label htmlFor="dateTime"></label></h3>
          <input
          type="datetime-local"
          className="form-control"
          id="dateTime"
          placeholder="Date and Time of event"
          value={dateTime}
          onChange={this.newDateAndTimeOfEventAction}
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
          onChange={this.newLocationAction}
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
          onChange={this.newNotesAction}
          required
          />
        </div>
        <div className="form-group">
        <h5><label htmlFor="invites">Who are you inviting?</label></h5>
        <Multiselect
          type="text"
          className="form-control"
          id="invites"
          options={possibleInvites}
          isObject={false}
          value={invitedUsers}
          onChange={this.newInvitedUserAction}
          required
        />
        </div>
        <div className="form-group">
          <h3><label htmlFor="movieTitle"></label></h3>
          <textarea
          type="text"
          className="form-control"
          id="movieTitle"
          placeholder="Movie Title"
          value={movieTitle}
          onChange={this.newMovieTitleAction}
          required
          />
        </div>
        <div className="form-group">
          <h3><label htmlFor="moviePoster"></label></h3>
          <textarea
          type="text"
          className="form-control"
          id="moviePoster"
          placeholder="Movie Poster"
          value={moviePoster}
          onChange={this.newMoviePosterAction}
          required
          />
        </div>
        <button type="submit" className="btn btn-success">Create that movie night</button>
      </form>
      </div>
            </div>
      );
    }
}

export default Create;
