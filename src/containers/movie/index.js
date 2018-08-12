import React from 'react';

const Movie = ({ movie, isHovering }) => (
    <div key={movie.id} className="outer-movie-container">
        <div
            style={{
                backgroundImage: `url(${movie.posterUrl})`,
                backgroundSize: '100%',
                width: '196px',
                height: '294px',
                display: 'flex'
            }}
        >
            <div className="title-background">{movie.title}</div>
        </div>
    </div>
);

export default Movie;
