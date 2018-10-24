import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getModule } from '../utils/modules';
import { setQuestionTitle } from '../actions/questionActions';

const Question = ({ id, questions, sectionId, setTitle }) => {
  const questionObject = questions.find(question => question.id === id);
  const NewModule = getModule(questionObject.type);
  const handleTitleChange = e => setTitle(id, e.target.value);
  return (
    <NewModule key={questionObject.id} sectionId={sectionId} onTitleChange={handleTitleChange} {...questionObject} />
  );
};

Question.propTypes = {
  id: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  sectionId: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  questions: state.questions,
});

const mapDispatchToProps = dispatch => ({
  setTitle: (id, text) => dispatch(setQuestionTitle(id, text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
