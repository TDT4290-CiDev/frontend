import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { DocumentContainer, mapStateToProps, mapDispatchToProps } from '../DocumentContainer';

test("it renders", t => {
  const props = {
    id: 'lksalksd',
    title: 'title',
    sections: [],
    designing: true
  };
  
  const wrapper = shallow(<DocumentContainer {...props} />);
  
  t.true(wrapper.exists('.document-container'));
});

test("it is editable when designing: true", t => {
  const props = {
    id: 'lksalksd',
    title: 'title',
    sections: [2, 3, 5],
    designing: true
  };
  
  const wrapper = shallow(<DocumentContainer {...props} />);
  
  t.true(wrapper.exists('.document-container__title:not(p)'));
});

test("it is not editable when designing: false", t => {
  const props = {
    id: 'lksalksd',
    title: 'title',
    sections: [2, 4, 5],
    designing: false
  };
  
  const wrapper = shallow(<DocumentContainer {...props} />);
  
  t.true(wrapper.exists('p.document-container__title'));
});

test("mapStateToProps works", t => {
  const state = {
    document: {
      id: 'alsdjads',
      title: 'some title',
      sections: []
    }
  }
  
  const props = mapStateToProps(state);
  
  t.deepEqual(state.document, props);
});

test("mapDispatchToProps works", t => {
  const dispatch = spy();
  
  const props = mapDispatchToProps(dispatch);
  
  props.onTitleChange('other title')
  
  t.true(dispatch.calledOnce);
});

test("handleTitleChange works as it should", t => {
  const dispatch = spy();
  
  const props = {
    id: 'lksalksd',
    title: 'title',
    sections: [],
    designing: true,
    ...mapDispatchToProps(dispatch)
  };
  
  const wrapper = shallow(<DocumentContainer {...props} />);
  
  wrapper.find('.document-container__title').simulate('change', {target: {value: 'other title'}});
  
  t.true(dispatch.calledOnce);
});