// frontend using ES25 module
// root file of application 
import 'materialize-css/dist/css/materialize.min.css';
// if don't specify relative path './' in front npm automatically assume a node_module and will look it up inside that folder
// no variable from materialize-css is imported
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
// frontend module different from backend module, so can use import statement, backend uses require statement

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
// 1st reducer (combined)
// 2nd: initial state 
// 3rd: middlewre

ReactDOM.render(
<Provider store={store}><App /></Provider>,

document.querySelector('#root')
);
// expects an instance root app component + where to render to (existing Dom node inside HTML document)
// inside public folder index.html div w/ id root is the very root Dom node, so pass in reference of it like this

// console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
// console.log('ENVIRONMENT IS', process.env.NODE_ENV);