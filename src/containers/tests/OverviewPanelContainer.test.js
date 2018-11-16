import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { OverviewPanelContainer, mapDispatchToProps, mapStateToProps } from '../OverviewPanelContainer';

test('it renders', t => {
  const state = {
    document: {
      id: 'skjdhafkjh',
      title: 'Some title',
      activeField: 2,
    },
    sections: [],
    questions: [],
  };

  const props = mapStateToProps(state);

  const wrapper = shallow(<OverviewPanelContainer {...props} />);

  t.true(wrapper.exists('OverviewPanel'));
});

test('it hides empty sections', t => {
  const state = {
    document: {
      id: 'skjdhafkjh',
      title: 'Some title',
      activeField: 2,
    },
    sections: [{ title: {}, questions: [] }],
    questions: [{ id: 12415 }],
  };

  const props = mapStateToProps(state);

  const wrapper = shallow(<OverviewPanelContainer {...props} />);

  t.true(wrapper.exists('OverviewPanel'));
});

test('it renders questions', t => {
  const questionId = 'sajhaf';
  const state = {
    document: {
      id: 'skjdhafkjh',
      title: 'Some title',
      activeField: 2,
    },
    sections: [
      {
        id: 'laskjas',
        title: {
          text: 'Seksjonstittel',
          isHidden: false,
        },
        questions: [questionId],
      },
    ],
    questions: [{ id: questionId }],
  };

  const props = mapStateToProps(state);

  const wrapper = shallow(<OverviewPanelContainer {...props} />);

  t.true(wrapper.exists('OverviewPanel'));
});

test('it renders question list items', t => {
  const questionId = 'sajhaf';
  const state = {
    document: {
      id: 'skjdhafkjh',
      title: 'Some title',
      activeField: 2,
    },
    sections: [
      {
        id: 'laskjas',
        title: {
          text: 'Seksjonstittel',
          isHidden: false,
        },
        questions: [questionId],
      },
    ],
    questions: [
      {
        id: questionId,
        title: 'Spørsmålstittel',
        listItems: [{ id: 1243 }, { id: 347825 }],
      },
    ],
  };

  const props = mapStateToProps(state);

  const wrapper = shallow(<OverviewPanelContainer {...props} />);

  t.true(wrapper.exists('OverviewPanel'));
});

test('mapStateToProps works', t => {
  const state = {
    document: {
      id: 'skjdhafkjh',
      title: 'Some title',
      activeField: 2,
    },
    sections: [],
    questions: [],
  };

  const props = mapStateToProps(state);

  t.deepEqual(
    {
      document: {
        id: 'skjdhafkjh',
        title: 'Some title',
      },
      sections: [],
      questions: [],
      activeField: 2,
    },
    props
  );
});

test('mapDispatchToProps works', t => {
  const dispatch = spy();

  const props = mapDispatchToProps(dispatch);

  props.setFocusTo(2);

  t.true(dispatch.calledOnce);
});

test('handle click works', t => {
  const state = {
    document: {
      id: 'skjdhafkjh',
      title: 'Some title',
      activeField: 2,
    },
    sections: [],
    questions: [],
  };

  const dispatch = spy();

  const props = {
    ...mapDispatchToProps(dispatch),
    ...mapStateToProps(state),
  };

  const wrapper = shallow(<OverviewPanelContainer {...props} />);

  wrapper.find('OverviewPanel').simulate('click');

  t.true(dispatch.calledOnce);
});

test('handle mouse enter', t => {
  const state = {
    document: {
      id: 'skjdhafkjh',
      title: 'Some title',
      activeField: 2,
    },
    sections: [],
    questions: [],
  };

  const dispatch = spy();

  const props = {
    ...mapDispatchToProps(dispatch),
    ...mapStateToProps(state),
  };

  const wrapper = shallow(<OverviewPanelContainer {...props} />);

  wrapper.find('OverviewPanel').simulate('mouseenter');

  t.true(wrapper.state().open);
});

test('handle mouse leave', t => {
  const state = {
    document: {
      id: 'skjdhafkjh',
      title: 'Some title',
      activeField: 2,
    },
    sections: [],
    questions: [],
  };

  const dispatch = spy();

  const props = {
    ...mapDispatchToProps(dispatch),
    ...mapStateToProps(state),
  };

  const wrapper = shallow(<OverviewPanelContainer {...props} />);

  wrapper.find('OverviewPanel').simulate('mouseleave');

  t.false(wrapper.state().open);
});
