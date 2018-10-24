import { combineReducers } from 'redux';
import sectionReducer from './sectionReducer';
import questionReducer from './questionReducer';
import documentReducer from './documentReducer';

export default combineReducers({
  document: documentReducer,
  sections: sectionReducer,
  questions: questionReducer,
});
