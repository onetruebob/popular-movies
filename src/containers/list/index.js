import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    movies: state.moviesState.movies || []
});

const ConnectedList = ({ movies }) => (
    <ul>
        {movies.length ? movies.map(movie => <li key={movie.id}>{movie.title}</li>) : <li>No movies</li>}
    </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;

//<li key={movie.id}>{movie.title}</li>
