import React from 'react';
import ReactHoverObserver from 'react-hover-observer';

const Movie = ({ movie, isHovering }) => (
    <ReactHoverObserver key={movie.id} className="outer-movie-container">
        {({ isHovering }) => <img src={movie.posterUrl} width="196"/>}
    </ReactHoverObserver>
);

export default Movie;
