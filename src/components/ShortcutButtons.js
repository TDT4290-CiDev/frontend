import React from 'react';
import PropTypes from 'prop-types';

class ShortcutButtons extends React.Component {
  state = { expanded: false };

  collapse = () => {
    this.setState({ expanded: false });
  };

  toggleExpanded = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  render() {
    const { expanded } = this.state;
    const { onClick } = this.props;
    return (
      <div className="shortcut-buttons" onBlur={this.collapse}>
        <button type="button" onClick={() => onClick('_')}>
          Kortsvar
        </button>
        <button type="button" onClick={() => onClick('*')}>
          Radiobutton
        </button>
        <button type="button" onClick={() => onClick('[]')}>
          Checkboxlist
        </button>
        <button type="button" onClick={this.toggleExpanded}>
          Flere knapper
        </button>
        <div className="shortcut-buttons__expandable">
          {expanded && (
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
