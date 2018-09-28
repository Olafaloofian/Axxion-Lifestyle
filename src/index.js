import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './ducks/store'
import { AppContainer } from 'react-hot-loader';


const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </AppContainer>, 
    document.getElementById('root'));
}

render()

if (module.hot) {
    module.hot.accept('./App', () => {
        render();
    });
}