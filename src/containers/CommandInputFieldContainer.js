import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';
import ShortcutButtons from '../components/ShortcutButtons';
import { setFocus } from '../actions/documentActions';
import { addSection } from '../actions/sectionActions';
import { addQuestion } from '../actions/questionActions';
import { isValidCommand, validCommandsString, getCommandTranslation, getUniqueStateAttributes } from '../utils/modules';

class CommandInputFieldContainer extends React.Component {
  state = {
    inputText: '',
  };

  handleChange = e => {
    this.setState({ inputText: e.target.value });
  };

  handleShortcutButtonClick = command => {
    this.createNewQuestion(command);
  };

  createNewQuestion = command => {
    const { addNewSection, addNewQuestion, sections, setActiveField } = this.props;
    try {
      const sectionId = sections[sections.length - 1].id;
      const index = sections[sections.length - 1].questions.length;
      const questionId = addNewQuestion(
        sectionId,
        index,
        getCommandTranslation(command),
        getUniqueStateAttributes(command)
      );
      setActiveField(questionId);
    } catch (error) {
      const sectionId = addNewSection(0);
      addNewQuestion(sectionId, 0, getCommandTranslation(command), getUniqueStateAttributes(command));
      setActiveField(`${sectionId}-title`);
    }
  };

  handleKeyPress = e => {
    const { inputText } = this.state;
    if (['Enter', 'Spacebar', ' '].includes(e.key)) {
      if (isValidCommand(inputText)) {
        this.createNewQuestion(inputText);
        this.setState({ inputText: '' });
      } else if (inputText !== '') {
        // TODO: Show an error message to user
        console.log(`Not valid. Valid commands: ${validCommandsString}`);
      }
    }
  };

  render() {
    const { inputText } = this.state;
    return (
      <div className="command-input">
        <InputField
          id="commandInput"
          type="text"
          value={inputText}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          placeholder={validCommandsString}
        />
        {inputText === '' && <ShortcutButtons onClick={this.handleShortcutButtonClick} />}
      </div>
    );
  }
}

CommandInputFieldContainer.propTypes = {
  addNewSection: PropTypes.func.isRequired,
  addNewQuestion: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveField: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sections: state.sections,
});

const mapDispatchToProps = dispatch => ({
  addNewSection: index => dispatch(addSection(index)),
  addNewQuestion: (sectionId, index, type, uniqueStateAttributes) =>
    dispatch(addQuestion(sectionId, index, type, uniqueStateAttributes)),
  setActiveField: id => dispatch(setFocus(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandInputFieldContainer);
