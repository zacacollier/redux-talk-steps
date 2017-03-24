import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';

// import App from './App';

// 1: Create the Store
const initialState = {
  min: 0
}
const reducer = (state = initialState.min) => {
  return state;
}
const store = createStore(reducer);


ReactDOM.render(
  <h1>
    { store.getState() }
  </h1>,
  document.getElementById('root')
);
