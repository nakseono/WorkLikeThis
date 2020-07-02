import {
  call, put, take, takeLatest, fork,
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
function* getFeeds({ items }) {
  try {
    console.log(items);
    const result = yield call(api.getFeed, items);
    yield put(actions.getFeedsSuccess({
      items: result.data,
    }));
  } catch (e) {
    yield put(actions.FeedsError({
      error: '피드 에러',
    }));
  }
}

function* watchGetFeedRequest() {
  // GET_USERS_REQUEST를 감시 하고 실행되면 getUsers를 실행
  yield takeLatest(actions.Types.GET_FEEDS_REQUEST, getFeeds);
}


// payload는 action、createUserRequest에서 습득
function* createFeed(items) {
  try {
    console.log(items.items);
    yield call(api.createFeed, items.items);
  } catch (e) {
    yield put(actions.FeedsError({
      error: '피드 생성 에러',
    }));
  }
}

function* watchCreateFeedRequest() {
  // action처리후 createUser 실행
  yield takeLatest(actions.Types.CREATE_FEED_REQUEST, createFeed);
}


function* deleteFeed({ userId }) {
  try {
    yield call(api.deleteFeed, userId);
    yield call(getFeeds);
  } catch (e) {
    yield put(actions.FeedsError({
      error: '피드 삭제 에러 ',
    }));
  }
}

function* watchDeleteFeedRequest() {
  const action = yield take(actions.Types.DELETE_FEED_REQUEST);
  yield call(deleteFeed, {
    userId: action.payload.userId,
  });
}


const feedsSagas = [
  fork(watchGetFeedRequest),
  fork(watchCreateFeedRequest),
  fork(watchDeleteFeedRequest),
];

export default feedsSagas;
