import React                 from 'react';
import { render }            from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore }       from 'redux';

const initialState = {
  min: 0
}
const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UP':
      return { ...state, min: ++state.min }
    case 'DOWN':
      return { ...state, min: --state.min }
    case 'RESET':
      return { ...state, min: 0 }
    default:
      return state;
  }
}
const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
// 7a: Map store properties to props
const mapStateToProps = (state) => {
  return {
    min: state.min,
  }
}
// 7b: Map compenent's dispatched actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    up:    () => dispatch({ type: 'UP' }),
    down:  () => dispatch({ type: 'DOWN' }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}
/* 7c: Refactor StateHeader to be a more presentational component
 *     that just takes state properties from mapStateToProps,
 *     or passes actions up with mapDispatchToProps.
 *     No more nested passing of props down to child components!
 */
const StateHeader = (props) => (
  <div>
    <h1>
      { props.min }
    </h1>
    <button onClick={ props.up }>Up!</button>
    <button onClick={ props.down }>Down!</button>
    <button onClick={ props.reset }>Reset!</button>
  </div>
)
/* 7d: connect expects mapStateToProps and mapDispatchToProps as its first 2 arguments,
 *     then a second invocation with the component as an argument. This is because connect
 *     actually returns a named function wrapWithConnect - if we pass a bad input we can view the
 *     error in the react-redux source code
 *     const ConnectStateHeader = connect(mapStateToProps, mapDispatchToProps)(888);
 */
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
