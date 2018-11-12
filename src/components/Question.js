import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getModule } from '../utils/modules';
import { setQuestionTitle } from '../actions/questionActions';

const Question = ({ id, questions, sectionId, designing, setTitle }) => {
  const questionObject = questions.find(question => question.id === id);
  const NewModule = getModule(questionObject.type);
  return (
    <NewModule
      key={questionObject.id}
      sectionId={sectionId}
      designing={designing}
      onTitleChange={setTitle}
      {...questionObject}
    />
  );
};

Question.propTypes = {
  id: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  sectionId: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  designing: PropTypes.bool.isRequired,
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
