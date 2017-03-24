import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';

// 1: Create the Store
const initialState = {
  min: 0
}
const reducer = (state = initialState.min) => {
  return state;
}
const store = createStore(reducer);

// 2: Change the state, read the error

ReactDOM.render(
  <h1>
    { store.getState() }
  </h1>,
  document.getElementById('root'),
  document.addEventListener('click', () => store.dispatch())
);
