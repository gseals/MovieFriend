import React, { Component } from 'react';
import movieShape from '../../../helpers/propz/movieShape';
import './SingleMovie.scss';

class SingleMovie extends Component {
    static propTypes = {
      movie: movieShape.movieShape,
    }

    render() {
      const { movie } = this.props;
      return (
        <div className="SingleMovie">
            <ul>
                <li>MovieId: {movie.movieId}</li>
                <li>Movie Title: {movie.movieTitle}</li>
                <img src={movie.moviePoster} alt={`movie poster for ${movie.movieTitle}`} />
            </ul>
        </div>
      );
    }
}

export default SingleMovie;
