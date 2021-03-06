import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';
import Question from '../components/Question';
import { setSectionTitle, setSectionIngress } from '../actions/sectionActions';

const SectionContainer = ({ id, sections, setTitle, setIngress, designing }) => {
  const { title, ingress, questions } = sections.find(x => x.id === id);

  const handleTitleChange = e => {
    setTitle(id, e.target.value);
  };

  const handleIngressChange = e => {
    setIngress(id, e.target.value);
  };

  return (
    <div className="section-container">
      {!title.isHidden &&
        (designing ? (
          <InputField
            id={`${id}-title`}
            className="section-container__title"
            type="text"
            placeholder="Skriv inn seksjonstittel..."
            value={title.text}
            onChange={handleTitleChange}
          />
        ) : (
          <p id={`${id}-title`} className="section-container__title">
            {title.text}
          </p>
        ))}
      {!ingress.isHidden &&
        (designing ? (
          <InputField
            id={`${id}-ingress`}
            className="section-container__ingress"
            type="text"
            placeholder="Skriv inn seksjonsingress..."
            value={ingress.text}
            onChange={handleIngressChange}
          />
        ) : (
          <p id={`${id}-ingress`} className="section-container__ingress">
            {ingress.text}
          </p>
        ))}
      {questions.map(questionId => (
        <Question key={questionId} id={questionId} sectionId={id} designing={designing} />
      ))}
    </div>
  );
};

SectionContainer.propTypes = {
  id: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTitle: PropTypes.func.isRequired,
  setIngress: PropTypes.func.isRequired,
  designing: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  sections: state.sections,
});

const mapDispatchToProps = dispatch => ({
  setTitle: (id, title) => dispatch(setSectionTitle(id, title)),
  setIngress: (id, ingress) => dispatch(setSectionIngress(id, ingress)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionContainer);
