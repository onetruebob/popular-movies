import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import List from '../list';
import { connect } from 'react-redux';
import { loadMoreMovies } from '../../modules/moviesdb';

const mapStateToProps = state => ({
    loading: state.moviesState.loadingMovies || false
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadMoreMovies
        },
        dispatch
    );

class App extends Component {
    componentDidMount() {
        this.props.loadMoreMovies();
    }

    render() {
        const { loading } = this.props;
        return (
            <div id="subApp">
                <h2>Validating redux setup with thunks</h2>
                {loading ? <h2>I'm loading them</h2> : ''}
                <h3>Movies</h3>
                <List />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
