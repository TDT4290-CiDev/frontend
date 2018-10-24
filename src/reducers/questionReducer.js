import { arrayMove } from 'react-sortable-hoc';
import { questionActionTypes } from '../actions/questionActions';
import { bulletPointListActionTypes } from '../actions/bulletPointListActions';

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
    case bulletPointListActionTypes.ADD_BULLET_POINT:
      return state.map(question => {
        if (question.id === action.questionId) {
          return {
            ...question,
            bulletPoints: [
              ...question.bulletPoints.slice(0, action.index),
              action.bulletPoint,
              ...question.bulletPoints.slice(action.index),
            ],
          };
        }
        return question;
      });
    case bulletPointListActionTypes.REMOVE_BULLET_POINT:
      return state.map(question => {
        if (question.id === action.questionId) {
          return {
            ...question,
            bulletPoints: question.bulletPoints.filter(bulletPoint => bulletPoint.id !== action.bulletPointId),
          };
        }
        return question;
      });
    case bulletPointListActionTypes.MOVE_BULLET_POINT:
      return state.map(question => {
        if (question.id === action.questionId) {
          return {
            ...question,
            bulletPoints: arrayMove(question.bulletPoints, action.oldIndex, action.newIndex),
          };
        }
        return question;
      });
    case bulletPointListActionTypes.SET_BULLET_POINT_TEXT:
      return state.map(question => {
        if (question.id === action.questionId) {
          return {
            ...question,
            bulletPoints: question.bulletPoints.map(bulletPoint => {
              if (bulletPoint.id === action.bulletPointId) {
                return {
                  ...bulletPoint,
                  text: action.text,
                };
              }
              return bulletPoint;
            }),
          };
        }
        return question;
      });
    default:
      return state;
  }
};
