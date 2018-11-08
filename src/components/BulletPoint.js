import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';
import DragHandle from './DragHandle';
import InputField from './InputField';

const BulletPoint = SortableElement(({ id, listIndex, text, onChange, onKeyPress }) => {
  const handleTextChange = e => {
    onChange(id, e.target.value);
  };

  const handleKeyPress = e => {
    onKeyPress(e, id, listIndex);
  };

  return (
    <li className="bullet-point">
      <DragHandle />
      <InputField id={id} type="text" onChange={handleTextChange} onKeyDown={handleKeyPress} value={text} />
    </li>
  );
});

BulletPoint.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  designing: PropTypes.bool.isRequired,
};

export default BulletPoint;
