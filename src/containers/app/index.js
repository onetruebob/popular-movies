import React, { Component } from 'react';
import List from '../list';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    loading: state.moviesState.loadingMovies || false
});

class App extends Component {
    render() {
        const { loading } = this.props;
        return (
            <div id="subApp">
                <h2>Popular</h2>
                <List />
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);
