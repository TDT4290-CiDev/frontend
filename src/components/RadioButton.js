import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';
import DragHandle from './DragHandle';
import InputField from './InputField';

const RadioButton = SortableElement(
  ({ id, listIndex, text, onTextChange, onChecked, checked, onKeyPress, designing }) => {
    const handleTextChange = e => {
      onTextChange(id, e.target.value);
    };

    const handleKeyPress = e => {
      onKeyPress(e, id, listIndex);
    };

    const handleChecked = () => {
      onChecked(id);
    };

    return designing ? (
      <div className="radio-button">
        <i className="material-icons">radio_button_checked</i>
        <DragHandle />
        <InputField id={id} type="text" onChange={handleTextChange} onKeyDown={handleKeyPress} value={text} />
      </div>
    ) : (
      <div className="radio-button">
        <InputField
          id={`${id}-radio`}
          type="radio"
          value={text}
          checked={checked}
          onChange={handleChecked}
          disableOnFocus
          disableAutoFocus
        />
        <p id={id}>{text}</p>
      </div>
    );
  }
);

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  designing: PropTypes.bool.isRequired,
};

export default RadioButton;
