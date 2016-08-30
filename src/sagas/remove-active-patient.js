import { take, put, call, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import {
  REMOVE_ACTIVE_PATIENT,
  requestRemovePatient,
  successRemovePatient,
  failureRemovePatient,
  alertInfo,
  alertError,
} from '../actions';
import { db } from '../db';

export function* removeActivePatient() {
  yield put(requestRemovePatient());

  const patient = yield select(state => state.activePatient);
  const records = yield select(state => state.activeRecords);

  const docsToRemove = [
    {
      ...patient,
      _deleted: true,
    },
    ...(records || []).filter(record => record._rev).map(record => ({
      ...record,
      _deleted: true,
    })),
  ];

  try {
    const res = yield call([db, db.bulkDocs], docsToRemove);

    // Patientさえ削除できていれば良い．Patient削除の成否をチェック
    if (res[0].error) {
      throw res[0];
    } else if (!res[0].ok) {
      throw new Error('Invalid response');
    }

    yield put(alertInfo('Patient data and related records removed'));

    // Router (No effect on native)
    yield call([browserHistory, browserHistory.push], '/');

    yield put(successRemovePatient());
  } catch (error) {
    const errmsg = error.name === 'forbidden' ? 'Forbidden' : 'Failed removing patient data';
    yield put(alertError(errmsg));
    yield put(failureRemovePatient(error));
  }
}

export function* watchRemoveActivePatient() {
  while (true) {
    yield take(REMOVE_ACTIVE_PATIENT);
    yield call(removeActivePatient);
  }
}
