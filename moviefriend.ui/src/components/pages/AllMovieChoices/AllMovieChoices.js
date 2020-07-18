import React from 'react';
import SingleMovieChoice from '../../shared/SingleMovieChoice/SingleMovieChoice';
import movieChoicesData from '../../../helpers/data/movieChoicesData';
import './AllMovieChoices.scss';

class AllMovieChoices extends React.Component {
    state = {
      movieChoices: [],
    }

    componentDidMount() {
      movieChoicesData.getAllMovieChoices()
        .then((movieChoices) => {
          this.setState({ movieChoices });
        })
        .catch((errorFromGetMovieChoices) => console.error({ errorFromGetMovieChoices }));
    }

    render() {
      const { movieChoices } = this.state;
      return (
        <div className="AllMovieChoices">
        { movieChoices.map((movieChoice) => <SingleMovieChoice key={movieChoice.movieChoicesId} movieChoice={movieChoice} />)}
        </div>
      );
    }
}

export default AllMovieChoices;
