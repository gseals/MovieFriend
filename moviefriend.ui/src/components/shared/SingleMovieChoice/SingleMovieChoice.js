import React, { Component } from 'react';
import movieChoicesShape from '../../../helpers/propz/movieChoicesShape';
import './SingleMovieChoice.scss';

class SingleMovieChoice extends Component {
    static propTypes = {
      movieChoice: movieChoicesShape.movieChoicesShape,
    }

    render() {
      const { movieChoice } = this.props;
      return (
        <div className="SingleMovieChoice">
            <ul>
                <li>MovieChoiceId: {movieChoice.movieChoicesId}</li>
                <li>movieId: {movieChoice.movieId}</li>
                <li>eventId: {movieChoice.eventId}</li>
                <li>votes: {movieChoice.votes}</li>
            </ul>
        </div>
      );
    }
}

export default SingleMovieChoice;
