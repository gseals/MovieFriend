import React from 'react';
import SingleMovie from '../../shared/SingleMovie/SingleMovie';
import movieData from '../../../helpers/data/movieData';
import './AllMovies.scss';

class AllMovies extends React.Component {
    state = {
      movies: [],
    }

    componentDidMount() {
      movieData.getAllMovies()
        .then((movies) => {
          this.setState({ movies });
        })
        .catch((errorFromGetMovies) => console.error({ errorFromGetMovies }));
    }

    render() {
      const { movies } = this.state;
      return (
        <div className="AllMovies">
        { movies.map((movie) => <SingleMovie key={movie.movieId} movie={movie} />)}
        </div>
      );
    }
}

export default AllMovies;
