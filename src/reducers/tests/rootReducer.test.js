import test from 'ava';

import reducer from '../rootReducer';
import { documentActionTypes } from '../../actions/documentActions';

test('clear_state clears state', t => {
  const state = {
    foo: 'bar',
    baz: 'qux',
  };

  const action = {
    type: documentActionTypes.CLEAR_STATE,
  };

  const newState = reducer(state, action);

  t.deepEqual(newState, {
    sections: [],
    document: {
      activeField: '',
      existingForm: false,
      id: newState.document.id,
      sections: [],
      title: '',
    },
    questions: [],
  });
});

test('any other state gets passed on', t => {
  const state = {
    sections: [],
    document: {
      activeField: '',
      existingForm: false,
      id: 'some id',
      sections: [],
      title: '',
    },
    questions: [],
  };

  const action = {
    type: 'fakeAction',
  };

  const newState = reducer(state, action);

  t.deepEqual(newState, {
    sections: [],
    document: {
      activeField: '',
      existingForm: false,
      id: 'some id',
      sections: [],
      title: '',
    },
    questions: [],
  });
});
