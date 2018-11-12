import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';
import Checkbox from '../components/Checkbox';
import { toggleCheckbox } from '../actions/checkboxActions';

const CheckboxContainer = ({ id, title, checked, onTitleChange, onToggle }) => {
  const handleToggle = () => {
    onToggle(id);
  };

  const handleTitleChange = e => {
    onTitleChange(id, e.target.value);
  };

  return (
    <div className="checkbox-container">
      <Checkbox id={`${id}-checkbox`} checked={checked} onChange={handleToggle} />
      <InputField
        id={`${id}-title`}
        type="text"
        onChange={handleTitleChange}
        value={title}
        placeholder="Checkbox tittel her..."
      />
    </div>
  );
};

CheckboxContainer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onToggle: id => dispatch(toggleCheckbox(id)),
});

export default connect(
  null,
  mapDispatchToProps
)(CheckboxContainer);
