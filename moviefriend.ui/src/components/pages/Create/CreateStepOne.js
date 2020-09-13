import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import OneResult from '../MovieDatabase/Result/OneResult';

class CreateStepOne extends Component {
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
          values,
          handleChange,
          openPopup,
          newInvitedUserAction,
        } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Let's plan your next movie night"/>
                    <h2 className="textColor marginTop">{values.selected.Title}? Excellent choice!</h2>
                    <OneResult
                        key={values.selected.imdbID}
                        selected={values.selected}
                        openPopup={openPopup}
                    />
                    <br/>
                    <Multiselect
                        options={values.possibleInvites.map((invite) => (`${invite.firstName} ${invite.lastName}`))}
                        isObject={false}
                        value={values.invitedUsers}
                        onSelect={newInvitedUserAction}
                        onChange={handleChange('invitedUsers')}
                        required
                    />
                    <br/>
                    {/* <form className={classes.container} noValidate > */}
                    <TextField
                      id="datetime-local"
                      label="Date and Time of event"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                    //   className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange('dateTime')}
                      defaultValue={values.dateTime}
                    />
                    {/* </form> */}
                    <br/>
                    <TextField
                      hintText="Location?"
                      floatingLabelText="Location?"
                      onChange={handleChange('location')}
                      defaultValue={values.location}
                    />
                    <br/>
                    <TextField
                      hintText="Need your invited to know anything?"
                      floatingLabelText="Notes"
                      onChange={handleChange('notes')}
                      defaultValue={values.notes}
                    />
                    <br/>
                    <RaisedButton
                      label="Continue"
                      primary={true}
                      style={styles.button}
                      onClick={this.continue}
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

// const classes = {

// }

export default CreateStepOne;
