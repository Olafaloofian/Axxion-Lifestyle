import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './ducks/store'
// import { connect } from 'react-redux'

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();

// const mapStateToProps = (store) => {
//     return {
//         login: store.login
//     }
// }

// connect(mapStateToProps)
