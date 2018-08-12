import React, { Component } from 'react';
import Notifications, {notify} from 'react-notify-toast';
import List from '../list';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    loadingFailed: state.moviesState.loadingFailed || false
});

class App extends Component {
    componentDidUpdate() {
        const { loadingFailed } = this.props;
        const notifyDurationMs = 10000;

        if(loadingFailed) {
            notify.show('Could not load data from moviesdb!', 'error', notifyDurationMs);
        }
    }

    render() {

        return (
            <div id="subApp">
                <Notifications />
                <h2 className="splash-title">Popular</h2>
                <List />
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);
