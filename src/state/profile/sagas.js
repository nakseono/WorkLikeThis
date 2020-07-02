import {
  call, put, takeLatest, fork,
} from 'redux-saga/effects';
import * as actions from './action';
import * as api from './api';

/*
takeEvery와 takeLatest의 차이
takeEvery : action이 dispatch될때마다 감시하기위하여씀
takeLatest : action이 여러번 dispatch 될 가능성 있을때 쓰임. 현재 진행중 가장 최신의 saga를 습득함
예) 여러 컴포넌트에서 같은 엔드포인트에 접속시, 글수정 등
take : 현재 실행중인 saga가 종료할떄까지, 그 action 이 dispatch 될 타이밍을 감시함
call : 함수,Promise를 호출할때, 그 함수(또는 promise)의 처리가 끝날때까지 기다린후 처리
put: action을 dispatch
 */
function* getProfiles({ items }) {
  try {
    console.log(items);
    const result = yield call(api.getProfiles, items);
    yield put(actions.getProfilesSuccess({
      items: result.data,
    }));
  } catch (e) {
    yield put(actions.ProfilesError({
      error: '에러',
    }));
  }
}

function* watchGetProfileRequest() {
  // GET_USERS_REQUEST를 감시 하고 실행되면 getUsers를 실행
  yield takeLatest(actions.Types.GET_PROFILES_REQUEST, getProfiles);
}

const profilesSagas = [
  fork(watchGetProfileRequest),
];

export default profilesSagas;
