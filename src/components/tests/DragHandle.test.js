import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';

import DragHandle from '../DragHandle';

test('drag handle renders icon', t => {
  const wrapper = mount(<DragHandle />);

  t.is(wrapper.find('i').length, 1);
});
