import uuidv1 from 'uuid/v1';

export const sectionActionTypes = {
  ADD_SECTION: 'ADD_SECTION',
  REMOVE_SECTION: 'REMOVE_SECTION',
  SET_SECTION_TITLE: 'SET_SECTION_TITLE',
  SET_SECTION_INGRESS: 'SET_SECTION_INGRESS',
  HIDE_SECTION_TITLE: 'HIDE_SECTION_TITLE',
  HIDE_SECTION_INGRESS: 'HIDE_SECTION_INGRESS',
  SHOW_SECTION_TITLE: 'SHOW_SECTION_TITLE',
  SHOW_SECTION_INGRESS: 'SHOW_SECTION_INGRESS',
};

const newSection = id => ({
  id,
  title: {
    text: '',
    isHidden: false,
  },
  ingress: {
    text: '',
    isHidden: false,
  },
  questions: [],
});

export const addSection = sectionIndex => dispatch => {
  const sectionId = uuidv1();
  dispatch({
    type: sectionActionTypes.ADD_SECTION,
    index: sectionIndex,
    section: newSection(sectionId),
  });
  return sectionId;
};

export const removeSection = sectionId => dispatch => {
  dispatch({
    type: sectionActionTypes.REMOVE_SECTION,
    sectionId,
  });
};

export const setSectionTitle = (id, title) => dispatch => {
  dispatch({
    type: sectionActionTypes.SET_SECTION_TITLE,
    id,
    title,
  });
};

export const setSectionIngress = (id, ingress) => dispatch => {
  dispatch({
    type: sectionActionTypes.SET_SECTION_INGRESS,
    id,
    ingress,
  });
};
