import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

export class ConfirmCreate extends Component {
  state = {
    invitedUserName: '',
  }

    continue = (e) => {
      e.preventDefault();
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
