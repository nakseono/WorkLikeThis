import {
  call, put, take, takeEvery, takeLatest, fork,
} from 'redux-saga/effects';
import * as actions from './action';
import * as api from './api';
import { getFeedsRequest } from '../feed/action';

/*
takeEvery와 takeLatest의 차이
takeEvery : action이 dispatch될때마다 감시하기위하여씀
takeLatest : action이 여러번 dispatch 될 가능성 있을때 쓰임. 현재 진행중 가장 최신의 saga를 습득함
예) 여러 컴포넌트에서 같은 엔드포인트에 접속시, 글수정 등
take : 현재 실행중인 saga가 종료할떄까지, 그 action 이 dispatch 될 타이밍을 감시함
call : 함수,Promise를 호출할때, 그 함수(또는 promise)의 처리가 끝날때까지 기다린후 처리
put: action을 dispatch
 */
function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(actions.getUsersSuccess({
      items: result.data.data,
    }));
  } catch (e) {
    yield put(actions.usersError({
      error: '유저 에러',
    }));
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* login(items) {
  try {
    const result = yield call(api.loginUser, items);
    yield put(actions.loginSuccess({
      items: result.data,
    }));
    localStorage.setItem('myJWT', result.data.token);
    yield put(getFeedsRequest({ items: result.data.token }));
  } catch (e) {
    yield put(actions.usersError({
      error: '로그인 에러',
    }));
  }
}

function* watchLoginRequest() {
  // GET_USERS_REQUEST를 감시 하고 실행되면 getUsers를 실행
  yield takeEvery(actions.Types.LOGIN_REQUEST, login);
}

// payload는 action、createUserRequest에서 습득
function* createUser({ payload }) {
  try {
    yield call(api.createUser, {
      name: payload.name,
    });
    yield call(getUsers); // 유저일람 갱신
  } catch (e) {
    yield put(actions.usersError({
      error: '유저 만들기 에러',
    }));
  }
}

function* watchCreateUserRequest() {
  // action처리후 createUser 실행
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}


function* deleteUser({ userId }) {
  try {
    yield call(api.deleteUser, userId);
    yield call(getUsers);
  } catch (e) {
    yield put(actions.usersError({
      error: '유저 삭제 에러 ',
    }));
  }
}

function* watchDeleteUserRequest() {
  const action = yield take(actions.Types.DELETE_USER_REQUEST);
  yield call(deleteUser, {
    userId: action.payload.userId,
  });
}


const usersSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest),
  fork(watchLoginRequest),
];

export default usersSagas;
