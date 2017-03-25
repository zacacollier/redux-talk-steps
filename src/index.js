import React, { Component }  from 'react';
import ReactDOM, { render }  from 'react-dom';
import { Provider } from 'react-redux';
import fp                    from 'lodash/fp';
import { createStore }       from 'redux';

const initialState = {
  min: 0
}
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
class StateHeader extends Component {
  render() {
    const state = store.getState();
    return (
      <div>
        <h1>
          {state.min}
        </h1>
        <button onClick={() => { store.dispatch({ type: 'UP' }) }}>Up!</button>
      </div>
    )
  }
}
const renderApp = () => {
  render (
      <StateHeader />,
      document.getElementById('root')
  );
}
// 5: Subscribe the React element to the Redux store - success!
store.subscribe(renderApp);
renderApp()
