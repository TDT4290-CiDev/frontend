import { combineReducers } from 'redux';
import sectionReducer from './sectionReducer';
import questionReducer from './questionReducer';
import documentReducer from './documentReducer';
import { documentActionTypes } from '../actions/documentActions';

const rootReducer = combineReducers({
  document: documentReducer,
  sections: sectionReducer,
  questions: questionReducer,
});

export default (state, action) => {
  if (action.type === documentActionTypes.CLEAR_STATE) {
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};
