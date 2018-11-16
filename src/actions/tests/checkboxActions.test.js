import test from 'ava';

import { toggleCheckbox, checkboxActionTypes } from '../checkboxActions';

test('produces toggle checkbox action', t => {
  const id = 'sadad';
  const questionId = 'fkdkfkfd';
  let action = {};

  toggleCheckbox(id, questionId)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: checkboxActionTypes.TOGGLE_CHECKBOX,
    id,
    questionId,
  });
});
