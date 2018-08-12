import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from 'react-spinkit';
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
    <div className="fond" align="center">
        <InfiniteScroll
            pageStart={1}
            loadMore={loadMoreMovies}
            hasMore={moreMovies}
            style={{ position: 'relative' }}
            loader={<Spinner name="ball-pulse-sync" color="white" key={0} />}
        >
            {movies.map(movie => <Movie movie={movie} key={movie.id} />)}
        </InfiniteScroll>
    </div>
);

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;
