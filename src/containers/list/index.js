import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { loadMoreMovies } from '../../modules/moviesdb';
import Movie from '../movie';

const mapStateToProps = state => ({
    movies: state.moviesState.movies || [],
    moreMovies: state.moviesState.more
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadMoreMovies
        },
        dispatch
    );

const ConnectedList = ({ movies, moreMovies, loadMoreMovies }) => (
    <div>
        <InfiniteScroll pageStart={1} loadMore={loadMoreMovies} hasMore={moreMovies} style={{ position: 'relative' }}>
            {movies.length ? (
                movies.map(movie => (
                        <Movie movie={movie} key={movie.id} />
                ))
            ) : (
                <div>No movies</div>
            )}
        </InfiniteScroll>
    </div>
);

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;
