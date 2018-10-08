import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';
import DragHandle from './DragHandle';
import InputField from './InputField';

const BulletPoint = SortableElement(({ id, text, onChange, onFocus, onKeyPress, focus }) => {
  const handleTextChange = e => {
    onChange(id, e.target.value);
  };

  const handleFocus = () => {
    onFocus(id);
  };

  const handleKeyPress = e => {
    onKeyPress(e.key, e.target.value, id, e.repeat);
  };

  return (
    <li className="bullet-point">
      <DragHandle />
      <InputField
        id={id}
        type="text"
        onChange={handleTextChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyPress}
        value={text}
        autoFocus={focus}
      />
    </li>
  );
});

BulletPoint.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
};

export default BulletPoint;
