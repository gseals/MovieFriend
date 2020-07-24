import React from 'react';

// on this page, I wrote the ternary for "N/A"

function Result({ result, selected, openPopup }) {
  return (
    <div className='card'>
        <div className='card-inner'>
            <div className='card-front'>
                <img src={result.Poster} alt={result.Title} onMouseEnter={() => openPopup(result.imdbID)} />
            </div>
            <div className='card-back'>
                <h2>{result.Title} ({ result.Year })</h2>
                <ul>
                <li>IMDB Rating: {selected.imdbRating} based on {selected.imdbVotes} votes</li>
                <li>Runtime: {selected.Runtime}</li>
                <li>Genre: {selected.Genre}</li>
                    <li>Directed by: {(selected.Director !== 'N/A')
                      ? selected.Director
                      : 'Various'}</li>
                    <li>{selected.Plot}</li>
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Result;
