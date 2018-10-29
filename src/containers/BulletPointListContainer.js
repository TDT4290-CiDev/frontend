import React from 'react';
import PropTypes from 'prop-types';
import GenericListContainer from './GenericListContainer';

const BulletPointListContainer = props => (
  <div className="bullet-list-container">
    <GenericListContainer {...props} type="bulletPointList" />
  </div>
);

BulletPointListContainer.propTypes = {
  id: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  editable: PropTypes.bool.isRequired,
};

export default BulletPointListContainer;
