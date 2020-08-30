import React from 'react';
import { Link } from 'react-router-dom';
import posterImage from '../../../../img/noPoster.jpg';

// on this page, I wrote the ternary for "N/A"

function Result({ result, selected, openPopup }) {
  return (
    <Link to={`/movieNights/${result.imdbID}/create`}>
    <div className='card'>
        <div className='card-inner'>
            <div className='card-front'>
                <img src=
                {(result.Poster !== 'N/A')
                  ? result.Poster
                  : posterImage}
                alt={result.Title} onMouseEnter={() => openPopup(result.imdbID)} />
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
                        <li>Plot: {(selected.Plot !== 'N/A')
                          ? selected.Plot
                          : 'There is no plot listed for this movie, but just imagine how cool it would be if there were.'}</li>
                </ul>
            </div>
        </div>
    </div>
    </Link>
  );
}

export default Result;
