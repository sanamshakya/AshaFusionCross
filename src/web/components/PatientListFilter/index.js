/* @flow */

import React from 'react';
import TextSearchInput from './TextSearchInput';
import SortControl from './SortControl';
import DatePicker from '../DatePicker';
import type { Moment } from 'moment';

export default ({
  filter,
  sortBy,
  sortInAsc,
  filterDate,
  setPatientListSortField,
  setPatientListSortOrder,
  onFilterChange,
  setFilterDate,
}: {
  filter: string,
  sortBy: string,
  sortInAsc: boolean,
  filterDate: {startDate: Moment, endDate: Moment},
  setPatientListSortField: (sortBy: string) => void,
  setPatientListSortOrder: (sortInAsc: boolean) => void,
  onFilterChange: (newFilter: string) => void,
  setFilterDate: (date: {startDate: Moment, endDate: Moment}) => void,
}) => (
  <div className="control is-grouped">
    <TextSearchInput
      value={filter}
      onChange={onFilterChange}
    />
    <div>
      <DatePicker
        date={filterDate}
        onDatesChange={setFilterDate}
      />
    </div>
    <SortControl
      field={sortBy}
      asc={sortInAsc}
      onFieldChange={setPatientListSortField}
      onOrderChange={setPatientListSortOrder}
    />
  </div>
);
