import React from 'react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';
import InputField from '../components/InputField';
import BulletPointList from '../components/BulletPointList';

class BulletPointListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      bulletPoints: [
        {
          text: '',
        },
      ],
      activeBulletPoint: -1,
    };
  }

  onBulletPointTextChange = (index, newValue) => {
    const { bulletPoints } = this.state;
    this.setState({
      bulletPoints: bulletPoints.map(
        (bulletPoint, i) => (i === index ? { ...bulletPoint, text: newValue } : bulletPoint),
      ),
    });
  };

  // Is triggered when user shifts focus by clicking or tabbing
  onBulletPointFocus = (index) => {
    this.setState({ activeBulletPoint: index });
  };

  onBulletPointKeyPress = (e, index) => {
    const inputValue = e.target.value;
    const { bulletPoints } = this.state;
    const { changeFocusToCommandInputField } = this.props;
    switch (e.key) {
      case 'Enter':
        if (inputValue === '') {
          if (bulletPoints.length > 1) {
            // TODO: Shift focus to CommandInputField
            this.removeBulletPoint(index);
            changeFocusToCommandInputField();
          } else {
            // TODO: Remove bullet point list
          }
        } else if (index === bulletPoints.length - 1 || bulletPoints[index + 1].text !== '') {
          this.addNewBulletPoint(index + 1);
        } else {
          this.setState({ activeBulletPoint: index + 1 });
        }
        break;
      case 'Backspace':
        // TODO: What should happen here?
        break;
      default:
        // Add last character of inputValue to bullet point text if e is an repeating event because onKeyDown does not do it by itself
        if (e.repeat) {
          this.onBulletPointTextChange(index, inputValue + inputValue.charAt(inputValue.length - 1));
        }
        break;
    }
  };

  removeBulletPoint = (index) => {
    const { bulletPoints } = this.state;
    this.setState({
      bulletPoints: bulletPoints.filter((bulletPoint, i) => i !== index),
    });

    // Set focus to previous bullet point if the removed bullet point not is the last one in the list
    if (bulletPoints.length - 1 !== index) {
      this.setState({ activeBulletPoint: index - 1 });
    }
  };

  // index is the index for the new bullet point
  addNewBulletPoint = (index) => {
    const { bulletPoints } = this.state;
    this.setState({
      bulletPoints: [...bulletPoints.slice(0, index), { text: '' }, ...bulletPoints.slice(index)],
      activeBulletPoint: index,
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { bulletPoints } = this.state;
    this.setState({
      bulletPoints: arrayMove(bulletPoints, oldIndex, newIndex),
    });
  };

  onTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.setState({ activeBulletPoint: 0 });
    }
  };

  render() {
    const { title, bulletPoints, activeBulletPoint } = this.state;

    return (
      <div className="bullet-list-container">
        <InputField
          type="text"
          onChange={e => this.setState({ title: e.target.value })}
          onKeyPress={e => this.onTitleKeyPress(e)}
          onFocus={() => this.setState({ activeBulletPoint: -1 })}
          value={title}
          placeholder="Min punktliste..."
          autoFocus={activeBulletPoint === -1}
        />
        <BulletPointList
          bulletPoints={bulletPoints}
          activeBulletPoint={activeBulletPoint}
          onBulletPointTextChange={this.onBulletPointTextChange}
          onBulletPointFocus={this.onBulletPointFocus}
          onBulletPointKeyPress={this.onBulletPointKeyPress}
          onSortEnd={this.onSortEnd}
          useDragHandle
        />
      </div>
    );
  }
}

BulletPointListContainer.propTypes = {
  changeFocusToCommandInputField: PropTypes.func.isRequired,
};

export default BulletPointListContainer;
