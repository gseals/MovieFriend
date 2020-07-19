import React from 'react';

function Popup({ selected, closePopup }) {
  return (
    <section className="popup">
      <div className="content">
        <h2>{selected.Title} <span>({ selected.Year })</span></h2>
        <p className="rating">IMDB Rating: {selected.imdbRating}</p>
        <div className="plot">
          <img src={selected.Poster} alt={selected.Title}/>
          <div className="text">
            <p>Directed by: {selected.Director}</p>
            <p>Starring: {selected.Actors}</p>
            <p>{selected.Plot}</p>
          </div>
        </div>
        <div className="closeBtn">
        <button className="close" onClick={closePopup}>Close</button>
        </div>
      </div>
    </section>
  );
}

export default Popup;
