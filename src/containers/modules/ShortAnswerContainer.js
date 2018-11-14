import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputField from '../../components/InputField';
import { setInputValue } from '../../actions/textInputActions';

const ShortAnswerContainer = ({ id, title, inputValue, designing, onTitleChange, onInputChange }) => {
  const handleTitleChange = e => {
    onTitleChange(id, e.target.value);
  };

  const handleInputChange = e => {
    onInputChange(id, e.target.value);
  };

  return (
    <div className="short-answer-container">
      <InputField
        id={id}
        type="text"
        className="short-answer-container__label"
        onChange={handleTitleChange}
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
  title: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  designing: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onInputChange: (questionId, value) => dispatch(setInputValue(questionId, value)),
});

export default connect(
  null,
  mapDispatchToProps
)(ShortAnswerContainer);
