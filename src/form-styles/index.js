export default {
  record: [
    {
      id: 'normal',
      label: 'Normal',
      style: [
        {
          field: 'height', label: 'Height', class: 'textinput', type: 'number',
        },
        {
          field: 'weight', label: 'Weight', class: 'textinput', type: 'number',
        },
        {
          field: 'waist', label: 'Waist', class: 'textinput', type: 'number',
        },
        {
          field: 'medicalHistory', label: 'Medical history', class: 'textarea',
        },
        {
          field: 'currentMedicine', label: 'Current medicines', class: 'textarea',
        },
      ],
    },
    {
      id: 'ksix',
      label: 'K6',
      style: [
        {
          field: 'ksix.nervious',
          label: 'Nervious?',
          class: 'radio',
          options: [
            { id: 4, label: 'All of the time (4)' },
            { id: 3, label: 'Most of the time (3)' },
            { id: 2, label: 'Some of the time (2)' },
            { id: 1, label: 'A little of the time (1)' },
            { id: 0, label: 'None of the time (0)' },
          ],
        },
        {
          field: 'ksix.hopeless',
          label: 'Hopeless?',
          class: 'radio',
          options: [
            { id: 4, label: 'All of the time (4)' },
            { id: 3, label: 'Most of the time (3)' },
            { id: 2, label: 'Some of the time (2)' },
            { id: 1, label: 'A little of the time (1)' },
            { id: 0, label: 'None of the time (0)' },
          ],
        },
        {
          field: 'ksix.restless',
          label: 'Restless or fidgety?',
          class: 'radio',
          options: [
            { id: 4, label: 'All of the time (4)' },
            { id: 3, label: 'Most of the time (3)' },
            { id: 2, label: 'Some of the time (2)' },
            { id: 1, label: 'A little of the time (1)' },
            { id: 0, label: 'None of the time (0)' },
          ],
        },
        {
          field: 'ksix.depressed',
          label: 'So depressed that nothing could cheer you up?',
          class: 'radio',
          options: [
            { id: 4, label: 'All of the time (4)' },
            { id: 3, label: 'Most of the time (3)' },
            { id: 2, label: 'Some of the time (2)' },
            { id: 1, label: 'A little of the time (1)' },
            { id: 0, label: 'None of the time (0)' },
          ],
        },
        {
          field: 'ksix.effort',
          label: 'That everything was an effort?',
          class: 'radio',
          options: [
            { id: 4, label: 'All of the time (4)' },
            { id: 3, label: 'Most of the time (3)' },
            { id: 2, label: 'Some of the time (2)' },
            { id: 1, label: 'A little of the time (1)' },
            { id: 0, label: 'None of the time (0)' },
          ],
        },
        {
          field: 'ksix.worthless',
          label: 'Worthless?',
          class: 'radio',
          options: [
            { id: 4, label: 'All of the time (4)' },
            { id: 3, label: 'Most of the time (3)' },
            { id: 2, label: 'Some of the time (2)' },
            { id: 1, label: 'A little of the time (1)' },
            { id: 0, label: 'None of the time (0)' },
          ],
        },
      ],
    },
  ],
};
