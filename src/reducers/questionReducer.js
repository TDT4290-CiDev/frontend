import { arrayMove } from 'react-sortable-hoc';
import { questionActionTypes } from '../actions/questionActions';
import { listActionTypes } from '../actions/listActions';
import { radioButtonListActionTypes } from '../actions/radioButtonActions';
import { checkboxActionTypes } from '../actions/checkboxActions';

export default (state = [], action) => {
  switch (action.type) {
    case questionActionTypes.ADD_QUESTION:
      return [...state, action.question];
    case questionActionTypes.REMOVE_QUESTION:
      return state.filter(question => question.id !== action.id);
    case questionActionTypes.SET_QUESTION_TITLE:
      return state.map(question => {
        if (question.id === action.id) {
          return {
            ...question,
            title: action.text,
          };
        }
        return question;
      });
    case listActionTypes.ADD_LIST_ITEM:
      return state.map(question => {
        if (question.id === action.questionId) {
          return {
            ...question,
            listItems: [
              ...question.listItems.slice(0, action.index),
              action.listItem,
              ...question.listItems.slice(action.index),
            ],
          };
        }
        return question;
      });
    case listActionTypes.REMOVE_LIST_ITEM:
      return state.map(question => {
        if (question.id === action.questionId) {
          return {
            ...question,
            listItems: question.listItems.filter(listItem => listItem.id !== action.listItemId),
          };
        }
        return question;
      });
    case listActionTypes.MOVE_LIST_ITEM:
      return state.map(question => {
        if (question.id === action.questionId) {
          return {
            ...question,
            listItems: arrayMove(question.listItems, action.oldIndex, action.newIndex),
          };
        }
        return question;
      });
    case listActionTypes.SET_LIST_ITEM_TEXT:
      return state.map(question => {
        if (question.id === action.questionId) {
          return {
            ...question,
            listItems: question.listItems.map(listItem => {
              if (listItem.id === action.listItemId) {
                return {
                  ...listItem,
                  text: action.text,
                };
              }
              return listItem;
            }),
          };
        }
        return question;
      });
    case radioButtonListActionTypes.SET_CHECKED_ITEM:
      return state.map(question => {
        if (question.id === action.questionId) {
          return {
            ...question,
            checkedItem: action.id,
          };
        }
        return question;
      });
    case checkboxActionTypes.TOGGLE_CHECKBOX:
      return state.map(question => {
        if (question.id === action.id) {
          return {
            ...question,
            checked: !question.checked,
          };
        }
        return question;
      });
    default:
      return state;
  }
};
