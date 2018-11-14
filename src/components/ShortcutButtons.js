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
        <button title="Kortsvar&#013;Markup-kode: _" type="button" onClick={() => onClick('_')}>
          <i className="material-icons">short_text</i>
        </button>
        <button title="Radioknapp&#013;Markup-kode: *" type="button" onClick={() => onClick('*')}>
          <i className="material-icons">radio_button_checked</i>
        </button>
        <button title="Avmerkingsboks&#013;Markup-kode: []" type="button" onClick={() => onClick('[]')}>
          <i className="material-icons">check_box</i>
        </button>
        <button title="Flere typer" type="button" onClick={this.toggleExpanded}>
          <i className="material-icons">more_vert</i>
        </button>
        <div className={`shortcut-buttons__expandable ${expanded ? 'open' : ''}`}>
          {expanded && (
            <div>
              <button title="Langsvar&#013;Markup-kode: __" type="button" onClick={() => onClick('__')}>
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
