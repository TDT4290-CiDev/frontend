import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { ShortcutButtons } from '../ShortcutButtons';

test('extra shortcut buttons should be closed when expanded is false', t => {
  const wrapper = shallow(<ShortcutButtons />);
  t.false(wrapper.find('.shortcut-buttons__expandable').exists('button'));
});

test('extra shortcut buttons should be open when expanded is true', t => {
  const wrapper = shallow(<ShortcutButtons />);
  wrapper.instance().setState({ expanded: true });

  t.true(wrapper.find('.shortcut-buttons__expandable').exists('button'));
});

test('kortsvar button should be triggered with correct arguments on click', t => {
  const props = {
    onClick: spy(),
  };

  const wrapper = shallow(<ShortcutButtons {...props} />);

  wrapper
    .find('button')
    .first()
    .simulate('click');
  t.true(props.onClick.calledOnceWith('_'));
});

test('radio button should be triggered with correct arguments on click', t => {
  const props = {
    onClick: spy(),
  };

  const wrapper = shallow(<ShortcutButtons {...props} />);

  wrapper
    .find('button')
    .at(1)
    .simulate('click');
  t.true(props.onClick.calledOnceWith('*'));
});

test('checkbox button should be triggered with correct arguments on click', t => {
  const props = {
    onClick: spy(),
  };

  const wrapper = shallow(<ShortcutButtons {...props} />);

  wrapper
    .find('button')
    .at(2)
    .simulate('click');
  t.true(props.onClick.calledOnceWith('[]'));
});

test('langsvar button should be triggered with correct arguments on click', t => {
  const props = {
    onClick: spy(),
  };

  const wrapper = shallow(<ShortcutButtons {...props} />);
  wrapper.instance().setState({ expanded: true });

  wrapper
    .find('button')
    .last()
    .simulate('click');
  t.true(props.onClick.calledOnceWith('__'));
});

test('more button should correctly call toggleExpanded', t => {
  const wrapper = shallow(<ShortcutButtons />);

  wrapper
    .find('button')
    .at(3)
    .simulate('click');
  t.true(wrapper.instance().state.expanded);
});

test('collapse function should always set expanded to false', t => {
  const wrapper = shallow(<ShortcutButtons />);

  // Expanded should stay false
  wrapper.simulate('blur');
  t.false(wrapper.instance().state.expanded);

  // Expanded should become false
  wrapper.instance().setState({ expanded: true });
  wrapper.simulate('blur');
  t.false(wrapper.instance().state.expanded);
});
