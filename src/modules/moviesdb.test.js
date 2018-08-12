import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as moviesdb from './moviesdb';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';
import settings from './settings';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new MockAdapter(axios);

const configruationResult = {
    images: {
        base_url: 'http://image.tmdb.org/t/p/',
        secure_base_url: 'https://image.tmdb.org/t/p/',
        backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
        logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
        poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
        profile_sizes: ['w45', 'w185', 'h632', 'original'],
        still_sizes: ['w92', 'w185', 'w300', 'original']
    }
};

const movieRaw = {
    vote_count: 6614,
    id: 299536,
    video: false,
    vote_average: 8.3,
    title: 'Avengers: Infinity War',
    popularity: 311.704,
    poster_path: '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
    original_language: 'en',
    original_title: 'Avengers: Infinity War',
    genre_ids: [12, 878, 14, 28],
    backdrop_path: '/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg',
    adult: false,
    overview:
        'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.',
    release_date: '2018-04-25'
};

const movieWithImageUrl = { ...movieRaw, posterUrl: 'http://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg' };

const moviesResult = {
    page: 1,
    total_results: 373924,
    total_pages: 18697,
    results: [movieRaw]
};

const expectedResult = { newMovies: [movieWithImageUrl] };

const movieResults = describe('async actions', () => {
    afterEach(() => {
        axiosMock.reset();
        axiosMock.restore();
    });

    it('creates ADD_MOVIES when fetching call to movies returns with data', () => {
        axiosMock
            .onGet(`https://api.themoviedb.org/3/configuration?api_key=${settings.moviesDbKey}`)
            .reply(200, configruationResult);

        axiosMock
            .onGet(`https://api.themoviedb.org/3/discover/movie?api_key=${settings.moviesDbKey}&page=1`)
            .reply(200, moviesResult);

        const expectedActions = [
            { type: moviesdb.LOAD_MORE_MOVIES },
            { type: moviesdb.ADD_MOVIES, payload: expectedResult }
        ];
        const store = mockStore({ todos: [] });
        const page = 1;

        return store.dispatch(moviesdb.loadMoreMovies(page)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
