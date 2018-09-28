import React from 'react';
import PropTypes from 'prop-types';
import BulletPoint from '../components/BulletPoint';

class BulletPointListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      bulletPoints: [
        {
          id: 0,
          text: 'hei',
        },
        {
          id: 1,
          text: 'på',
        },
      ],
    };
  }

  onBulletPointTextChange = (id, newValue) => {
    const { bulletPoints } = this.state;
    this.setState({
      bulletPoints: bulletPoints.map(
        (bulletPoint, index) => (index === id ? { ...bulletPoint, text: newValue } : bulletPoint),
      ),
    });
  };

  onBulletPointEnterPress = (id, inputValue) => {
    console.log(`${id} has pressed enter with value '${inputValue}'`);
  };

  removeBulletPoint = (id) => {
    const { bulletPoints } = this.state;
    this.setState({
      bulletPoints: bulletPoints.filter(bulletPoint => bulletPoint.id !== id),
    });
  };

  addNewBulletPoint = () => {
    const { bulletPoints } = this.state;
    this.setState({ bulletPoints: [...bulletPoints, { id: bulletPoints.length, text: '' }] });
  };

  render() {
    const { children } = this.props;
    const { title, bulletPoints } = this.state;

    return (
      <div className="bullet-list-container">
        <input
          type="text"
          placeholder="Min punktliste..."
          onChange={e => this.setState({ title: e.target.value })}
          value={title}
        />
        <ul>
          {bulletPoints.map(bulletPoint => (
            <BulletPoint
              key={bulletPoint.id}
              id={bulletPoint.id}
              text={bulletPoint.text}
              onChange={this.onBulletPointTextChange}
              onEnterPress={this.onBulletPointEnterPress}
            />
          ))}
        </ul>
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
