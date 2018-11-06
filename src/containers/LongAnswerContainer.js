import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';

const LongAnswerContainer = ({ id, title, editable, onTitleChange }) => {
  const handleTitleChange = e => {
    onTitleChange(id, e.target.value);
  };
  return (
    <div className="long-answer-container">
      <InputField
        id={id}
        type="text"
        className="long-answer-container__label"
        onChange={handleTitleChange}
        value={title}
        placeholder="Langsvar..."
        disabled={editable}
      />
      <textarea id={`${id}-input`} type="text" className="long-answer-container__input" disabled={!editable} />
    </div>
  );
};
LongAnswerContainer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
};
export default LongAnswerContainer;
