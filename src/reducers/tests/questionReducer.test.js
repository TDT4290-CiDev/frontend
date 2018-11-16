import test from 'ava';

import reducer from '../questionReducer';
import { documentActionTypes } from '../../actions/documentActions';
import { questionActionTypes } from '../../actions/questionActions';
import { listActionTypes } from '../../actions/listActions';
import { radioButtonListActionTypes } from '../../actions/radioButtonActions';
import { checkboxActionTypes } from '../../actions/checkboxActions';
import { textInputActionTypes } from '../../actions/textInputActions';

test('initialize state', t => {
  t.deepEqual(reducer(undefined, {}), []);
});

test('return form questions', t => {
  const questions = [1, 4, 7, 8];

  const action = {
    type: documentActionTypes.LOAD_FORM,
    form: {
      questions,
    },
  };

  t.deepEqual(reducer(undefined, action), questions);
});

test('add question', t => {
  const question = {
    foo: 'bar',
    baz: 'qux',
  };

  const action = {
    type: questionActionTypes.ADD_QUESTION,
    question,
  };

  t.deepEqual(reducer(undefined, action), [question]);
});

test('remove question', t => {
  const id = 'kajhfa';
  const state = [
    {
      id,
      foo: 'bar',
      baz: 'qux',
    },
  ];

  const action = {
    type: questionActionTypes.REMOVE_QUESTION,
    id,
  };

  t.deepEqual(reducer(state, action), []);
});

test('set question title', t => {
  const id = 'kajhfa';
  const state = [
    {
      id,
      title: 'something',
    },
    {
      id: 'not-id',
      title: 'something else',
    },
  ];

  const action = {
    type: questionActionTypes.SET_QUESTION_TITLE,
    id,
    text: 'a third thing',
  };

  t.deepEqual(reducer(state, action), [
    {
      id,
      title: 'a third thing',
    },
    {
      id: 'not-id',
      title: 'something else',
    },
  ]);
});

test('add list item', t => {
  const id = 'kajhfa';
  const state = [
    {
      id,
      listItems: ['first', 'third'],
    },
    {
      id: 'not-id',
      listItems: ['foo', 'bar', 'baz', 'qux'],
    },
  ];

  const action = {
    type: listActionTypes.ADD_LIST_ITEM,
    questionId: id,
    index: 1,
    listItem: 'second',
  };

  t.deepEqual(reducer(state, action), [
    {
      id,
      listItems: ['first', 'second', 'third'],
    },
    {
      id: 'not-id',
      listItems: ['foo', 'bar', 'baz', 'qux'],
    },
  ]);
});

test('remove list item', t => {
  const questionId = 'kajhfa';
  const listItemId = 'sldkfdlskj';
  const state = [
    {
      id: questionId,
      listItems: [{ id: listItemId }, { id: 'something else' }],
    },
    {
      id: 'not-id',
      listItems: [{ id: listItemId }],
    },
  ];

  const action = {
    type: listActionTypes.REMOVE_LIST_ITEM,
    questionId,
    listItemId,
  };

  t.deepEqual(reducer(state, action), [
    {
      id: questionId,
      listItems: [{ id: 'something else' }],
    },
    {
      id: 'not-id',
      listItems: [{ id: listItemId }],
    },
  ]);
});

test('reorder list items', t => {
  const questionId = 'kajhfa';
  const listItemId = 'sldkfdlskj';
  const state = [
    {
      id: questionId,
      listItems: [{ id: listItemId }, { id: 'something else' }],
    },
    {
      id: 'not-id',
      listItems: [{ id: listItemId }, { id: 'something else' }],
    },
  ];

  const action = {
    type: listActionTypes.MOVE_LIST_ITEM,
    questionId,
    oldIndex: 1,
    newIndex: 0,
  };

  t.deepEqual(reducer(state, action), [
    {
      id: questionId,
      listItems: [{ id: 'something else' }, { id: listItemId }],
    },
    {
      id: 'not-id',
      listItems: [{ id: listItemId }, { id: 'something else' }],
    },
  ]);
});

