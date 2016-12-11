/* eslint-env jest */

jest.unmock('../../../../actions');
jest.unmock('../../../../actions/dform');
jest.unmock('lodash.topath');
jest.unmock('immutable');
jest.unmock('../styles');

import Immutable from 'immutable';

import {
  dformStyleInsert,
  dformStyleUpdate,
  dformStyleDelete,
} from '../../../../actions';

import reducer from '../styles';

describe('DFORM_STYLE_INSERT', () => {
  it('inserts field', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    const action = dformStyleInsert(
      'record',
      'form01',
      '[0].children',
      1,
      { class: 'textunitinput', label: 'XXX' }
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textunitinput', label: 'XXX' },
                { class: 'textinput', label: 'text1' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('DFORM_STYLE_UPDATE', () => {
  it('updates field', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    const action = dformStyleUpdate(
      'record',
      'form01',
      '[0].children',
      1,
      { class: 'textunitinput', label: 'XXX' }
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textunitinput', label: 'XXX' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('merges field if specified', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    const action = dformStyleUpdate(
      'record',
      'form01',
      '[0].children',
      1,
      { class: 'textunitinput' },
      true
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textunitinput', label: 'text1' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('DFORM_STYLE_DELETE', () => {
  it('deletes field', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    const action = dformStyleDelete(
      'record',
      'form01',
      '[0].children',
      1,
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});
