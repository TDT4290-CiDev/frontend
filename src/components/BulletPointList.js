import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import BulletPoint from './BulletPoint';

const BulletPointList = SortableContainer(
  ({ bulletPoints, onBulletPointTextChange, onBulletPointKeyPress, editable }) => (
    <ul>
      {bulletPoints.map((bulletPoint, index) => (
        <BulletPoint
          key={bulletPoint.id}
          id={bulletPoint.id}
          index={index}
          listIndex={index}
          text={bulletPoint.text}
          onChange={onBulletPointTextChange}
          onKeyPress={onBulletPointKeyPress}
          editable={editable}
        />
      ))}
    </ul>
  )
);

BulletPointList.propTypes = {
  bulletPoints: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBulletPointTextChange: PropTypes.func.isRequired,
  onBulletPointKeyPress: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
};

export default BulletPointList;
