import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { ShortAnswerContainer, mapDispatchToProps } from '../ShortAnswerContainer';

test('it renders', t => {
  const wrapper = shallow(<ShortAnswerContainer />);

  t.true(wrapper.exists('.short-answer-container'));
});

test('mapDispatchToProps works', t => {
  const dispatch = spy();
  
  const props = mapDispatchToProps(dispatch);
  
  props.onInputChange(1, 1);
  props.removeQuestion(1, 1);
  props.setActiveField(1);
  
  t.true(dispatch.calledThrice);
});

test('handleTitleChange works', t => {
  const props = {
    id: 'sdfkjhsdkj',
    onTitleChange: spy()
  };
  
  const wrapper = shallow(<ShortAnswerContainer {...props} />);
  
  wrapper.find(`#${props.id}`).simulate('change', {target: {value: 'something'}});
  
  t.true(props.onTitleChange.calledOnce);
});

test('handleInputChange works', t => {
  const dispatch = spy();
  const props = {
    id: 'sdfkjhsdkj',
    ...mapDispatchToProps(dispatch)
  };
  
  const wrapper = shallow(<ShortAnswerContainer {...props} />);
  
  wrapper.find(`#${props.id}`).simulate('keydown', {target: {value: 'something'}, key: 'Return'});
  t.true(dispatch.notCalled);
  
  wrapper.find(`#${props.id}`).simulate('keydown', {target: {value: 'something'}, key: 'Backspace'});
  t.true(dispatch.notCalled);
  
  wrapper.find(`#${props.id}`).simulate('keydown', {target: {value: ''}, key: 'Return'});
  t.true(dispatch.notCalled);
  
  wrapper.find(`#${props.id}`).simulate('keydown', {target: {value: ''}, key: 'Backspace'});
  t.true(dispatch.calledTwice);
  
  
});

test('handleKeyPress works properly', t => {
  const props = {
    id: 'sdfkjhsdkj',
    onInputChange: spy()
  };
  
  const wrapper = shallow(<ShortAnswerContainer {...props} />);
  
  wrapper.find(`#${props.id}-input`).simulate('change', {target: {value: 'something'}});
  
  t.true(props.onInputChange.calledOnce);
});