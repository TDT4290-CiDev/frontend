import { get } from '../utils/api';

export const documentActionTypes = {
  SET_DOCUMENT_TITLE: 'SET_DOCUMENT_TITLE',
  SET_FOCUS: 'SET_FOCUS',
  LOAD_FORM: 'LOAD_FORM',
  CLEAR_STATE: 'CLEAR_STATE',
};

export const setDocumentTitle = title => dispatch => {
  dispatch({
    type: documentActionTypes.SET_DOCUMENT_TITLE,
    title,
  });
};

export const setFocus = activeField => dispatch => {
  dispatch({
    type: documentActionTypes.SET_FOCUS,
    activeField,
  });
};

export const fetchExistingForm = id => async dispatch => {
  await get(`forms/${id}`)
    .then(({ data }) => {
      dispatch({
        type: documentActionTypes.LOAD_FORM,
        form: data.data,
      });
    })
    .catch(err => console.log(err));
};

export const clearState = () => dispatch => {
  console.log('clear');
  dispatch({
    type: documentActionTypes.CLEAR_STATE,
  });
};
