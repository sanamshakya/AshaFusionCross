import { connect } from 'react-redux'
import {
  fetchPatient,
  putPatient,
  putRecord,
  updateActivePatient,
  updateActiveRecord,
} from '../actions'

import { db } from '../db'

const mapStateToProps = (state) => ({
  patient: state.activePatient,
  records: state.activeRecords,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPatient: (patientId) => dispatch(fetchPatient(patientId)),
  putPatient: (patient) => dispatch(putPatient(patient)),
  putRecord: (record) => dispatch(putRecord(record)),
  subscribeChange: (patientId) => {
    return db.changes({
        since: 'now',
        live: true,
        include_docs: true,
      })
      .on('change', change => {
        if (change.doc._id === patientId) {
          dispatch(updateActivePatient(change.doc))
        } else if (change.doc.type === 'record') {
          dispatch(updateActiveRecord(change.doc))
        }
      })
      .on('error', error => {
        console.log('change error', error)
      })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
