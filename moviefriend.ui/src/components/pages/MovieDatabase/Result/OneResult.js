import React from 'react';
import posterImage from '../../../../img/noPoster.jpg';

// on this page, I wrote the ternary for "N/A"

function OneResult({ selected, openPopup }) {
  return (
        <div className='card'>
            <div className='card-inner'>
                <div className='card-front'>
                    <img src=
                    {(selected.Poster !== 'N/A')
                      ? selected.Poster
                      : posterImage} alt={selected.Title} onMouseEnter={() => openPopup(selected.imdbID)} />
                </div>
                <div className='card-back'>
                    <h2>{selected.Title} ({ selected.Year })</h2>
                    <ul>
                    <li>IMDB Rating: {selected.imdbRating} based on {selected.imdbVotes} votes</li>
                    <li>Runtime: {selected.Runtime}</li>
                    <li>Genre: {selected.Genre}</li>
                        <li>Directed by: {(selected.Director !== 'N/A')
                          ? selected.Director
                          : 'Various'}</li>
                        <li>Plot: {(selected.Plot !== 'N/A')
                          ? selected.Plot
                          : 'There is no plot listed for this movie, but just imagine how cool it would be if there were.'}</li>
                    </ul>
                </div>
            </div>
        </div>
  );
}

export default OneResult;
