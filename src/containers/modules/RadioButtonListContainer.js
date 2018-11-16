import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GenericListContainer from '../GenericListContainer';
import { setCheckedItem } from '../../actions/radioButtonActions';

export const RadioButtonListContainer = ({ id, checkedItem, onCheckedItem, ...remainingProps }) => {
  const handleCheckedItem = radioButtonId => {
    onCheckedItem(radioButtonId, id);
  };

  return (
    <div className="radio-list-container">
      <GenericListContainer
        id={id}
        onCheckedItemChange={handleCheckedItem}
        checkedItem={checkedItem}
        {...remainingProps}
        type="radioButtonList"
      />
    </div>
  );
};

RadioButtonListContainer.propTypes = {
  id: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkedItem: PropTypes.string.isRequired,
  designing: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onCheckedItem: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  onCheckedItem: (id, questionId) => dispatch(setCheckedItem(id, questionId)),
});

export default connect(
  null,
  mapDispatchToProps
)(RadioButtonListContainer);
