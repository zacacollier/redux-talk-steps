/* Redux createStore method from scratch,
 * via Dan Abramov's fantastic video series:
 * https://egghead.io/lessons/javascript-redux-implementing-store-from-scratch
 */

// reducer function passed in by the application
const createStore = (reducer) => {
  // the store holds the current state, so we'll hold that in a variable
  let state;
  // we'll keep track of "change listeners",
  // since this method will be called many times
  // throughout the lifecycle of the application
  let listeners = [];
  const getState = () => state;

  const dispatch = (action) => {
    // update the state using our reducer function
    // (which just returns a plain object representing the new state)
    state = reducer(state, action);
    // fire all of our listeners to make them aware of our changes
    listeners.forEach(listener => listener())
  };
  const subscribe = (listener) => {
    listeners.push(listener)
    // return an anonymous function that removes the listener from the store,
    // rather than implementing a separate subscribe method
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }
  // dispatch a dummy value just to get an initialState rolling
  dispatch({});

  return { getState, dispatch, subscribe }
}
