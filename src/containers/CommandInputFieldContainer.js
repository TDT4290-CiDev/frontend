import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';
import { validCommandsString } from '../utils/modules';

class CommandInputFieldContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
    };
  }

  handleChange = e => {
    this.setState({ inputText: e.target.value });
  };

  handleKeyPress = e => {
    const { inputText } = this.state;
    const { addModuleToForm } = this.props;
    if (e.key === 'Enter') {
      try {
        addModuleToForm(inputText);
        this.setState({ inputText: '' });
      } catch (err) {
        if (inputText !== '') {
          // TODO: Show an error message to user
          console.log(`Not valid. Valid commands: ${validCommandsString}`);
        }
      }
    }
  };

  render() {
    const { inputText } = this.state;
    const { focus } = this.props;
    return (
      <div className="command-input">
        <InputField
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
  addModuleToForm: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
};

export default CommandInputFieldContainer;
