import test from 'ava';

import { addSection, removeSection, setSectionTitle, setSectionIngress, sectionActionTypes } from '../sectionActions';

test('produces addSection action', t => {
  const sectionIndex = 1;
  let action = {};

  const sectionId = addSection(sectionIndex)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: sectionActionTypes.ADD_SECTION,
    index: sectionIndex,
    section: {
      id: sectionId,
      title: {
        text: '',
        isHidden: false,
      },
      ingress: {
        text: '',
        isHidden: false,
      },
      questions: [],
    },
  });
});

test('produces removeSection action', t => {
  const sectionId = 'sdafkjhasf';
  let action = {};

  removeSection(sectionId)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: sectionActionTypes.REMOVE_SECTION,
    sectionId,
  });
});

test('produces setSectionTitle action', t => {
  const id = 'sdafkjhasf';
  const title = 'some title';
  let action = {};

  setSectionTitle(id, title)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: sectionActionTypes.SET_SECTION_TITLE,
    id,
    title,
  });
});

test('produces setSectionIngress action', t => {
  const id = 'sdafkjhasf';
  const ingress = 'some ingress';
  let action = {};

  setSectionIngress(id, ingress)(o => {
    action = o;
  });

  t.deepEqual(action, {
    type: sectionActionTypes.SET_SECTION_INGRESS,
    id,
    ingress,
  });
});
