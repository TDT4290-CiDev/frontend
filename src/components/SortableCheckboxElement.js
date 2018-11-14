import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';
import DragHandle from './DragHandle';
import InputField from './InputField';
import Checkbox from './Checkbox';

const SortableCheckboxElement = SortableElement(
  ({ id, listIndex, text, onTextChange, onChecked, checked, onKeyPress, designing }) => {
    const handleTextChange = e => {
      onTextChange(id, e.target.value);
    };

    const handleKeyPress = e => {
      onKeyPress(e, id, listIndex);
    };

    const handleToggle = () => {
      onChecked(id);
    };

    return designing ? (
      <div className="checkbox-container">
        <i className="material-icons list-checkbox">check_box</i>
        <DragHandle />
        <InputField
          id={id}
          name="checkbox"
          type="text"
          onChange={handleTextChange}
          onKeyDown={handleKeyPress}
          value={text}
        />
      </div>
    ) : (
      <div className="checkbox-container">
        <Checkbox id={`${id}-checkbox`} checked={checked} onChange={handleToggle} />
        <span id={id}>{text}</span>
      </div>
    );
  }
);

SortableCheckboxElement.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  designing: PropTypes.bool.isRequired,
};

export default SortableCheckboxElement;
