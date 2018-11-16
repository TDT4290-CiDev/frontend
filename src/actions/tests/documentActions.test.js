import test from 'ava';
import moxios from 'moxios';

import { setDocumentTitle, setFocus, fetchExistingForm, clearState, documentActionTypes } from '../documentActions';

test('produces setDocumentTitle action', t => {
  const title = 'Title';
  let action = {};

  setDocumentTitle(title)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: documentActionTypes.SET_DOCUMENT_TITLE,
    title,
  });
});

test('produces setFocus action', t => {
  const activeField = 'someField';
  let action = {};

  setFocus(activeField)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: documentActionTypes.SET_FOCUS,
    activeField,
  });
});

test('produces clearState action', t => {
  let action = {};

  clearState()(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: documentActionTypes.CLEAR_STATE,
  });
});

test('does not resolve because the api call is inside the action :(', async t => {
  moxios.install();

  const id = 'someID';

  const thrower = fetchExistingForm(id);

  await t.throws(thrower(() => {}), Error);
});
