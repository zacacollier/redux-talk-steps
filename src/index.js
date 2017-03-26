import React                 from 'react';
import { render }            from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore }       from 'redux';

// 8a: add a new property to state, and a
//     corresponding case to our reducer
const initialState = {
  min: 0,
  max: 9,
  sum: 0
}
const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UP':
      return { ...state, min: ++state.min }
    case 'DOWN':
      return { ...state, max: --state.max }
    case 'RESET':
      return { ...state, min: 0, max: 0 }
    case 'ADD':
      return { ...state, sum: state.min + state.max }
    default:
      return state;
  }
}
const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
// 8b: Map new state property to props...
const mapStateToProps = (state) => {
  return {
    min: state.min,
    max: state.max,
    sum: state.sum
  }
}
// 8c: ...and a corresponding action dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    up:    () => dispatch({ type: 'UP' }),
    down:  () => dispatch({ type: 'DOWN' }),
    reset: () => dispatch({ type: 'RESET' }),
    add: () => dispatch({ type: 'ADD' }),
  }
}
// 8d: Add new button elements to dispatch actions,
//     and a new header to render state from props!
const StateHeader = (props) => (
  <div>
    <h1>
      { props.min }
    </h1>
    <h1>
      { props.max }
    </h1>
    <button onClick={ props.up }>Up!</button>
    <button onClick={ props.down }>Down!</button>
    <button onClick={ props.reset }>Reset!</button>
    <button onClick={ props.add }>Add!</button>
    <h1>
      Sum:  { props.sum }
    </h1>
  </div>
)
const ConnectStateHeader = connect(mapStateToProps, mapDispatchToProps)(StateHeader);
const renderApp = () => {
  render (
      <Provider store={store}>
        <ConnectStateHeader />
      </Provider>,
      document.getElementById('root')
  );
}
// 5: Subscribe the React element to the Redux store - success!
store.subscribe(renderApp);
renderApp();
