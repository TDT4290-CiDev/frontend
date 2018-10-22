import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import BulletPoint from './BulletPoint';

const BulletPointList = SortableContainer(
  ({ bulletPoints, onBulletPointTextChange, onBulletPointFocus, onBulletPointKeyPress, activeField }) => (
    <ul>
      {bulletPoints.map((bulletPoint, index) => (
        <BulletPoint
          key={bulletPoint.id}
          id={bulletPoint.id}
          index={index}
          listIndex={index}
          text={bulletPoint.text}
          onChange={onBulletPointTextChange}
          onFocus={onBulletPointFocus}
          onKeyPress={onBulletPointKeyPress}
          focus={activeField === bulletPoint.id}
        />
      ))}
    </ul>
  )
);

BulletPointList.propTypes = {
  bulletPoints: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBulletPointTextChange: PropTypes.func.isRequired,
  onBulletPointFocus: PropTypes.func.isRequired,
  onBulletPointKeyPress: PropTypes.func.isRequired,
  activeField: PropTypes.string.isRequired,
};

export default BulletPointList;
