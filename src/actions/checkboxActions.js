export const checkboxActionTypes = {
  TOGGLE_CHECKBOX: 'TOGGLE_CHECKBOX',
};

export const toggleCheckbox = id => dispatch => {
  dispatch({
    type: checkboxActionTypes.TOGGLE_CHECKBOX,
    id,
  });
};
