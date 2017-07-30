import { take, select, call, put } from 'redux-saga/effects';
import {
  POUCH_DOCS_FETCH,
  requestFetchingPouchDocs,
  successFetchingPouchDocs,
  failFetchingPouchDocs,
  alertInfo,
  alertError,
} from 'actions';
import {
  capitalize,
} from 'utils';
import pouchFetchDocs from './fetch-docs';
import {
  pouchFetchPatientList,
} from './fetch-patient-list';


export function* fetchPouchDocs(
  db: PouchInstance,
  name: string,
  opts: Object
): Generator<*, void, *> {
  const { prefix, label } = opts;

  yield put(requestFetchingPouchDocs(name));
  try {
    // TODO: fetching patient is a exception: has to use the same function
    const fetchFunc = prefix === 'patient_' ? pouchFetchPatientList : pouchFetchDocs;

    const data: Array<PouchDocType> = yield call(fetchFunc, db, prefix);
    yield put(alertInfo(capitalize(`${label && `${label} `}loaded`)));
    yield put(successFetchingPouchDocs(name, data));
  } catch (error) {
    if (error.status === 401) {
      yield put(alertError(`Failed loading${label && ` ${label}`} (Unauthorized)`));
    } else {
      yield put(alertError(`Failed loading${label && ` ${label}`}`));
    }
    yield put(failFetchingPouchDocs(name, error));
  }
}

export function* watchFetchPouchDocs(): Generator<*, void, *> {
  while (true) {
    const { payload } = yield take(POUCH_DOCS_FETCH);
    const db = yield select(state => state.db.instance);
    yield call(fetchPouchDocs, db, payload.name, payload.opts);
  }
}
