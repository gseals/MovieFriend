import React, { useState } from 'react';
import axios from 'axios';
import Search from '../Search/Search';
import Results from '../Results/Results';

import apiKeys from '../../../../helpers/apiKeys.json';

function MovieDatabase() {
  const [state, setState] = useState({
    s: '',
    results: [],
    selected: {},
  });

  const apiUrl = apiKeys.omdbKeys.databaseURL;

  const search = (e) => {
    const s = e.target.value;
    if (e.key === 'Enter' && s.length !== 0) {
      axios(`${apiUrl}&s=${state.s}`).then(({ data }) => {
        if (data.Search === undefined || 0) {
          alert('Please enter a legitimate search');
        } else {
          const result = data.Search;
          setState((prevState) => ({ ...prevState, results: result }));
        }
      });
    }
  };

  const openPopup = (id) => {
    axios(`${apiUrl}&i=${id}`).then(({ data }) => {
      const result = data;
      setState((prevState) => ({ ...prevState, selected: result }));
    });
  };

  const handleInput = (e) => {
    const s = e.target.value;
    setState((prevState) => ({ ...prevState, s }));
  };

  return (
    <div className="App">
      <header>
        <h1><span>Movie Database</span></h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} selected={state.selected} openPopup={openPopup} />
      </main>
    </div>
  );
}

export default MovieDatabase;
