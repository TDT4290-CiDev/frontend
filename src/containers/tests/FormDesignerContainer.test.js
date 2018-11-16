import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import moxios from 'moxios';

import { FormDesignerContainer, mapStateToProps, mapDispatchToProps } from '../FormDesignerContainer';

test("it renders", t => {
  const wrapper = shallow(<FormDesignerContainer />, {disableLifecycleMethods: true});
  wrapper.setState({isLoadingForm: false})
  
  t.true(wrapper.exists('.form-designer-container'));
});

test("mapStateToProps works", t => {
  const state = {
    form: "thing"
  }
  
  const props = mapStateToProps(state);
  
  t.deepEqual(state, props.form);
});

test("mapDispatchToProps works", t => {
  const dispatch = spy();
  
  const props = mapDispatchToProps(dispatch);
  
  props.clearState();
  
  moxios.install();
  moxios.stubRequest('/api/forms/2', {
    status: 200,
    requests: [
      {data: {data: "hehehe"}}
    ]
  })
  props.getForm();
  
  t.true(dispatch.calledTwice);
});