/* @flow */

import React from 'react';
import _get from 'lodash.get';

import { convert } from '../../forms/fields/TextUnitInput';
import { ReadonlyTextArea } from '../../forms/fields/TextArea';
import { ReadonlyMultiInput } from '../../forms/fields/MultiInput';
import { ReadonlySubformList } from '../../forms/fields/SubformList';
import { CheckGroupComponent } from '../../forms/fields/CheckGroup';
import { DiagnosesComponent } from '../../forms/fields/Diagnoses';

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

        {date &&
          <p className="is-pulled-right">
            {date.toDateString()}
          </p>
        }
      </div>

      <div className="container">
        <h2 className="subtitle">
          <p>Age: {getStr(patient, 'age')}</p>
          <p>Sex: {{ male: 'Male', female: 'Female' }[_get(patient, 'sex')]}</p>
          <p>Address: {getStr(patient, 'address')}</p>
        </h2>

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

        <table className="table">
          <tbody>
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
            <tr>
              <th>Past medical history</th>
              <td>
                <ReadonlyTextArea
                  value={_get(record, 'past_medical_history')}
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
              <th>Present medical history</th>
              <td>
                <ReadonlyTextArea
                  value={_get(record, 'present_medical_history')}
                />
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
            <tr>
              <th>Diagnoses</th>
              <td>
                <DiagnosesComponent
                  diagnoses={_get(record, 'diagnoses')}
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th>Prescriptions</th>
              <td>
                <ReadonlySubformList
                  values={_get(record, 'prescription')}
                  fields={[
                    { field: 'freetext', label: 'Medicine', class: 'textinput', primary: true },
                    { field: 'stat', label: 'Stat', class: 'check' },
                    { field: 'sos', label: 'SOS', class: 'check' },
                    {
                      field: 'once_pcs', class: 'textinput',
                      label: 'Once', suffix: 'pcs',
                    },
                    {
                      field: 'daily_times', class: 'textinput',
                      label: 'Daily', suffix: 'times', show: 'sos',
                    },
                    {
                      field: 'days', class: 'textinput',
                      label: 'Days', suffix: 'days', show: 'sos',
                    },
                    {
                      field: 'meal', class: 'radio',
                      options: [
                        { id: 'before', label: 'Before the meal' },
                        { id: 'after', label: 'After the meal' },
                      ],
                    },
                  ]}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
