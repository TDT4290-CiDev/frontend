import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommandInputFieldContainer from './CommandInputFieldContainer';
import SectionContainer from './SectionContainer';
import InputField from '../components/InputField';
import { setDocumentTitle } from '../actions/documentActions';

export class DocumentContainer extends React.Component {
  handleTitleChange = e => {
    const { onTitleChange } = this.props;
    onTitleChange(e.target.value);
  };

  render() {
    const { id, title, sections, designing } = this.props;
    return designing ? (
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
            <SectionContainer key={sectionId} id={sectionId} designing={designing} />
          ))}
        </div>
        <CommandInputFieldContainer />
      </div>
    ) : (
      <div className="document-container">
        <p id={id} className="document-container__title">
          {title}
        </p>
        <div className="document-container__sections">
          {sections.map(sectionId => (
            <SectionContainer key={sectionId} id={sectionId} designing={designing} />
          ))}
        </div>
      </div>
    );
  }
}

DocumentContainer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
  designing: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  id: state.document.id,
  title: state.document.title,
  sections: state.document.sections,
});

export const mapDispatchToProps = dispatch => ({
  onTitleChange: title => dispatch(setDocumentTitle(title)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentContainer);
