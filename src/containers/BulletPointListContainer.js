import React from 'react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';
import BulletPointList from '../components/BulletPointList';

class BulletPointListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      bulletPoints: [
        {
          text: 'heisann',
        },
        {
          text: 'på',
        },
      ],
      activeBulletPoint: 0,
    };
  }

  onBulletPointTextChange = (index, newValue) => {
    console.log(`${index} has changed with value: ${newValue}`);
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
    console.log(`${index} has pressed a key with value: ${inputValue}`);
    switch (e.key) {
      case 'Enter':
        console.log('Enter');
        // TODO: Remove bullet point list when id = 0 and inputValue = ''
        if (inputValue === '') {
          this.removeBulletPoint(index);
        } else if (index === bulletPoints.length - 1 || bulletPoints[index + 1].text !== '') {
          this.addNewBulletPoint(index + 1);
        } else {
          this.setState({ activeBulletPoint: index + 1 });
        }
        break;
      case 'Backspace':
        console.log('Backspace');
        break;
      default:
        console.log('default');
        // Add last character of inputValue to bullet point text if e is an repeting event because onKeyDown does not do it by itself
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
    const { children } = this.props;
    const { title, bulletPoints, activeBulletPoint } = this.state;

    return (
      <div className="bullet-list-container">
        <input
          type="text"
          placeholder="Min punktliste..."
          onChange={e => this.setState({ title: e.target.value })}
          onKeyPress={e => this.onTitleKeyPress(e)}
          onFocus={() => this.setState({ activeBulletPoint: -1 })}
          value={title}
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
        {children}
      </div>
    );
  }
}

BulletPointListContainer.propTypes = {
  children: PropTypes.node,
};

BulletPointListContainer.defaultProps = {
  children: null,
};

export default BulletPointListContainer;
