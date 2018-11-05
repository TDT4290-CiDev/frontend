export const radioButtonListActionTypes = {
  SET_CHECKED_ITEM: 'SET_CHECKED_ITEM',
};

export const setCheckedItem = (id, questionId) => dispatch => {
  dispatch({
    type: radioButtonListActionTypes.SET_CHECKED_ITEM,
    id,
    questionId,
  });
};
