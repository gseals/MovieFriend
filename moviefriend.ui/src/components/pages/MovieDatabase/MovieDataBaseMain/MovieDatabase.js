import React, { useState } from 'react';
import axios from 'axios';
import Search from '../Search/Search';
import Results from '../Results/Results';
import Popup from '../Popup/Popup';

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

  const handleInput = (e) => {
    const s = e.target.value;
    setState((prevState) => ({ ...prevState, s }));
  };

  const openPopup = (id) => {
    axios(`${apiUrl}&i=${id}`).then(({ data }) => {
      const result = data;
      setState((prevState) => ({ ...prevState, selected: result }));
    });
  };

  const closePopup = () => {
    setState((prevState) => ({ ...prevState, selected: {} }));
  };

  return (
    <div className="App">
      <header>
        <h1><span>React Movie Database</span></h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search}/>
        <Results results={state.results} openPopup={openPopup}/>

        {(typeof state.selected.Title != 'undefined')
          ? <Popup selected={state.selected} closePopup={closePopup} />
          : false}
      </main>
    </div>
  );
}

export default MovieDatabase;
