import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../components/InputField';

const LongAnswerContainer = ({ id, title, designing, onTitleChange }) => {
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
        disabled={!designing}
      />
      <textarea
        id={`${id}-input`}
        placeholder="Langsvar"
        type="text"
        className="long-answer-container__input"
        disabled={designing}
      />
    </div>
  );
};
LongAnswerContainer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  designing: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
};
export default LongAnswerContainer;
