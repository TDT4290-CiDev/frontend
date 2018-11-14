import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GenericListContainer from '../GenericListContainer';
import { toggleCheckboxElement } from '../../actions/checkboxActions';

const CheckboxListContainer = ({ id, onToggle, ...remainingProps }) => {
  const handleCheck = checkboxId => {
    onToggle(checkboxId, id);
  };

  return (
    <div className="checkbox-list-container">
      <GenericListContainer id={id} onCheckedItemChange={handleCheck} {...remainingProps} type="checkboxList" />
    </div>
  );
};

CheckboxListContainer.propTypes = {
  id: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  designing: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onToggle: (id, questionId) => dispatch(toggleCheckboxElement(id, questionId)),
});

export default connect(
  null,
  mapDispatchToProps
)(CheckboxListContainer);
