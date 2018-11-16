import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputField from '../../components/InputField';
import { setFocus } from '../../actions/documentActions';
import { removeQuestion } from '../../actions/questionActions';
import { setInputValue } from '../../actions/textInputActions';

export const ShortAnswerContainer = ({
  id,
  sectionId,
  title,
  inputValue,
  designing,
  onTitleChange,
  onInputChange,
  removeQuestion,
  setActiveField,
}) => {
  const handleTitleChange = e => {
    onTitleChange(id, e.target.value);
  };

  const handleInputChange = e => {
    onInputChange(id, e.target.value);
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
    <div className="short-answer-container">
      <InputField
        id={id}
        type="text"
        className="short-answer-container__label"
        onChange={handleTitleChange}
        onKeyDown={handleKeyPress}
        value={title}
        placeholder="Kortsvar..."
        disabled={!designing}
      />
      <InputField
        id={`${id}-input`}
        type="text"
        className="short-answer-container__input"
        onChange={handleInputChange}
        value={inputValue}
        placeholder={title}
        disabled={designing}
      />
    </div>
  );
};

ShortAnswerContainer.propTypes = {
  id: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  designing: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired,
  setActiveField: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  onInputChange: (questionId, value) => dispatch(setInputValue(questionId, value)),
  removeQuestion: (id, sectionId) => dispatch(removeQuestion(id, sectionId)),
  setActiveField: id => dispatch(setFocus(id)),
});

export default connect(
  null,
  mapDispatchToProps
)(ShortAnswerContainer);
