import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import InputField from '../components/InputField';
import RadioButtonList from '../components/RadioButtonList';
import BulletPointList from '../components/BulletPointList';
import CheckboxList from '../components/CheckboxList';
import { addListItem, removeListItem, moveListItem, setListItemText } from '../actions/listActions';
import { removeQuestion } from '../actions/questionActions';
import { setFocus } from '../actions/documentActions';

class GenericListContainer extends React.Component {
  handleListItemTextChange = (listItemId, newValue) => {
    const { id, setListItemValue } = this.props;
    setListItemValue(id, listItemId, newValue);
  };

  handleListItemKeyPress = (e, listItemId, index) => {
    const inputValue = e.target.value;
    const { id, sectionId, listItems, removeList } = this.props;
    switch (e.key) {
      case 'Enter':
        if (inputValue.trim() === '') {
          if (listItems.length > 1) {
            this.removeListItem(listItemId);
            if (index === listItems.length - 1) {
              this.setActiveField('commandInput');
            } else {
              this.setActiveField(listItems[index - 1].id);
            }
          }
        } else if (index === listItems.length - 1 || listItems[index + 1].text !== '') {
          this.addListItem(index + 1, e.target.name);
        } else {
          this.setActiveField(listItems[index + 1].id);
        }
        break;
      case 'Backspace':
        if (inputValue === '') {
          if (listItems.length === 1) {
            removeList(id, sectionId);
            this.setActiveField('commandInput');
          } else {
            this.removeListItem(listItemId);
            this.setActiveField(index !== 0 ? listItems[index - 1].id : id);
          }
        }
        break;
      default:
        break;
    }
  };

  removeListItem = listItemId => {
    const { id, removeListItem } = this.props;
    removeListItem(id, listItemId);
  };

  setActiveField = id => {
    const { setActiveField } = this.props;

    // Necessary to not catch the same keypress unintentionally on the next active field
    setTimeout(() => setActiveField(id), 10);
  };

  // index is the index for the new list element
  addListItem = (index, type) => {
    const { id, addNewListItem } = this.props;
    const newListItemId = uuidv1();
    addNewListItem(id, newListItemId, index, type);
    this.setActiveField(newListItemId);
  };

  handleSortEnd = ({ oldIndex, newIndex }) => {
    const { id, moveListItem } = this.props;
    moveListItem(id, oldIndex, newIndex);
  };

  handleTitleKeyPress = e => {
    const { listItems } = this.props;
    if (e.key === 'Enter') {
      this.setActiveField(listItems[0].id);
    }
  };

  handleTitleChange = e => {
    const { id, onTitleChange } = this.props;
    onTitleChange(id, e.target.value);
  };

  render() {
    const {
      id,
      title,
      type,
      listItems,
      addNewListItem,
      removeListItem,
      moveListItem,
      setListItemValue,
      removeList,
      setActiveField,
      setTitle,
      designing,
      ...remainingProps
    } = this.props;
    return (
      <div className="generic-list-container">
        {designing ? (
          <InputField
            id={id}
            type="text"
            className="title"
            onChange={this.handleTitleChange}
            onKeyPress={this.handleTitleKeyPress}
            value={title}
            placeholder="Min liste..."
          />
        ) : (
          <p id={id} className="title">
            {title}
          </p>
        )}
        {type === 'bulletPointList' && (
          <BulletPointList
            bulletPoints={listItems}
            onBulletPointTextChange={this.handleListItemTextChange}
            onBulletPointKeyPress={this.handleListItemKeyPress}
            onSortEnd={this.handleSortEnd}
            useDragHandle
            designing={designing}
            {...remainingProps}
          />
        )}
        {type === 'radioButtonList' && (
          <RadioButtonList
            radioButtons={listItems}
            onRadioButtonTextChange={this.handleListItemTextChange}
            onRadioButtonKeyPress={this.handleListItemKeyPress}
            onSortEnd={this.handleSortEnd}
            useDragHandle
            designing={designing}
            {...remainingProps}
          />
        )}
        {type === 'checkboxList' && (
          <CheckboxList
            checkboxes={listItems}
            onCheckboxTextChange={this.handleListItemTextChange}
            onCheckboxKeyPress={this.handleListItemKeyPress}
            onSortEnd={this.handleSortEnd}
            useDragHandle
            designing={designing}
            {...remainingProps}
          />
        )}
      </div>
    );
  }
}

GenericListContainer.propTypes = {
  id: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  designing: PropTypes.bool.isRequired,
  addNewListItem: PropTypes.func.isRequired,
  removeListItem: PropTypes.func.isRequired,
  moveListItem: PropTypes.func.isRequired,
  setListItemValue: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  setActiveField: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addNewListItem: (questionId, listItemId, index, type) => dispatch(addListItem(questionId, listItemId, index, type)),
  removeListItem: (questionId, listItemId) => dispatch(removeListItem(questionId, listItemId)),
  moveListItem: (questionId, oldIndex, newIndex) => dispatch(moveListItem(questionId, oldIndex, newIndex)),
  setListItemValue: (questionId, listItemId, value) => dispatch(setListItemText(questionId, listItemId, value)),
  removeList: (id, sectionId) => dispatch(removeQuestion(id, sectionId)),
  setActiveField: id => dispatch(setFocus(id)),
});

export default connect(
  null,
  mapDispatchToProps
)(GenericListContainer);
