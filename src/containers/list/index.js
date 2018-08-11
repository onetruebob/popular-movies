import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { loadMoreMovies } from '../../modules/moviesdb';

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
    <ul>
        <InfiniteScroll pageStart={1} loadMore={loadMoreMovies} hasMore={moreMovies}>
            {movies.length ? movies.map(movie => <div key={movie.id}><img src={movie.posterUrl} /></div>) : <div>No movies</div>}
        </InfiniteScroll>
    </ul>
);

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;
