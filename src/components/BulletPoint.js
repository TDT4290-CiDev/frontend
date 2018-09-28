import React from 'react';
import PropTypes from 'prop-types';

const BulletPoint = ({
  id, text, onChange, onEnterPress,
}) => {
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnterPress(id, text);
    }
  };

  return (
    <li className="bullet-point">
      <input type="text" onChange={e => onChange(id, e.target.value)} value={text} onKeyPress={onKeyPress} />
    </li>
  );
};

BulletPoint.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func.isRequired,
};

export default BulletPoint;
