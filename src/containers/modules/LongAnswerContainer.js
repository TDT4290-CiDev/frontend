import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputField from '../../components/InputField';
import { removeQuestion } from '../../actions/questionActions';
import { setFocus } from '../../actions/documentActions';

const LongAnswerContainer = ({ id, sectionId, title, designing, onTitleChange, removeQuestion, setActiveField }) => {
  const handleTitleChange = e => {
    onTitleChange(id, e.target.value);
  };

  const handleKeyPress = e => {
    const inputValue = e.target.value;
    switch (e.key) {
      case 'Backspace':
        if (inputValue.trim() === '') {
          removeQuestion(id, sectionId);
          setActiveField('commandInput');
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="long-answer-container">
      <InputField
        id={id}
        type="text"
        className="long-answer-container__label"
        onChange={handleTitleChange}
        onKeyDown={handleKeyPress}
        value={title}
        placeholder="Langsvar..."
        disabled={!designing}
      />
      <textarea
        id={`${id}-input`}
        placeholder={title}
        type="text"
        className="long-answer-container__input"
        disabled={designing}
      />
    </div>
  );
};
LongAnswerContainer.propTypes = {
  id: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  designing: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired,
  setActiveField: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  removeQuestion: (id, sectionId) => dispatch(removeQuestion(id, sectionId)),
  setActiveField: id => dispatch(setFocus(id)),
});

export default connect(
  null,
  mapDispatchToProps
)(LongAnswerContainer);
