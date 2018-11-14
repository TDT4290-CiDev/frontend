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
          <i className="material-icons">short_text</i>
        </button>
        <button type="button" onClick={() => onClick('*')}>
          <i className="material-icons">radio_button_checked</i>
        </button>
        <button type="button" onClick={() => onClick('[]')}>
          <i className="material-icons">check_box</i>
        </button>
        <button type="button" onClick={this.toggleExpanded}>
          <i className="material-icons">more_vert</i>
        </button>
        <div className="shortcut-buttons__expandable">
          {expanded && (
            <div>
              <button type="button" onClick={() => onClick('__')}>
                <i className="material-icons">notes</i>
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
