import React from 'react';
import axios from 'axios';
import CreateStepOne from './CreateStepOne';
import { ConfirmCreate } from './ConfirmCreate';
import eventData from '../../../helpers/data/eventData';
import userData from '../../../helpers/data/userData';

import apiKeys from '../../../helpers/apiKeys.json';

import './Create.scss';

const apiUrl = apiKeys.omdbKeys.databaseURL;

class Create extends React.Component {
    state = {
      step: 1,
      possibleInvites: [],
      imdbID: '',
      dateTime: '',
      location: '',
      notes: '',
      invitedUsers: [],
      selected: {},
      names: [],
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

    // Proceed to the next step
    nextStep = () => {
      const { step } = this.state;
      this.setState({
        step: step + 1,
      });
    }

    // Go back to prev step
    prevStep = () => {
      const { step } = this.state;
      this.setState({
        step: step - 1,
        invitedUsers: [],
        names: [],
      });
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

    // Handle fields change
    handleChange = (input) => (e) => {
      this.setState({ [input]: e.target.value });
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
        names: [
          ...this.state.names,
          `${selectedUser.firstName} ${selectedUser.lastName}, `,
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
      const { step } = this.state;
      const {
        possibleInvites,
        dateTime,
        location,
        notes,
        invitedUsers,
        selected,
        firstName,
        lastName,
        names,
      } = this.state;
      const values = {
        possibleInvites,
        dateTime,
        location,
        notes,
        invitedUsers,
        selected,
        firstName,
        lastName,
        names,
      };

      switch (step) {
        case 1:
          return (
            <CreateStepOne
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              openPopup={this.openPopup}
              newInvitedUserAction={this.newInvitedUserAction}
              values={values}
            />
          );
        case 2:
          return (
            <ConfirmCreate
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveMovieEvent={this.saveMovieEvent}
            values={values}
            />
          );
        default:
          return <h2>Something went wrong</h2>;
      }
    }
}

export default Create;
