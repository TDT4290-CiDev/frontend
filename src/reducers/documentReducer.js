/* eslint-disable no-underscore-dangle */
import uuidv1 from 'uuid/v1';
import { documentActionTypes } from '../actions/documentActions';
import { sectionActionTypes } from '../actions/sectionActions';

const initialState = {
  id: uuidv1(),
  title: '',
  sections: [],
  activeField: '',
  existingForm: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case documentActionTypes.LOAD_FORM: {
      const { title, sections } = action.form.document;
      return { ...state, title, sections, id: action.form._id, activeField: '', existingForm: true };
    }
    case documentActionTypes.SET_DOCUMENT_TITLE:
      return { ...state, title: action.title };
    case sectionActionTypes.ADD_SECTION:
      return {
        ...state,
        sections: [...state.sections, action.section.id],
      };
    case sectionActionTypes.REMOVE_SECTION:
      return {
        ...state,
        sections: state.sections.filter(section => section !== action.id),
      };
    case documentActionTypes.SET_FOCUS:
      return {
        ...state,
        activeField: action.activeField,
      };
    default:
      return state;
  }
};
