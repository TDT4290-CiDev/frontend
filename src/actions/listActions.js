export const listActionTypes = {
  ADD_LIST_ITEM: 'ADD_LIST_ITEM',
  REMOVE_LIST_ITEM: 'REMOVE_LIST_ITEM',
  MOVE_LIST_ITEM: 'MOVE_LIST_ITEM',
  SET_LIST_ITEM_TEXT: 'SET_LIST_ITEM_TEXT',
};

const newListItem = id => ({
  id,
  text: '',
});

const newCheckboxElement = id => ({
  id,
  text: '',
  checked: false,
});

export const addListItem = (questionId, listItemId, index, type) => dispatch => {
  const listItemObject = type === 'checkbox' ? newCheckboxElement(listItemId) : newListItem(listItemId);
  dispatch({
    type: listActionTypes.ADD_LIST_ITEM,
    questionId,
    index,
    listItem: listItemObject,
  });
  return listItemId;
};

export const removeListItem = (questionId, listItemId) => dispatch => {
  dispatch({
    type: listActionTypes.REMOVE_LIST_ITEM,
    questionId,
    listItemId,
  });
};

export const moveListItem = (questionId, oldIndex, newIndex) => dispatch => {
  dispatch({
    type: listActionTypes.MOVE_LIST_ITEM,
    questionId,
    oldIndex,
    newIndex,
  });
};

export const setListItemText = (questionId, listItemId, text) => dispatch => {
  dispatch({
    type: listActionTypes.SET_LIST_ITEM_TEXT,
    questionId,
    listItemId,
    text,
  });
};
