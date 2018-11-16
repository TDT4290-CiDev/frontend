import React from 'react';
import PropTypes from 'prop-types';

export class ShortcutButtons extends React.Component {
  state = { expanded: false };

  collapse = () => {
    this.setState({ expanded: false });
  };

  toggleExpanded = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  handleClick = command => {
    const { onClick } = this.props;
    this.collapse();
    onClick(command);
  };

  render() {
    const { expanded } = this.state;

    return (
      <div className="shortcut-buttons" onBlur={() => setTimeout(this.collapse, 200)}>
        <button title="Kortsvar&#013;Markup-kode: _" type="button" onClick={() => this.handleClick('_')}>
          <i className="material-icons">short_text</i>
        </button>
        <button title="Radioknapp&#013;Markup-kode: *" type="button" onClick={() => this.handleClick('*')}>
          <i className="material-icons">radio_button_checked</i>
        </button>
        <button title="Avmerkingsboks&#013;Markup-kode: []" type="button" onClick={() => this.handleClick('[]')}>
          <i className="material-icons">check_box</i>
        </button>
        <button title="Flere typer" type="button" onClick={this.toggleExpanded}>
          <i className="material-icons">more_vert</i>
        </button>
        <div className={`shortcut-buttons__expandable ${expanded ? 'open' : ''}`}>
          {expanded && (
            <div>
              <button title="Langsvar&#013;Markup-kode: __" type="button" onClick={() => this.handleClick('__')}>
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
