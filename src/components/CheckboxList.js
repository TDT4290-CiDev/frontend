import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import Checkbox from './Checkbox';

const CheckboxList = SortableContainer(
  ({ checkboxes, onCheckboxTextChange, onCheckboxKeyPress, onCheckedItemChange, designing }) => (
    <div>
      {checkboxes.map((checkbox, index) => (
        <Checkbox
          key={checkbox.id}
          id={checkbox.id}
          index={index}
          listIndex={index}
          text={checkbox.text}
          onChecked={onCheckedItemChange}
          checked={checkbox.checked}
          onTextChange={onCheckboxTextChange}
          onKeyPress={onCheckboxKeyPress}
          designing={designing}
        />
      ))}
    </div>
  )
);

CheckboxList.propTypes = {
  checkboxes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCheckboxTextChange: PropTypes.func.isRequired,
  onCheckboxKeyPress: PropTypes.func.isRequired,
  onCheckedItemChange: PropTypes.func.isRequired,
  designing: PropTypes.bool.isRequired,
};

export default CheckboxList;
