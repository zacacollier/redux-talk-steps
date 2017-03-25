import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import fp from 'lodash/fp';
import { createStore } from 'redux';

const initialState = {
  min: 0
}
/* 4a: Catch the action type in the Root Reducer
 *    and return a new State object.
 *    We can observe the Action in our DevTools...
 */
const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UP':
      return { ...state, min: ++state.min }
    default:
      return state;
  }
}

const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
/* 4b: ...but we can't see our data re-rendering
 *
 */
ReactDOM.render(
    <Provider store={store}>
      <h1>
      { fp.toPairs(store.getState()).map(e => (<div key={e[1]}> {e[0]} : {e[1]}</div>)) }
      </h1>
    </Provider>,
    document.getElementById('root'),
    document.addEventListener('click', () => store.dispatch({ type: 'UP' })),
);
