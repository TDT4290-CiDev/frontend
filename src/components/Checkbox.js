import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';

const Checkbox = ({ id, checked, onChange }) => (
  <InputField
    id={id}
    type="checkbox"
    className="checkbox"
    checked={checked}
    onChange={onChange}
    disableOnFocus
    disableAutoFocus
  />
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
