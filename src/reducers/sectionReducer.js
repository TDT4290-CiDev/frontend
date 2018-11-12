import { documentActionTypes } from '../actions/documentActions';
import { sectionActionTypes } from '../actions/sectionActions';
import { questionActionTypes } from '../actions/questionActions';

export default (state = [], action) => {
  switch (action.type) {
    case documentActionTypes.LOAD_FORM:
      return action.form.sections;
    case sectionActionTypes.ADD_SECTION:
      return [...state.slice(0, action.index), action.section, ...state.slice(action.index)];
    case sectionActionTypes.SET_SECTION_TITLE:
      return state.map(section => {
        if (section.id === action.id) {
          return {
            ...section,
            title: {
              ...section.title,
              text: action.title,
            },
          };
        }
        return section;
      });
    case sectionActionTypes.SET_SECTION_INGRESS:
      return state.map(section => {
        if (section.id === action.id) {
          return {
            ...section,
            ingress: {
              ...section.ingress,
              text: action.ingress,
            },
          };
        }
        return section;
      });
    case questionActionTypes.ADD_QUESTION:
      return state.map(section => {
        if (section.id === action.sectionId) {
          return {
            ...section,
            questions: [
              ...section.questions.slice(0, action.index),
              action.question.id,
              ...section.questions.slice(action.index),
            ],
          };
        }
        return section;
      });
    case questionActionTypes.REMOVE_QUESTION:
      return state.map(section => {
        if (section.id === action.sectionId) {
          return {
            ...section,
            questions: section.questions.filter(question => question !== action.id),
          };
        }
        return section;
      });
    default:
      return state;
  }
};
