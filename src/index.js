import React, { Component }  from 'react';
import { render }            from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore }       from 'redux';

const initialState = {
  counters: [
    {
      min: 0,
      max: 9,
      sum: 0,
    },
  ],
}
// 9a : move action types into a separate set of constants
const t = {
  UP: 'UP',
  DOWN: 'DOWN',
  RESET: 'RESET',
  ADD: 'ADD',
  NEW: 'NEW',
  COPY: 'COPY'
}
const initialCounter = {
  min: 0,
  max: 9,
  sum: 0
}
// 9b: Add new reducers to reflect new actions
const rootReducer = (state = initialState, action) => {
  const counterAtId = state.counters[action.id]
  switch(action.type) {
    case 'UP':
      return { ...state, counters: [ ...state.counters, ...counterAtId.min++ ] }
    case 'DOWN':
      return { ...state, counters: [ ...state.counters, ...counterAtId.max-- ] }
    case 'RESET':
      const resetCounter = state.counters.map(c => c[action.id] = initialCounter)
      return { ...state, counters: resetCounter }
    case 'ADD':
      const newSum = counterAtId.min + counterAtId.max
      const newCounters = state.counters.map(c => c[action.id] = { ...counterAtId, sum: newSum })
      return { ...state, counters: newCounters }
    case 'COPY':
      return { ...state, counters: [ ...state.counters, { ...state.counters[action.id] } ] }
    case 'NEW':
      return { ...state, counters: [ ...state.counters, {  ...initialCounter } ] }
    default:
      return state;
  }
}
const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const mapStateToProps = (state) => {
  return {
    counters: state.counters
  }
}
const mapDispatchToProps = (dispatch, id) => {
  return {
    up:    (id) => dispatch({ type: 'UP', id }),
    down:  (id) => dispatch({ type: 'DOWN', id }),
    reset: (id) => dispatch({ type: 'RESET', id }),
    add: (id) => dispatch({ type: 'ADD', id }),
    new: (id) => dispatch({ type: 'NEW', id }),
    copy: (id) => dispatch({ type: 'COPY', id }),
  }
}
// 9c: handleClick will have to pass the action type as well as the event
const Counter = (props) => (
  <div>
    <h1>
      { props.counter.min }
    </h1>
    <h1>
      { props.counter.max }
    </h1>
    <button id={props.id} onClick={ (e) => props.handleClick(e, t.UP) }>Up</button>
    <button id={props.id} onClick={ (e) => props.handleClick(e, t.DOWN) }>Down</button>
    <button id={props.id} onClick={ (e) => props.handleClick(e, t.RESET) }>Reset</button>
    <button id={props.id} onClick={ (e) => props.handleClick(e, t.ADD) }>Add</button>
    <button id={props.id} onClick={ (e) => props.handleClick(e, t.NEW) }>New Counter</button>
    <button id={props.id} onClick={ (e) => props.handleClick(e, t.COPY) }>Copy Counter</button>
    <h1>
      Sum:  { props.counter.sum }
    </h1>
  </div>
)
// 9d: add handleClick method to avoid writing a separate handler for each dispatch
class StateHeader extends Component {
  handleClick = (event, type) => {
    event.preventDefault()
    const { id } = event.target
    const typeSelector = type.toLowerCase()
    return this.props[typeSelector](id)
  }
  render() {
    const { counters } = this.props
    return (
      <div>
      { counters.map(each => (
        <Counter
         handleClick={this.handleClick}
         key={counters.indexOf(each)}
         id={counters.indexOf(each)}
         counter={each}
        />))
      }
      <button onClick={ this.props.new }>New Counter</button>
      </div>
    )
  }
}
const ConnectStateHeader = connect(mapStateToProps, mapDispatchToProps)(StateHeader);
const renderApp = () => {
  render (
      <Provider store={store}>
        <ConnectStateHeader />
      </Provider>,
      document.getElementById('root')
  );
}
// 9e: Remove unnecessary '.subscribe()' call since we've added 'Provider'
renderApp();
