import test from 'ava';

import { setCheckedItem, radioButtonListActionTypes } from '../radioButtonActions';

test('produces setCheckedItem action', t => {
  const id = 'sadad';
  const questionId = 'asfagadgasf';
  let action = {};

  setCheckedItem(id, questionId)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: radioButtonListActionTypes.SET_CHECKED_ITEM,
    id,
    questionId,
  });
});
