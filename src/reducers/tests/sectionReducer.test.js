import test from 'ava';

import reducer from '../sectionReducer';
import { documentActionTypes } from '../../actions/documentActions';
import { sectionActionTypes } from '../../actions/sectionActions';
import { questionActionTypes } from '../../actions/questionActions';

test('initialize the state', t => {
  t.deepEqual(reducer(undefined, {}), []);
});

test('load form', t => {
  const action = {
    type: documentActionTypes.LOAD_FORM,
    form: {
      sections: ['sec1', 'sec2', 'sec3'],
    },
  };

  t.deepEqual(reducer(undefined, action), ['sec1', 'sec2', 'sec3']);
});

test('add section', t => {
  const state = ['sec1', 'sec3'];

  const action = {
    type: sectionActionTypes.ADD_SECTION,
    index: 1,
    section: 'second',
  };

  t.deepEqual(reducer(state, action), ['sec1', 'second', 'sec3']);
});

test('set section title', t => {
  const id = 'sdkjsfd';
  const state = [{ id, title: { text: 'some title' } }, { id: 'not-id', title: { text: 'other title' } }];

  const action = {
    type: sectionActionTypes.SET_SECTION_TITLE,
    id,
    title: 'title the third',
  };

  t.deepEqual(reducer(state, action), [
    {
      id,
      title: {
        text: 'title the third',
      },
    },
    {
      id: 'not-id',
      title: {
        text: 'other title',
      },
    },
  ]);
});

test('set section ingress', t => {
  const id = 'sdkjsfd';
  const state = [{ id, ingress: { text: 'some ingress' } }, { id: 'not-id', ingress: { text: 'other ingress' } }];

  const action = {
    type: sectionActionTypes.SET_SECTION_INGRESS,
    id,
    ingress: 'ingress the third',
  };

  t.deepEqual(reducer(state, action), [
    {
      id,
      ingress: {
        text: 'ingress the third',
      },
    },
    {
      id: 'not-id',
      ingress: {
        text: 'other ingress',
      },
    },
  ]);
});

test('add question', t => {
  const id = 'sdkjsfd';
  const state = [
    {
      id,
      questions: ['one', 'three'],
    },
    {
      id: 'not-id',
      questions: ['one', 'three'],
    },
  ];

  const action = {
    type: questionActionTypes.ADD_QUESTION,
    sectionId: id,
    index: 1,
    question: {
      id: 'two',
    },
  };

  t.deepEqual(reducer(state, action), [
    {
      id,
      questions: ['one', 'two', 'three'],
    },
    {
      id: 'not-id',
      questions: ['one', 'three'],
    },
  ]);
});

test('remove question', t => {
  const sectionId = 'sdkjsfd';
  const questionId = 'sajhakfjha';
  const state = [
    {
      id: sectionId,
      questions: [questionId, 'not-this-one'],
    },
    {
      id: 'not-id',
      questions: [questionId, 'not-this-one'],
    },
  ];

  const action = {
    type: questionActionTypes.REMOVE_QUESTION,
    sectionId,
    id: questionId,
  };

  t.deepEqual(reducer(state, action), [
    {
      id: sectionId,
      questions: ['not-this-one'],
    },
    {
      id: 'not-id',
      questions: [questionId, 'not-this-one'],
    },
  ]);
});
