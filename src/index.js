import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

import './index.css';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, takeLatest, put } from 'redux-saga/effects';

//
// REDUCERS
// - reducer is a function that runs every time an action is dispatched
// ------------------------------

// const firstReducer = (state = 0, action) => {
//     if (action.type === 'BUTTON_ONE') {
//         console.log('firstReducer state', state);
//         console.log('Button 1 was clicked!');
//         return state + 1;
//     }
//     return state;
// };

// const secondReducer = (state = 100, action) => {
//     if (action.type === 'BUTTON_TWO') {
//         console.log('secondReducer state', state);
//         console.log('Button 2 was clicked!');
//         return state - 1;
//     }
//     return state;
// };

const elementListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ELEMENTS':
        return action.payload;
      case 'CLEAR_ELEMENTS':
        return [];
      default:
        return state;
    }
};

//
// SAGAS
// ------------------------------

function* firstSaga(action) {
  console.log('First Saga fired Off: ', action.payload);
}

function* getElements(action) {
  try {
    const response = yield axios.get('/api/element');
    yield put({
      type: 'SET_ELEMENTS',
      payload: response.data,
    });
    console.log(response);
  } catch(err) {
    console.log(err);
  }
}

function* postElement(action) {
  try {
    yield axios.post('/api/element', action.payload);
    // put = this.props.dispatch()
    yield put({
      type: 'GET_ELEMENTS'
    });
  } catch(err) {
    console.log(err);
  }
}

// TODO - watch for saga dispatches
function* watchSaga() {
  // register all of our sagas
  yield takeEvery('FIRST_SAGA', firstSaga);
  yield takeEvery('GET_ELEMENTS', getElements);
  yield takeEvery('POST_ELEMENT', postElement);
}

// TODO - add saga middleware
const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is a big JavaScript Object that holds all of our reducers
const storeInstance = createStore(
    // This function registers all of our reducers
    combineReducers({
        // firstReducer,
        // secondReducer,
        elementListReducer,
    }),
    applyMiddleware(sagaMiddleware, logger),
);

// TODO - run sagas
sagaMiddleware.run(watchSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
