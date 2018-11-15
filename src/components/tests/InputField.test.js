import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { InputField, mapDispatchToProps } from '../InputField';

test('input field type is correctly mapped to inputfield', t => {
  const textProps = {
    type: 'text',
  };
  const checkboxProps = {
    type: 'checkbox',
  };
  const radioProps = {
    type: 'radio',
  };

  const textWrapper = shallow(<InputField {...textProps} />);
  t.true(textWrapper.exists('input[type="text"]'));

  const checkboxWrapper = shallow(<InputField {...checkboxProps} />);
  t.true(checkboxWrapper.exists('input[type="checkbox"]'));

  const radioWrapper = shallow(<InputField {...radioProps} />);
  t.true(radioWrapper.exists('input[type="radio"]'));
});

test('handleOnFocus does nothing when onFocus is disabled', t => {
  const activeProps = {
    id: 'testid',
    activeField: 'testid',
    setActiveField: spy(),
    disableOnFocus: true,
  };

  const inactiveProps = {
    id: 'testid',
    activeField: 'not-testid',
    setActiveField: spy(),
    disableOnFocus: true,
  };

  const activeWrapper = shallow(<InputField {...activeProps} />);
  activeWrapper.first().simulate('focus');
  t.true(activeProps.setActiveField.notCalled);

  const inactiveWrapper = shallow(<InputField {...inactiveProps} />);
  inactiveWrapper.first().simulate('focus');
  t.true(inactiveProps.setActiveField.notCalled);
});

test("handleOnFocus sets this to active field if activeField and id don't match", t => {
  const activeProps = {
    id: 'testid',
    activeField: 'testid',
    setActiveField: spy(),
    disableOnFocus: false,
  };

  const inactiveProps = {
    id: 'testid',
    activeField: 'not-testid',
    setActiveField: spy(),
    disableOnFocus: false,
  };

  const activeWrapper = shallow(<InputField {...activeProps} />);
  activeWrapper.first().simulate('focus');
  t.true(activeProps.setActiveField.notCalled);

  const inactiveWrapper = shallow(<InputField {...inactiveProps} />);
  inactiveWrapper.first().simulate('focus');
  t.true(inactiveProps.setActiveField.calledOnce);
});

test('componentDidUpdate handles focus change correctly', t => {
  const activeProps = {
    id: 'testid',
    activeField: 'testid',
  };

  const inactiveProps = {
    id: 'testid',
    activeField: 'not-testid',
  };

  const wrapperFocus = spy();
  const wrapper = shallow(<InputField {...inactiveProps} />);
  wrapper.instance().inputRef.current = {
    focus: wrapperFocus,
  };

  // No change, inactive to inactive
  wrapper.instance().componentDidUpdate(inactiveProps);
  t.true(wrapperFocus.notCalled);

  // Change, active to inactive
  wrapper.instance().componentDidUpdate(activeProps);
  t.true(wrapperFocus.notCalled);

  // Change, inactive to active
  wrapper.setProps(activeProps);
  t.true(wrapperFocus.calledOnce);

  // Change, active to active
  wrapper.instance().componentDidUpdate(activeProps);
  t.true(wrapperFocus.calledOnce);
});

test('mapDispatchToProps functions as it should', t => {
  const dispatch = spy();
  const id = 'asadasd';
  const props = mapDispatchToProps(dispatch);

  props.setActiveField(id);
  t.true(dispatch.calledOnce);
});
