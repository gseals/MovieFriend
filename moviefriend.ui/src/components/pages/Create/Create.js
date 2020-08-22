import React from 'react';
import axios from 'axios';
import { Multiselect } from 'multiselect-react-dropdown';

import OneResult from '../MovieDatabase/Result/OneResult';

import eventData from '../../../helpers/data/eventData';
import userData from '../../../helpers/data/userData';

import apiKeys from '../../../helpers/apiKeys.json';

import './Create.scss';

const apiUrl = apiKeys.omdbKeys.databaseURL;

class Create extends React.Component {
    state = {
      possibleInvites: [],
      imdbID: '',
      dateTime: '',
      location: '',
      notes: '',
      invitedUsers: [],
      selected: {},
    }

    allPossibleInvites = () => {
      userData.getAllUsers()
        .then((invites) => {
          this.setState({ possibleInvites: invites });
        })
        .catch((err) => console.error('error in get items'));
    }

    selectedMovie = () => {
      const { imdbID } = this.props.match.params;
      axios(`${apiUrl}&i=${imdbID}`).then(({ data }) => {
        const result = data;
        this.setState({
          selected: result,
        });
      });
    }

    componentDidMount() {
      this.allPossibleInvites();
      this.selectedMovie();
    }

    openPopup = (id) => {
      axios(`${apiUrl}&i=${id}`).then(({ data }) => {
        const result = data;
        this.setState((prevState) => ({ ...prevState, selected: result }));
      });
    };

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

    newInvitedUserAction = (selectedItems, lastSelectedItem) => {
      const selectedFirstName = lastSelectedItem.split(' ')[0];
      const selectedLastName = lastSelectedItem.split(' ')[1];
      const selectedUser = this.state.possibleInvites.find((user) => user.firstName === selectedFirstName && user.lastName === selectedLastName);
      this.setState({
        invitedUsers: [
          ...this.state.invitedUsers,
          selectedUser.userId,
        ],
      });
    }

    saveMovieEvent = (e) => {
      e.preventDefault();
      const { imdbID } = this.props.match.params;
      const newEvent = {
        movieDBId: imdbID,
        hostId: userData.getLoggedInUserId(),
        dateTime: this.state.dateTime,
        location: this.state.location,
        dateEventCreated: new Date(),
        notes: this.state.notes,
        invitedUsers: this.state.invitedUsers,
        movieTitle: this.state.selected.Title,
        moviePoster: this.state.selected.Poster,
      };
      eventData.createNewEventAndMovieAndInvite(newEvent)
        .then(() => this.props.history.push('/movieNights'))
        .catch((err) => console.error('error from save new event', err));
    }

    render() {
      const {
        possibleInvites,
        dateTime,
        location,
        notes,
        invitedUsers,
        selected,
      } = this.state;

      return (
        <div>
        <div className="Create col-10 m-auto">
        <h1 className="textColor marginTop">Let's plan your next movie night</h1>
        <form onSubmit={this.saveMovieEvent} className="Create col-6 m-auto">
        <div className="centered">
        <h2 className="textColor marginTop">{selected.Title}? Excellent choice!</h2>
        <OneResult
          key={selected.imdbID}
          selected={selected}
          openPopup={this.openPopup}
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
        <h5><label htmlFor="invites">Who are you inviting?</label></h5>
        <Multiselect
          type="text"
          className="form-control"
          id="invites"
          options={possibleInvites.map((invite) => (`${invite.firstName} ${invite.lastName}`))}
          isObject={false}
          value={invitedUsers}
          onSelect={this.newInvitedUserAction}
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
        <button type="submit" className="btn btn-success">Create that movie night</button>
      </form>
      </div>
            </div>
      );
    }
}

export default Create;
