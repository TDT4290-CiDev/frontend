import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommandInputFieldContainer from './CommandInputFieldContainer';
import SectionContainer from './SectionContainer';
import InputField from '../components/InputField';
import { setDocumentTitle } from '../actions/documentActions';

class DocumentContainer extends React.Component {
  handleTitleChange = e => {
    const { onTitleChange } = this.props;
    onTitleChange(e.target.value);
  };

  render() {
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
        <CommandInputFieldContainer />
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
  onTitleChange: title => dispatch(setDocumentTitle(title)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentContainer);
