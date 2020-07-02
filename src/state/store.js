import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './index';
import users from './user/reducers';
import feeds from './feed/reducers';
import profiles from './profile/reducers';

const rootReducer = combineReducers({ users, feeds, profiles });
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);

  return store;
};

const store = configureStore();

export default store;
