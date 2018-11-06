import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';

const ShortAnswerContainer = ({ id, title, editable, onTitleChange }) => {
  const handleTitleChange = e => {
    onTitleChange(id, e.target.value);
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
        disabled={editable}
      />
      <InputField
        id={`${id}-input`}
        type="text"
        className="short-answer-container__input"
        placeholder={title}
        disabled={!editable}
      />
    </div>
  );
};

ShortAnswerContainer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
};
export default ShortAnswerContainer;
