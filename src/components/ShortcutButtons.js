import React from 'react';
import PropTypes from 'prop-types';

class ShortcutButtons extends React.Component {
  state = { check: false };

  render() {
    const { check } = this.state;
    const { onClick } = this.props;
    return (
      <div className="shortcut-buttons">
        <button type="button" onClick={() => onClick('_')}>
          Kortsvar
        </button>
        <button type="button" onClick={() => onClick('*')}>
          Radiobutton
        </button>
        <button type="button" onClick={() => onClick('[]')}>
          Checkboxlist
        </button>
        <button
          type="button"
          onClick={() =>
            this.setState(prevState => ({
              check: !prevState.check,
            }))
          }
        >
          Flere knapper
        </button>
        <div className="expandable-shortcut-buttons">
          {check && (
            <div>
              <button type="button" onClick={() => onClick('__')}>
                Langsvar
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ShortcutButtons.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ShortcutButtons;
