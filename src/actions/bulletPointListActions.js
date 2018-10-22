export const bulletPointListActionTypes = {
  ADD_BULLET_POINT: 'ADD_BULLET_POINT',
  REMOVE_BULLET_POINT: 'REMOVE_BULLET_POINT',
  MOVE_BULLET_POINT: 'MOVE_BULLET_POINT',
  SET_BULLET_POINT_TEXT: 'SET_BULLET_POINT_TEXT',
  SET_ACTIVE_FIELD: 'SET_ACTIVE_FIELD',
};

const newBulletPoint = id => ({
  id,
  text: '',
});

export const addBulletPoint = (questionId, bulletPointId, index) => dispatch => {
  dispatch({
    type: bulletPointListActionTypes.ADD_BULLET_POINT,
    questionId,
    index,
    bulletPoint: newBulletPoint(bulletPointId),
  });
  return bulletPointId;
};

export const removeBulletPoint = (questionId, bulletPointId) => dispatch => {
  dispatch({
    type: bulletPointListActionTypes.REMOVE_BULLET_POINT,
    questionId,
    bulletPointId,
  });
};

export const moveBulletPoint = (questionId, oldIndex, newIndex) => dispatch => {
  dispatch({
    type: bulletPointListActionTypes.MOVE_BULLET_POINT,
    questionId,
    oldIndex,
    newIndex,
  });
};

export const setBulletPointText = (questionId, bulletPointId, text) => dispatch => {
  dispatch({
    type: bulletPointListActionTypes.SET_BULLET_POINT_TEXT,
    questionId,
    bulletPointId,
    text,
  });
};

// TODO:
export const setActiveField = () => dispatch => {
  dispatch({
    type: bulletPointListActionTypes.SET_ACTIVE_FIELD,
    payload: {},
  });
};
