import uuidv1 from 'uuid/v1';

export const questionActionTypes = {
  SET_QUESTION_TITLE: 'SET_QUESTION_TITLE',
  ADD_QUESTION: 'ADD_QUESTION',
  REMOVE_QUESTION: 'REMOVE_QUESTION',
};

const newQuestion = (id, type) => ({
  id,
  type,
  title: '',
});

export const setQuestionTitle = (id, text) => dispatch => {
  dispatch({
    type: questionActionTypes.SET_QUESTION_TITLE,
    id,
    text,
  });
};

export const addQuestion = (sectionId, index, questionType, uniqueStateAttributes) => dispatch => {
  const questionId = uuidv1();
  dispatch({
    type: questionActionTypes.ADD_QUESTION,
    sectionId,
    index,
    question: Object.assign(newQuestion(questionId, questionType), uniqueStateAttributes),
  });
  return questionId;
};

export const removeQuestion = (id, sectionId) => dispatch => {
  dispatch({
    type: questionActionTypes.REMOVE_QUESTION,
    id,
    sectionId,
  });
};
