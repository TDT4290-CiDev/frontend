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
  constructor(props) {
    super(props);
    this.state = {
      bulletPoints: [
        {
          text: '',
        },
      ],
      activeField: 'title',
    };
  }

  handleBulletPointTextChange = (bulletPointId, newValue) => {
    const { bulletPoints } = this.state;
    const { id, setBulletPointValue } = this.props;
    setBulletPointValue(id, bulletPointId, newValue);
    this.setState({
      bulletPoints: bulletPoints.map(
        (bulletPoint, i) => (i === bulletPointId ? { ...bulletPoint, text: newValue } : bulletPoint)
      ),
    });
  };

  // Is triggered when user shifts focus by clicking or tabbing
  handleBulletPointFocus = id => {
    this.setState({ activeField: id });
  };

  handleBulletPointKeyPress = (e, bulletPointId, index) => {
    const inputValue = e.target.value;
    const { id, sectionId, bulletPoints, changeFocusToCommandInputField, removeBulletPointList } = this.props;
    switch (e.key) {
      case 'Enter':
        if (inputValue === '') {
          if (bulletPoints.length > 1) {
            this.removeBulletPoint(bulletPointId);
            if (index === bulletPoints.length - 1) {
              changeFocusToCommandInputField();
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
            if (index !== 0) {
              this.setActiveField(bulletPoints[index - 1].id);
            } else {
              this.setActiveField('title');
            }
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
    setTimeout(() => this.setState({ activeField: id }), 10);
  };

  // index is the index for the new bullet point
  addBulletPoint = index => {
    const { id, addNewBulletPoint } = this.props;
    const newBulletPointId = uuidv1();
    addNewBulletPoint(id, newBulletPointId, index);
    this.setState({
      activeField: newBulletPointId,
    });
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
    const { activeField } = this.state;
    const { id, title, bulletPoints } = this.props;
    return (
      <div className="bullet-list-container">
        <InputField
          id={id}
          type="text"
          onChange={this.handleTitleChange}
          onKeyPress={this.handleTitleKeyPress}
          onFocus={() => this.setActiveField('title')}
          value={title}
          placeholder="Min punktliste..."
          autoFocus={activeField === 'title'}
        />
        <BulletPointList
          bulletPoints={bulletPoints}
          activeField={activeField}
          onBulletPointTextChange={this.handleBulletPointTextChange}
          onBulletPointFocus={this.handleBulletPointFocus}
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
  changeFocusToCommandInputField: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addNewBulletPoint: (questionId, bulletPointId, index) => dispatch(addBulletPoint(questionId, bulletPointId, index)),
  removeBulletPoint: (questionId, bulletPointId) => dispatch(removeBulletPoint(questionId, bulletPointId)),
  moveBulletPoint: (questionId, oldIndex, newIndex) => dispatch(moveBulletPoint(questionId, oldIndex, newIndex)),
  setBulletPointValue: (questionId, bulletPointId, value) =>
    dispatch(setBulletPointText(questionId, bulletPointId, value)),
  removeBulletPointList: (id, sectionId) => dispatch(removeQuestion(id, sectionId)),
  changeFocusToCommandInputField: () => dispatch(setFocus('commandInput')),
  setTitle: (id, text) => dispatch(setQuestionTitle(id, text)),
});

export default connect(
  null,
  mapDispatchToProps
)(BulletPointListContainer);
