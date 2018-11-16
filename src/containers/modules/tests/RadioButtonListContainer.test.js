import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { RadioButtonListContainer, mapDispatchToProps } from '../RadioButtonListContainer';

test('it renders', t => {
  const wrapper = shallow(<RadioButtonListContainer />);
  t.true(wrapper.exists('.radio-list-container'));
});

test('mapDispatchToProps works', t => {
  const dispatch = spy();

  const props = mapDispatchToProps(dispatch);

  props.onCheckedItem(1, 2);

  t.true(dispatch.calledOnce);
});

test('handle check works', t => {
  const dispatch = spy();
  const props = {
    id: 'asldaslkjfas',
    ...mapDispatchToProps(dispatch),
  };

  const wrapper = shallow(<RadioButtonListContainer {...props} />);
  wrapper.find(`#${props.id}`).prop('onCheckedItemChange')(2);

  t.true(dispatch.calledOnce);
});
