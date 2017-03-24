import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';

const initialState = {
  min: 0
}
const rootReducer = (state = initialState.min, action) => {
  return state;
}

const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);


/* 3: Add a type so that we change the state for real this time
 *    (and add Redux DevTools support)
 */
ReactDOM.render(
  <h1>
    { store.getState() }
  </h1>,
  document.getElementById('root'),
  document.addEventListener('click', () => store.dispatch({ type: 'UP' }))
);
