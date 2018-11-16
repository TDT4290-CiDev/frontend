import test from 'ava';

import { setQuestionTitle, addQuestion, removeQuestion, questionActionTypes } from '../questionActions';

test('produces setQuestionTitle action', t => {
  const id = 'sadad';
  const text = 'some title';
  let action = {};

  setQuestionTitle(id, text)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: questionActionTypes.SET_QUESTION_TITLE,
    id,
    text,
  });
});

test('produces addQuestion action', t => {
  const sectionId = 'aslkjdas';
  const index = 1;
  const questionType = 'this is a type';
  const uniqueStateAttributes = {
    foo: 'bar',
    baz: 'qux',
  };
  let action = {};

  const id = addQuestion(sectionId, index, questionType, uniqueStateAttributes)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: questionActionTypes.ADD_QUESTION,
    sectionId,
    index,
    question: {
      id,
      type: questionType,
      title: '',
      ...uniqueStateAttributes,
    },
  });
});

test('produces removeQuestion action', t => {
  const id = 'sadad';
  const sectionId = 'sfjsdhfksjd';
  let action = {};

  removeQuestion(id, sectionId)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: questionActionTypes.REMOVE_QUESTION,
    id,
    sectionId,
  });
});
