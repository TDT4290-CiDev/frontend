import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import InputField from '../components/InputField';
import BulletPointList from '../components/BulletPointList';
import {
  addBulletPoint,
  removeBulletPoint,
  moveBulletPoint,
  setBulletPointText,
} from '../actions/bulletPointListActions';
import { setQuestionTitle, removeQuestion } from '../actions/questionActions';
import { setFocus } from '../actions/documentActions';

class BulletPointListContainer extends React.Component {
  handleBulletPointTextChange = (bulletPointId, newValue) => {
    const { id, setBulletPointValue } = this.props;
    setBulletPointValue(id, bulletPointId, newValue);
  };

  handleBulletPointKeyPress = (e, bulletPointId, index) => {
    const inputValue = e.target.value;
    const { id, sectionId, bulletPoints, removeBulletPointList } = this.props;
    switch (e.key) {
      case 'Enter':
        if (inputValue === '') {
          if (bulletPoints.length > 1) {
            this.removeBulletPoint(bulletPointId);
            if (index === bulletPoints.length - 1) {
              this.setActiveField('commandInput');
            } else {
              this.setActiveField(bulletPoints[index - 1].id);
            }
          }
        } else if (index === bulletPoints.length - 1 || bulletPoints[index + 1].text !== '') {
          this.addBulletPoint(index + 1);
        } else {
          this.setActiveField(bulletPoints[index + 1].id);
        }
        break;
      case 'Backspace':
        if (inputValue === '') {
          if (bulletPoints.length === 1) {
            removeBulletPointList(id, sectionId);
          } else {
            this.removeBulletPoint(bulletPointId);
            this.setActiveField(index !== 0 ? bulletPoints[index - 1].id : id);
          }
        }
        break;
      default:
        // Add last character of inputValue to bullet point text if e is an repeating event because onKeyDown does not do it by itself
        if (e.repeat) {
          this.handleBulletPointTextChange(bulletPointId, inputValue + inputValue.charAt(inputValue.length - 1));
        }
        break;
    }
  };

  removeBulletPoint = bulletPointId => {
    const { id, removeBulletPoint } = this.props;
    removeBulletPoint(id, bulletPointId);
  };

  setActiveField = id => {
    const { setActiveField } = this.props;

    // Necessary to not catch the same keypress unintentionally on the next active field
    setTimeout(() => setActiveField(id), 10);
  };

  // index is the index for the new bullet point
  addBulletPoint = index => {
    const { id, addNewBulletPoint } = this.props;
    const newBulletPointId = uuidv1();
    addNewBulletPoint(id, newBulletPointId, index);
    this.setActiveField(newBulletPointId);
  };

  handleSortEnd = ({ oldIndex, newIndex }) => {
    const { id, moveBulletPoint } = this.props;
    moveBulletPoint(id, oldIndex, newIndex);
  };

  handleTitleKeyPress = e => {
    const { bulletPoints } = this.props;
    if (e.key === 'Enter') {
      this.setActiveField(bulletPoints[0].id);
    }
  };

  handleTitleChange = e => {
    const { id, setTitle } = this.props;
    setTitle(id, e.target.value);
  };

  render() {
    const { id, title, bulletPoints } = this.props;
    return (
      <div className="bullet-list-container">
        <InputField
          id={id}
          type="text"
          onChange={this.handleTitleChange}
          onKeyPress={this.handleTitleKeyPress}
          value={title}
          placeholder="Min punktliste..."
        />
        <BulletPointList
          bulletPoints={bulletPoints}
          onBulletPointTextChange={this.handleBulletPointTextChange}
          onBulletPointKeyPress={this.handleBulletPointKeyPress}
          onSortEnd={this.handleSortEnd}
          useDragHandle
        />
      </div>
    );
  }
}

BulletPointListContainer.propTypes = {
  id: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bulletPoints: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNewBulletPoint: PropTypes.func.isRequired,
  removeBulletPoint: PropTypes.func.isRequired,
  moveBulletPoint: PropTypes.func.isRequired,
  setBulletPointValue: PropTypes.func.isRequired,
  removeBulletPointList: PropTypes.func.isRequired,
  setActiveField: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addNewBulletPoint: (questionId, bulletPointId, index) => dispatch(addBulletPoint(questionId, bulletPointId, index)),
  removeBulletPoint: (questionId, bulletPointId) => dispatch(removeBulletPoint(questionId, bulletPointId)),
  moveBulletPoint: (questionId, oldIndex, newIndex) => dispatch(moveBulletPoint(questionId, oldIndex, newIndex)),
  setBulletPointValue: (questionId, bulletPointId, value) =>
    dispatch(setBulletPointText(questionId, bulletPointId, value)),
  removeBulletPointList: (id, sectionId) => dispatch(removeQuestion(id, sectionId)),
  setActiveField: id => dispatch(setFocus(id)),
  setTitle: (id, text) => dispatch(setQuestionTitle(id, text)),
});

export default connect(
  null,
  mapDispatchToProps
)(BulletPointListContainer);
