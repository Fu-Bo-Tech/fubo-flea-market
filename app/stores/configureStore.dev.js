import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga'

import fleaMarketApp from '../reducers';
// import rootSaga from '../sagas'
import DevTools from '../containers/DevTools';

// const saga = createSagaMiddleware()

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

const enhancer = compose(
  // applyMiddleware(thunk, saga),
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
);

const reducers = require('../reducers');

export default function configureStore(initialState) {
  const store = createStore(fleaMarketApp, initialState, enhancer);

  // saga.run(rootSaga)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      return store.replaceReducer(reducers);
    });
  }

  return store;
}