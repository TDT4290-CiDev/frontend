export const checkboxActionTypes = {
  TOGGLE_CHECKBOX: 'TOGGLE_CHECKBOX',
};

export const toggleCheckbox = (id, questionId) => dispatch => {
  dispatch({
    type: checkboxActionTypes.TOGGLE_CHECKBOX_ELEMENT,
    id,
    questionId,
  });
};
