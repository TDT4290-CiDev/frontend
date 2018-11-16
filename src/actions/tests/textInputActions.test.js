import test from 'ava';

import { setInputValue, textInputActionTypes } from '../textInputActions';

test('produces setInputValue action', t => {
  const id = 'sadad';
  const value = 'some value';
  let action = {};

  setInputValue(id, value)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: textInputActionTypes.SET_INPUT_VALUE,
    id,
    value,
  });
});
