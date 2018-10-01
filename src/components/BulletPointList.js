import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import BulletPoint from './BulletPoint';

const BulletPointList = SortableContainer(
  ({
    bulletPoints, onBulletPointTextChange, onBulletPointFocus, onBulletPointKeyPress, activeBulletPoint,
  }) => (
    <ul>
      {bulletPoints.map((bulletPoint, index) => (
        <BulletPoint
          key={index}
          index={index}
          id={index}
          text={bulletPoint.text}
          onChange={onBulletPointTextChange}
          onFocus={onBulletPointFocus}
          onKeyPress={onBulletPointKeyPress}
          focus={activeBulletPoint === index}
        />
      ))}
    </ul>
  ),
);

BulletPointList.propTypes = {
  bulletPoints: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBulletPointTextChange: PropTypes.func.isRequired,
  onBulletPointFocus: PropTypes.func.isRequired,
  onBulletPointKeyPress: PropTypes.func.isRequired,
  activeBulletPoint: PropTypes.number.isRequired,
};

export default BulletPointList;
