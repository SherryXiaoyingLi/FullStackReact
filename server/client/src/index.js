// root file of application 
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
// frontend module different from backend module, so can use import statement, backend uses require statement

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware());
// 1st reducer (combined)
// 2nd: initial state 
// 3rd: middlewre

ReactDOM.render(
<Provider store={store}><App /></Provider>,

document.querySelector('#root')
);
// expects an instance root app component + where to render to (existing Dom node inside HTML document)
// inside public folder index.html div w/ id root is the very root Dom node, so pass in reference of it like this