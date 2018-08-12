import axios from 'axios';
import settings from './settings';

export const LOAD_MORE_MOVIES = 'moviesdb/LOAD_MORE_MOVIES';
export const ADD_MOVIES = 'moviesdb/ADD_MOVIES';
export const MOVIE_LOADING_FAILED = 'moviesdb/MOVIE_LOADING_FAILED';
export const LAST_MOVIE_LOADED = 'moviesdb/LAST_MOVIE_LOADED';

const initialState = {
    loadingMovies: true,
    movies: [],
    more: true,
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
        case LAST_MOVIE_LOADED:
            return { ...state, more: false };
        default:
            return state;
    }
};

let posterBaseUrl = undefined;
const timeoutDurationMs = 3000;

export const loadMoreMovies = (page = 1) => dispatch => {
    dispatch({ type: LOAD_MORE_MOVIES });

    const posterUrlPromise = posterBaseUrl
        ? Promise.resolve(posterBaseUrl)
        : axios({
              method: 'GET',
              timeout: timeoutDurationMs,
              url: `${settings.moviesRootUrl}/configuration?api_key=${settings.moviesDbKey}`
          }).then(({ data: configuration }) => {
              const { base_url: baseUrl } = configuration.images;
              posterBaseUrl = baseUrl;
              return baseUrl;
          });

    posterUrlPromise
        .then(() =>
            axios({
                method: 'GET',
                timeout: timeoutDurationMs,
                url: `${settings.moviesRootUrl}/discover/movie?api_key=${settings.moviesDbKey}&page=${page}`
            })
        )
        .then(moviesResponse => {
            const { results: rawMovies, page, pages } = moviesResponse.data;
            if (page === pages) {
                dispatch({ type: LAST_MOVIE_LOADED });
            }

            const newMovies = rawMovies.map(movie => {
                const { poster_path } = movie;
                if (!!poster_path) {
                    return { ...movie, posterUrl: `${posterBaseUrl}w500${poster_path}` };
                }
                return movie;
            });
            dispatch({ type: ADD_MOVIES, payload: { newMovies } });
        })
        .catch(error => {
            console.error('error', JSON.stringify(error, null, 2));
            dispatch({ type: MOVIE_LOADING_FAILED });
        });
};
