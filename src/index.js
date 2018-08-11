import stringUpper from './upper';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/app';

import store from './store';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { name: 'React' };
    }
    handleChange(e) {
        this.setState({ name: e.target.value });
    }
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

ReactDOM.render(<Welcome />, document.getElementById('app'));
