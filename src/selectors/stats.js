/* @flow */

import { createSelector } from 'reselect';
import moment from 'moment';

export const getRecordList = (state: Object): Array<RecordObject> => state.recordList;

export const getStatsDate = (
  state: Object
): {
  startDate: ?moment.Moment,
  endDate: ?moment.Moment
} => state.stats.date;

export const getRecordListForStats = createSelector(
  [getRecordList, getStatsDate],
  (recordList, date) => {
    if (date.startDate == null && date.endDate == null) return recordList;

    let filteredRecordList = recordList.filter(record => record.$updated_at);
    filteredRecordList = filteredRecordList
      .filter(record =>
        moment(record.$updated_at).isBetween(date.startDate, date.endDate, 'day', '[]'));

    return filteredRecordList;
  }
);
