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
    </React.Fragment>
  );
}

export default Search;
