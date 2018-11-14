export const checkboxActionTypes = {
  TOGGLE_CHECKBOX: 'TOGGLE_CHECKBOX',
  TOGGLE_CHECKBOX_ELEMENT: 'TOGGLE_CHECKBOX_ELEMENT',
};

export const toggleCheckbox = id => dispatch => {
  dispatch({
    type: checkboxActionTypes.TOGGLE_CHECKBOX,
    id,
  });
};

export const toggleCheckboxElement = (id, questionId) => dispatch => {
  dispatch({
    type: checkboxActionTypes.TOGGLE_CHECKBOX_ELEMENT,
    id,
    questionId,
  });
};