test('set list item text', t => {
  const questionId = 'kajhfa';
  const listItemId = 'sldkfdlskj';
  const state = [
    {
      id: questionId,
      listItems: [{ id: listItemId, text: 'a text' }, { id: 'something else', text: 'another text' }],
    },
    {
      id: 'not-id',
      listItems: [{ id: listItemId, text: 'a text' }, { id: 'something else', text: 'another text' }],
    },
  ];

  const action = {
    type: listActionTypes.SET_LIST_ITEM_TEXT,
    questionId,
    listItemId,
    text: 'the best text',
  };

  t.deepEqual(reducer(state, action), [
    {
      id: questionId,
      listItems: [{ id: listItemId, text: 'the best text' }, { id: 'something else', text: 'another text' }],
    },
    {
      id: 'not-id',
      listItems: [{ id: listItemId, text: 'a text' }, { id: 'something else', text: 'another text' }],
    },
  ]);
});

test('set checked radio button', t => {
  const id = 'kajhfa';
  const itemId = 'other item';
  const state = [
    {
      id,
      checkedItem: 'some id',
    },
    {
      id: 'not-id',
      checkedItem: 'some id',
    },
  ];

  const action = {
    type: radioButtonListActionTypes.SET_CHECKED_ITEM,
    questionId: id,
    id: itemId,
  };

  t.deepEqual(reducer(state, action), [
    {
      id,
      checkedItem: itemId,
    },
    {
      id: 'not-id',
      checkedItem: 'some id',
    },
  ]);
});

test('set item checked if it is unchecked', t => {
  const id = 'kajhfa';
  const itemId = 'other item';
  const state = [
    {
      id,
      listItems: [{ id: itemId, checked: false }, { id: 'no-check', checked: false }],
    },
    {
      id: 'not-id',
      listItems: [{ id: itemId, checked: false }, { id: 'no-check', checked: false }],
    },
  ];

  const action = {
    type: checkboxActionTypes.TOGGLE_CHECKBOX,
    questionId: id,
    id: itemId,
  };

  t.deepEqual(reducer(state, action), [
    {
      id,
      listItems: [{ id: itemId, checked: true }, { id: 'no-check', checked: false }],
    },
    {
      id: 'not-id',
      listItems: [{ id: itemId, checked: false }, { id: 'no-check', checked: false }],
    },
  ]);
});

test('set item unchecked if it is checked', t => {
  const id = 'kajhfa';
  const itemId = 'other item';
  const state = [
    {
      id,
      listItems: [{ id: itemId, checked: true }, { id: 'no-check', checked: true }],
    },
    {
      id: 'not-id',
      listItems: [{ id: itemId, checked: false }, { id: 'no-check', checked: false }],
    },
  ];

  const action = {
    type: checkboxActionTypes.TOGGLE_CHECKBOX,
    questionId: id,
    id: itemId,
  };

  t.deepEqual(reducer(state, action), [
    {
      id,
      listItems: [{ id: itemId, checked: false }, { id: 'no-check', checked: true }],
    },
    {
      id: 'not-id',
      listItems: [{ id: itemId, checked: false }, { id: 'no-check', checked: false }],
    },
  ]);
});

test('set input value', t => {
  const id = 'kajhfa';
  const state = [
    {
      id,
      inputValue: 'something',
    },
    {
      id: 'not-id',
      inputValue: 'something else',
    },
  ];

  const action = {
    type: textInputActionTypes.SET_INPUT_VALUE,
    id,
    value: 'a third thing',
  };

  t.deepEqual(reducer(state, action), [
    {
      id,
      inputValue: 'a third thing',
    },
    {
      id: 'not-id',
      inputValue: 'something else',
    },
  ]);
});
