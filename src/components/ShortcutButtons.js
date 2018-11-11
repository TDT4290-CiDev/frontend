import React from 'react';
import PropTypes from 'prop-types';

const ShortcutButtons = ({ onClick }) => (
  <div className="shortcut-buttons">
    <button type="button" onClick={() => onClick('_')}>
      Kortsvar
    </button>
    <button type="button" onClick={() => onClick('()')}>
      Radiobutton
    </button>
    <button type="button" onClick={() => onClick('[]')}>
      Checkbox
    </button>
  </div>
);

ShortcutButtons.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ShortcutButtons;
