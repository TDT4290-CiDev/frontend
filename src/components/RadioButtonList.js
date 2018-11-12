import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import RadioButton from './RadioButton';

const RadioButtonList = SortableContainer(
  ({ radioButtons, onRadioButtonTextChange, onRadioButtonKeyPress, onCheckedItemChange, checkedItem, designing }) => (
    <div>
      {radioButtons.map((radioButton, index) => (
        <RadioButton
          key={radioButton.id}
          id={radioButton.id}
          index={index}
          listIndex={index}
          text={radioButton.text}
          onChecked={onCheckedItemChange}
          checked={checkedItem === radioButton.id}
          onTextChange={onRadioButtonTextChange}
          onKeyPress={onRadioButtonKeyPress}
          designing={designing}
        />
      ))}
    </div>
  )
);

RadioButtonList.propTypes = {
  radioButtons: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRadioButtonTextChange: PropTypes.func.isRequired,
  onRadioButtonKeyPress: PropTypes.func.isRequired,
  onCheckedItemChange: PropTypes.func.isRequired,
  designing: PropTypes.bool.isRequired,
};

export default RadioButtonList;
