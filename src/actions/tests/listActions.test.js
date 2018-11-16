import test from 'ava';

import { addListItem, removeListItem, moveListItem, setListItemText, listActionTypes } from '../listActions';

test('produces addListItem action with non-checkbox list item', t => {
  const questionId = 'sadad';
  const listItemId = 'fkdkfkfd';
  const index = 1;
  const type = 'not checkbox';
  let action = {};

  addListItem(questionId, listItemId, index, type)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: listActionTypes.ADD_LIST_ITEM,
    questionId,
    index,
    listItem: {
      id: listItemId,
      text: '',
    },
  });
});

test('produces addListItem action with checkbox list item', t => {
  const questionId = 'sadad';
  const listItemId = 'fkdkfkfd';
  const index = 1;
  const type = 'checkbox';
  let action = {};

  addListItem(questionId, listItemId, index, type)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: listActionTypes.ADD_LIST_ITEM,
    questionId,
    index,
    listItem: {
      id: listItemId,
      text: '',
      checked: false,
    },
  });
});

test('produces removeListItem action', t => {
  const questionId = 'sadad';
  const listItemId = 'fkdkfkfd';
  let action = {};

  removeListItem(questionId, listItemId)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: listActionTypes.REMOVE_LIST_ITEM,
    questionId,
    listItemId,
  });
});

test('produces moveListItem action', t => {
  const questionId = 'sadad';
  const oldIndex = 1;
  const newIndex = 3;
  let action = {};

  moveListItem(questionId, oldIndex, newIndex)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: listActionTypes.MOVE_LIST_ITEM,
    questionId,
    oldIndex,
    newIndex,
  });
});

test('produces setListItemText action', t => {
  const questionId = 'sadad';
  const listItemId = 'fkdkfkfd';
  const text = 'contents af';
  let action = {};

  setListItemText(questionId, listItemId, text)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: listActionTypes.SET_LIST_ITEM_TEXT,
    questionId,
    listItemId,
    text,
  });
});
