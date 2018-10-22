import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommandInputFieldContainer from './CommandInputFieldContainer';
import SectionContainer from './SectionContainer';
import InputField from '../components/InputField';
import { setDocumentTitle } from '../actions/documentActions';
import { addSection, removeSection } from '../actions/sectionActions';

class DocumentContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      commandInputFieldFocus: false,
    };
  }

  handleTitleChange = e => {
    const { onTitleChange } = this.props;
    onTitleChange(e.target.value);
  };

  changeFocusToCommandInputField = () => {
    this.setState({ commandInputFieldFocus: true });
    setTimeout(() => this.setState({ commandInputFieldFocus: false }), 1);
  };

  render() {
    const { commandInputFieldFocus } = this.state;
    const { id, title, sections } = this.props;
    return (
      <div className="document-container">
        <InputField
          id={id}
          className="document-container__title"
          type="text"
          placeholder="Skriv inn dokumenttittel..."
          value={title}
          onChange={this.handleTitleChange}
        />
        <div className="document-container__sections">
          {sections.map(sectionId => (
            <SectionContainer key={sectionId} id={sectionId} />
          ))}
        </div>
        <CommandInputFieldContainer focus={commandInputFieldFocus} />
      </div>
    );
  }
}

DocumentContainer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  id: state.document.id,
  title: state.document.title,
  sections: state.document.sections,
});

const mapDispatchToProps = dispatch => ({
  addSection: index => dispatch(addSection(index)),
  removeSection: id => dispatch(removeSection(id)),
  onTitleChange: title => dispatch(setDocumentTitle(title)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentContainer);
