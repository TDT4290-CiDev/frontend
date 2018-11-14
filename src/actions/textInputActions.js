export const textInputActionTypes = {
  SET_INPUT_VALUE: 'SET_INPUT_VALUE',
};

export const setInputValue = (id, value) => dispatch => {
  dispatch({
    type: textInputActionTypes.SET_INPUT_VALUE,
    id,
    value,
  });
};
