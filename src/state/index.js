import { all } from 'redux-saga/effects';
import userSagas from './user/sagas';
import feedsSagas from './feed/sagas';
import profilesSagas from './profile/sagas';

export default function* rootSaga() {
  yield all([
    ...userSagas, ...feedsSagas, ...profilesSagas,
  ]);
}
