import test from 'ava';

import reducer from '../documentReducer';
import { documentActionTypes } from '../../actions/documentActions';
import { sectionActionTypes } from '../../actions/sectionActions';

test('initialize the state', t => {
  const state = reducer(undefined, {});

  t.deepEqual(state, {
    id: state.id,
    title: '',
    sections: [],
    activeField: '',
    existingForm: false,
  });
});

test('load form into state', t => {
  const state = reducer(undefined, {});

  const action = {
    type: documentActionTypes.LOAD_FORM,
    form: {
      _id: 'kjashkdajsh',
      document: {
        title: '',
        sections: [],
      },
    },
  };

  const newState = reducer(state, action);

  t.deepEqual(newState, {
    /* eslint-disable no-underscore-dangle */
    id: action.form._id,
    title: action.form.document.title,
    sections: action.form.document.sections,
    activeField: '',
    existingForm: true,
  });
});

test('set document title', t => {
  const state = reducer(undefined, {});

  const action = {
    type: documentActionTypes.SET_DOCUMENT_TITLE,
    title: 'some title',
  };

  const newState = reducer(state, action);

  t.deepEqual(newState, {
    id: state.id,
    title: 'some title',
    sections: [],
    activeField: '',
    existingForm: false,
  });
});

test('add section to document', t => {
  const state = reducer(undefined, {});

  const action = {
    type: sectionActionTypes.ADD_SECTION,
    section: {
      id: 3,
    },
  };

  const newState = reducer(state, action);

  t.deepEqual(newState, {
    id: state.id,
    title: '',
    sections: [3],
    activeField: '',
    existingForm: false,
  });
});

test('remove section from document', t => {
  const state = reducer(
    {
      id: 'slkdfjsdflkj',
      title: '',
      sections: [3],
      activeField: '',
      existingForm: false,
    },
    {}
  );

  const action = {
    type: sectionActionTypes.REMOVE_SECTION,
    id: 3,
  };

  const newState = reducer(state, action);

  t.deepEqual(newState, {
    id: state.id,
    title: '',
    sections: [],
    activeField: '',
    existingForm: false,
  });
});

test('set document focus', t => {
  const state = reducer(undefined, {});

  const action = {
    type: documentActionTypes.SET_FOCUS,
    activeField: 'tally ho',
  };

  const newState = reducer(state, action);

  t.deepEqual(newState, {
    id: state.id,
    title: '',
    sections: [],
    activeField: 'tally ho',
    existingForm: false,
  });
});
