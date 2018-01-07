/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React from 'react';
import _get from 'lodash.get';

import { convert } from '../../forms/fields/TextUnitInput';
import { ReadonlyTextArea } from '../../forms/fields/TextArea';
import { ReadonlyMultiInput } from '../../forms/fields/MultiInput';
import { ReadonlySubformList } from '../../forms/fields/SubformList';
import { CheckGroupComponent } from '../../forms/fields/CheckGroup';
import { ReadonlyDiagnoses } from '../../forms/fields/Diagnoses';

function getStr(obj: Object, path: string, defaultValue: string = ''): string {
  const value = _get(obj, path, defaultValue);

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object') {
    return `${value.value} ${value.unit}`;
  }

  return '';
}

export default ({
  patient,
  record,
}: {
  patient: PatientObject,
  record: RecordObject,
}) => {
  const precision = 2;
  const e = Math.pow(10, precision);

  const timestamp = record.$created_at || record.$initialized_at;
  const date = timestamp && new Date(timestamp);

  const number = _get(patient, 'number');

  const heightMeter = convert(_get(record, 'height'), 'm', 1);
  const heightFoot = convert(_get(record, 'height'), 'ft', 1);
  const weight = convert(_get(record, 'weight'), 'kg', 1);
  const bmi = heightMeter && weight && (weight / Math.pow(heightMeter, 2));
  const bmiRounded = bmi && Math.round(bmi * e) / e;
  const temperature = convert(_get(record, 'temperature'), 'degF', 1);

  return (
    <section className="section is-print">
      <div className="header is-clearfix">
        <h1 className="title is-pulled-left">
          {number && <small>No. {number} </small>}
          {getStr(patient, 'name')}
        </h1>

        <p className="is-pulled-right has-text-right">
          {date && date.toDateString()}
        </p>
      </div>

      <div className="container">
        <div>
          <p className="section-header">A) Personal Information</p>
          <p><strong>Age: </strong>{getStr(patient, 'age')}</p>
          <p><strong>Sex: </strong>{{ male: 'Male', female: 'Female' }[_get(patient, 'sex')]}</p>
          <p><strong>Address: </strong>{getStr(patient, 'address')}</p>
        </div>
        <div>
          <p className="section-header">B) Physical Information</p>
          <div className="control is-grouped">
            <div className="control">
              <label className="label">Height</label>
              <p className="form-static">{heightFoot ? `${heightFoot} ft` : '---'}</p>
            </div>
            <div className="control">
              <label className="label">Weight</label>
              <p className="form-static">{weight ? `${weight} kg` : '---'}</p>
            </div>
            <div className="control">
              <label className="label">BMI</label>
              <p className="form-static">{bmiRounded || '---'}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="section-header">C) Medical Information</p>
          <table className="table">
            <tbody>
              <tr>
                <th>Past medical history</th>
                <td>
                  <ReadonlyTextArea
                    value={_get(record, 'past_medical_history')}
                  />
                </td>
              </tr>
              <tr>
                <th>Present medical history</th>
                <td>
                  <ReadonlyTextArea
                    value={_get(record, 'present_medical_history')}
                  />
                </td>
              </tr>
              <tr>
                <th>Current medicines</th>
                <td>
                  <ReadonlyTextArea
                    value={_get(record, 'current_medicine')}
                  />
                </td>
              </tr>
              <tr>
                <th>Allergy</th>
                <td>{_get(record, 'allergy') ? (
                  <div>
                    <strong>&lt;Yes&gt;</strong>
                    <ReadonlyTextArea
                      value={_get(record, 'allergy_memo')}
                    />
                  </div>
                ) : '---'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p className="section-header">D) Examinations</p>
          <table className="table">
            <tbody>
              <tr>
                <th>Vitals</th>
                <td>
                  <div className="control is-grouped">
                    <div className="control">
                      <label className="label">Blood pressure</label>
                      <p className="form-static">
                        {getStr(record, 'bp.s', '---')} / {getStr(record, 'bp.d', '---')} mmHg
                      </p>
                    </div>
                    <div className="control">
                      <label className="label">Pulse</label>
                      <p className="form-static">{getStr(record, 'pulse', '---')} /min</p>
                    </div>
                    <div className="control">
                      <label className="label">Temperature</label>
                      <p className="form-static">{temperature ? `${temperature} degF` : '---'}</p>
                    </div>
                  </div>
                  <div className="control is-grouped">
                    <div className="control">
                      <label className="label">SpO2</label>
                      <p className="form-static">{getStr(record, 'spo2', '---')} %</p>
                    </div>
                    <div className="control">
                      <label className="label">Respiration rate</label>
                      <p className="form-static">{getStr(record, 'rr', '---')} /min</p>
                    </div>
                    <div className="control">
                      <label className="label">Blood sugar</label>
                      <p className="form-static">{getStr(record, 'bs', '---')} mg/dL</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>Symptoms</th>
                <td>
                  <ReadonlyMultiInput
                    values={_get(record, 'symptoms')}
                  />
                </td>
              </tr>
              <tr>
                <th>Signs</th>
                <td>
                  <CheckGroupComponent
                    value={_get(record, 'signs_select')}
                    options={[
                      { id: 'jaundice', label: 'Jaundice' },
                      { id: 'anemia', label: 'Anemia' },
                      { id: 'lymphadenopathy', label: 'Lymphadenopathy' },
                      { id: 'cyanosis', label: 'Cyanosis' },
                      { id: 'clubbing', label: 'Clubbing' },
                      { id: 'oedema', label: 'Oedema' },
                      { id: 'dehydration', label: 'Dehydration' },
                    ]}
                    readonly
                  />
                  <ReadonlyTextArea
                    value={_get(record, 'signs')}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p className="section-header">E) Results</p>
          <table className="table">
            <tbody>
              <tr>
                <th>Diagnoses</th>
                <td>
                  <ReadonlyDiagnoses
                    value={_get(record, 'diagnoses')}
                  />
                </td>
              </tr>
              <tr>
                <th>Plan</th>
                <td>
                  <CheckGroupComponent
                    value={_get(record, 'plan')}
                    options={[
                      { id: 'prescription', label: 'Prescription' },
                      { id: 'refer', label: 'Refer' },
                      { id: 'test', label: 'Test' },
                      { id: 'advice', label: 'Advice' },
                    ]}
                    readonly
                  />
                </td>
              </tr>
              {_get(record, 'plan', []).indexOf('prescription') > -1 &&
                <tr>
                  <th>Prescriptions</th>
                  <td>
                    <ReadonlySubformList
                      values={_get(record, 'prescription')}
                      fields={[
                        { field: 'medicine', label: 'Medicine', class: 'textinput', primary: true },
                        { field: 'stat', label: 'Stat', class: 'check' },
                        { field: 'sos', label: 'SOS', class: 'check' },
                        {
                          field: 'dose', class: 'textinput', type: 'number', style: { width: 50 },
                          label: 'Dose', suffix: 'pcs',
                        },
                        {
                          field: 'freq', class: 'textinput', type: 'number', style: { width: 50 },
                          label: 'Frequency', suffix: 'times', hide: 'sos|stat',
                        },
                        {
                          field: 'duration',
                          class: 'textinput', type: 'number', style: { width: 60 },
                          label: 'Duration', suffix: 'days', hide: 'sos|stat',
                        },
                        {
                          field: 'route', class: 'select', label: 'Route',
                          options: [
                            { id: 'po', label: 'PO' },
                            { id: 'ih', label: 'IH' },
                            { id: 'pr', label: 'PR' },
                            { id: 'sc', label: 'SC' },
                            { id: 'sl', label: 'SL' },
                            { id: 'top', label: 'TOP' },
                          ],
                        },
                        {
                          field: 'meal', class: 'select', label: 'Meal',
                          options: [
                            { id: 'before', label: 'Before the meal' },
                            { id: 'after', label: 'After the meal' },
                          ],
                        },
                        {
                          field: 'remark', class: 'textinput', label: 'Remark', expanded: true,
                          show: 'use_remark',
                        },
                      ]}
                    />
                  </td>
                </tr>
            }
            {_get(record, 'plan', []).indexOf('refer') > -1 &&
              <tr>
                <th>Refer</th>
                <td>
                  <ReadonlyTextArea
                    value={_get(record, 'refer')}
                  />
                </td>
              </tr>
            }
            {_get(record, 'plan', []).indexOf('test') > -1 &&
              <tr>
                <th>Test</th>
                <td>
                  <ReadonlyTextArea
                    value={_get(record, 'test')}
                  />
                </td>
              </tr>
            }
            {_get(record, 'plan', []).indexOf('advice') > -1 &&
              <tr>
                <th>Advice</th>
                <td>
                  <ReadonlyTextArea
                    value={_get(record, 'advice')}
                  />
                </td>
              </tr>
            }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
