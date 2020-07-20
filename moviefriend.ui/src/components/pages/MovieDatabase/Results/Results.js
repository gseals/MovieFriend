import React from 'react';
import Result from '../Result/Result';

function Results({ results, selected, openPopup }) {
  return (
    <section className="results">
      {results.map((result) => (
        <Result key={result.imdbID} result={result} selected={selected} openPopup={openPopup} />
      ))}
    </section>
  );
}

export default Results;
