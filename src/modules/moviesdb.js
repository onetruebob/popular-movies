import axios from 'axios';
import settings from './settings';

export const LOAD_MORE_MOVIES = 'moviesdb/LOAD_MORE_MOVIES';
export const ADD_MOVIES = 'moviesdb/ADD_MOVIES';
export const MOVIE_LOADING_FAILED = 'moviesdb/MOVIE_LOADING_FAILED';

const initialState = {
    loadingMovies: true,
    movies: [],
    loadingFailed: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MORE_MOVIES:
            return { ...state, loadingMovies: true, loadingFailed: false };
        case ADD_MOVIES:
            return { ...state, loadingMovies: false, movies: state.movies.concat(action.payload.newMovies) };
        case MOVIE_LOADING_FAILED:
            return { ...state, loadingFailed: true };
        default:
            return state;
    }
};

export const loadMoreMovies = () => dispatch => {
    dispatch({ type: LOAD_MORE_MOVIES });

    axios({ method: 'GET', url: `${settings.moviesRootUrl}/discover/movie?api_key=${settings.moviesDbKey}` })
        .then(moviesResponse => {
            const newMovies = moviesResponse.data.results;
            dispatch({ type: ADD_MOVIES, payload: { newMovies } });
        })
        .catch(error => {
            console.error('error', JSON.stringify(error, null, 2));
            dispatch({ type: MOVIE_LOADING_FAILED });
        });
};
