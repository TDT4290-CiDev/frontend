import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getModule } from '../utils/modules';

const Question = ({ id, questions, sectionId, editable }) => {
  const questionObject = questions.find(question => question.id === id);
  const NewModule = getModule(questionObject.type);
  return <NewModule key={questionObject.id} sectionId={sectionId} editable={editable} {...questionObject} />;
};

Question.propTypes = {
  id: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  sectionId: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  questions: state.questions,
});

export default connect(
  mapStateToProps,
  null
)(Question);
