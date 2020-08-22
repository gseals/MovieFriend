import React from 'react';

import { Paper, TextField } from '@material-ui/core';

function Search({ handleInput, search }) {
  return (
    <React.Fragment>
      <Paper elevation={6} style={{ padding: '25px' }} className="searchbox-wrap">
          <form></form>
        <TextField
          fullWidth
          type="text"
          label="Type a keyword and then press enter"
          className="searchbox"
          onChange={handleInput}
          onKeyPress={search}
          />
      </Paper>
      <h1>Click on a movie to begin planning your night</h1>
    </React.Fragment>
  );
}

export default Search;
