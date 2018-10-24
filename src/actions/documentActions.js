export const documentActionTypes = {
  SET_DOCUMENT_TITLE: 'SET_DOCUMENT_TITLE',
  SET_FOCUS: 'SET_FOCUS',
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
