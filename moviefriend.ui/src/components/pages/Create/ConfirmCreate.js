import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import userData from '../../../helpers/data/userData';

export class ConfirmCreate extends Component {
  state = {
    invitedUserName: '',
  }

    continue = (e) => {
      e.preventDefault();
      // PROCESS FORM // API AND METHOD GO HERE
      this.props.nextStep();
    };

    back = (e) => {
      e.preventDefault();
      this.props.prevStep();
    };

    render() {
      const {
        saveMovieEvent,
        values: {
          imdbId,
          dateTime,
          location,
          notes,
          invitedUsers,
          selected,
          possibleInvites,
          names,
        },
      } = this.props;

      return (
        <MuiThemeProvider>
          <React.Fragment>
            <AppBar title="Confirm Invite Information" />
            <List>
              <ListItem
                primaryText="Movie"
                secondaryText={ selected.Title }
              />
              <ListItem
                primaryText="Movie Poster">
              </ListItem>
                <img src={ selected.Poster } alt={ selected.Title }/>
              <ListItem
                primaryText="Date and Time of Event"
                secondaryText={ moment(dateTime).format('lll') }
              />
              <ListItem
                primaryText="Location of Event"
                secondaryText={ location }
              />
              <ListItem
                primaryText="Notes on this event"
                secondaryText={ notes }
              />
              <ListItem
                primaryText="Who you've invited"
                secondaryText={ names }
                // secondaryText={ invitedUsers }
              />
            </List>
            <br/>
            <RaisedButton
              label="Create Event"
              primary={true}
              style={styles.button}
              onClick={saveMovieEvent}
            />
            <RaisedButton
              label="Back"
              primary={false}
              style={styles.button}
              onClick={this.back}
            />
          </React.Fragment>
        </MuiThemeProvider>
      );
    }
}

const styles = {
  button: {
    margin: 15,
  },
};

export default ConfirmCreate;
