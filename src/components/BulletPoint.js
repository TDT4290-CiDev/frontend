import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';
import DragHandle from './DragHandle';
import InputField from './InputField';

const BulletPoint = SortableElement(({ id, text, onChange, onFocus, onKeyPress, focus }) => (
  <li className="bullet-point">
    <DragHandle />
    <InputField
      id={id}
      type="text"
      onChange={e => onChange(id, e.target.value)}
      onFocus={() => onFocus(id)}
      onKeyDown={e => onKeyPress(e, id)}
      value={text}
      autoFocus={focus}
    />
  </li>
));

BulletPoint.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
};

export default BulletPoint;
