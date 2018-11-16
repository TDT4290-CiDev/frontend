import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { CommandInputFieldContainer, mapStateToProps, mapDispatchToProps } from '../CommandInputFieldContainer';

test("it renders", t => {
  const wrapper = shallow(<CommandInputFieldContainer />);
  
  t.true(wrapper.exists('.command-input'));
});

test("mapStateToProps works", t => {
  const state = {
    sections: "thing"
  }
  
  const props = mapStateToProps(state);
  
  t.deepEqual(state, props);
});

test("mapDispatchToProps works", t => {
  const dispatch = spy();
  
  const props = mapDispatchToProps(dispatch);
  
  props.addNewSection(1);
  props.addNewQuestion(1, 1, "text", {});
  props.setActiveField(1);
  
  t.true(dispatch.calledThrice);
});

test("handleChange works properly", t => {
  const setState = spy();
  
  const wrapper = shallow(<CommandInputFieldContainer />);
  setState(wrapper.instance(), 'setState');
  
  wrapper.find('#commandInput').simulate('change', {target: {value: 'askjhd'}});
  
  t.true(setState.calledOnce);
});

test("handleShortcutButtonClick and createNewQuestion works properly", t => {
  const props = {
    sections: [],
    ...mapDispatchToProps(o => o)
  }
  
  const createNewQuestion = spy();
  
  const wrapper = shallow(<CommandInputFieldContainer {...props} />);
  createNewQuestion(wrapper.instance(), 'createNewQuestion');
  
  wrapper.find('ShortcutButtons').simulate('click', {target: {value: 'askjhd'}});
  
  t.true(createNewQuestion.calledOnce);
  
  const propsTrue = {
    sections: [
      {id: 'sdfdfsgg', questions: []}
    ],
    ...mapDispatchToProps(o => o)
  }
  
  const createNewQuestionTrue = spy();
  
  const wrapperTrue = shallow(<CommandInputFieldContainer {...propsTrue} />);
  createNewQuestionTrue(wrapperTrue.instance(), 'createNewQuestion');
  
  wrapperTrue.find('ShortcutButtons').simulate('click', {target: {value: 'askjhd'}});
  
  t.true(createNewQuestionTrue.calledOnce);
});

test("handleKeyPress works properly", t => {
  const setState = spy();
  const dispatch = spy()
  
  const props = {
    ...mapDispatchToProps(dispatch)
  };
  
  const wrapper = shallow(<CommandInputFieldContainer {...props} />);
  setState(wrapper.instance(), 'setState');
  
  wrapper.find('#commandInput').simulate('keypress', {key: 'E'});
  t.true(setState.calledOnce);
  
  wrapper.find('#commandInput').simulate('keypress', {key: ' '});
  wrapper.find('#commandInput').simulate('keypress', {key: 'Spacebar'});
  wrapper.find('#commandInput').simulate('keypress', {key: 'Enter'});
  t.true(setState.calledOnce);
  
  wrapper.instance().setState({inputText: 'df'});
  wrapper.find('#commandInput').simulate('keypress', {key: ' '});
  wrapper.find('#commandInput').simulate('keypress', {key: 'Spacebar'});
  wrapper.find('#commandInput').simulate('keypress', {key: 'Enter'});
  t.true(setState.calledOnce);
  
  wrapper.instance().setState({inputText: '_'});
  wrapper.find('#commandInput').simulate('keydown', {key: ' '});
  wrapper.find('#commandInput').simulate('keypress', {key: 'Spacebar'});
  wrapper.find('#commandInput').simulate('keypress', {key: 'Enter'});
  t.true(setState.calledOnce);
});