import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import BulletPointListContainer from '../BulletPointListContainer';

test('component renders', t => {
  const wrapper = shallow(<BulletPointListContainer />);

  t.true(wrapper.exists('.bullet-list-container'));
});
