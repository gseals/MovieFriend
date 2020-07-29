import React from 'react';
import eventData from '../../../helpers/data/eventData';
import userData from '../../../helpers/data/userData';
import './Create.scss';

class Create extends React.Component {
    state = {
      movieDBId: '',
      hostId: '',
      dateTime: '',
      location: '',
      dateEventCreated: '',
      notes: '',
      invitedUsers: [],
      movieTitle: '',
      moviePoster: '',
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

    newInvtiedUserAction = (e) => {
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
		dateEventCreated: 
      };
      eventData.saveMovieEvent(newEvent)
        .then(() => this.props.history.push('/movieDatabase'))
        .catch((err) => console.error('error from save new event', err));
    }

    render() {

      const {
        movieDBId,
        hostId,
        dateTime,
        location,
        dateEventCreated,
        notes,
        invitedUsers,
        movieTitle,
        moviePoster,
      } = this.state;

      return (
            <div>
                Test
            </div>
      );
    }
}

export default Create;
