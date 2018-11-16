import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { CheckboxListContainer, mapDispatchToProps } from '../CheckboxListContainer';

test('it renders', t => {
  const wrapper = shallow(<CheckboxListContainer />);

  t.true(wrapper.exists('.checkbox-list-container'));
});

test('mapDispatchToProps works', t => {
  const dispatch = spy();

  const props = mapDispatchToProps(dispatch);

  props.onToggle(1, 2);

  t.true(dispatch.calledOnce);
});

test('handle check works', t => {
  const dispatch = spy();
  const props = {
    id: 'asldaslkjfas',
    ...mapDispatchToProps(dispatch),
  };

  const wrapper = shallow(<CheckboxListContainer {...props} />);
  wrapper.find(`#${props.id}`).prop('onCheckedItemChange')(2);

  t.true(dispatch.calledOnce);
});
