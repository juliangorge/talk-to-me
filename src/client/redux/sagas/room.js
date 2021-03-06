import { call, put, fork, takeLatest } from 'redux-saga/effects'
import { INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILED, SHUTDOWN } from '../ducks/room'
import { SOCKET_INITIALIZE, SOCKET_DESTROY } from '../ducks/socket'
import { getUserMedia } from '../../utils/navigator'
import { getLocalStorage } from '../../utils/window'
import config from '../../config'

function* initialize (action) {
  try {
    const constraints = getLocalStorage(config.localStorage.gumConstraints)
    let stream
    if (constraints) {
      stream = yield call(getUserMedia, constraints)
    } else {
      stream = yield call(getUserMedia)
    }
    yield put({
      type: INITIALIZE_SUCCESS,
      roomId: action.roomId,
      stream
    })
    yield put({
      type: SOCKET_INITIALIZE,
      roomId: action.roomId
    })
  } catch (error) {
    console.log('Initialize Failed')
    console.error(error)
    yield put({
      type: INITIALIZE_FAILED,
      error
    })
  }
}

function* shutdown (action) {
  try {
    yield put({
      type: SOCKET_DESTROY,
      roomId: action.roomId
    })
  } catch (error) {
    console.log('Error destorying socket')
    console.error(error)
  }
}

function* initializeFlow () {
  yield takeLatest(INITIALIZE, initialize)
}

function* shutdownFlow () {
  yield takeLatest(SHUTDOWN, shutdown)
}

export default [
  fork(initializeFlow),
  fork(shutdownFlow)
]
