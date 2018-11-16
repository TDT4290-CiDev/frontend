import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import { FormLandingPage } from '../FormLandingPage';

test('it renders', t => {
  const wrapper = shallow(<FormLandingPage />);

  t.true(wrapper.exists('.form-landing-page'));
});
