import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';
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

  handleKeyPress = e => {
    const { inputText } = this.state;
    const { addNewSection, addNewQuestion, sections } = this.props;
    if (e.key === 'Enter') {
      if (isValidCommand(inputText)) {
        // TODO: Fix this mess
        let sectionId;
        let index;
        if (sections.length === 0) {
          sectionId = addNewSection(0);
          index = 0;
        } else {
          sectionId = sections[sections.length - 1].id;
          index = sections.find(x => x.id === sectionId).questions.length;
        }
        addNewQuestion(sectionId, index, getCommandTranslation(inputText), getUniqueStateAttributes(inputText));
        this.setState({ inputText: '' });
      } else if (inputText !== '') {
        // TODO: Show an error message to user
        console.log(`Not valid. Valid commands: ${validCommandsString}`);
      }
    }
  };

  render() {
    const { inputText } = this.state;
    const { focus } = this.props;
    return (
      <div className="command-input">
        <InputField
          id="command-input"
          type="text"
          value={inputText}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          placeholder={validCommandsString}
          autoFocus={focus}
        />
      </div>
    );
  }
}

CommandInputFieldContainer.propTypes = {
  addNewSection: PropTypes.func.isRequired,
  addNewQuestion: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  sections: state.sections,
});

const mapDispatchToProps = dispatch => ({
  addNewSection: index => dispatch(addSection(index)),
  addNewQuestion: (sectionId, index, type, uniqueStateAttributes) =>
    dispatch(addQuestion(sectionId, index, type, uniqueStateAttributes)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandInputFieldContainer);
