import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';
import { isValidCommand, validCommandsString } from '../utils/modules';

class CommandInputFieldContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onKeyPress = (e) => {
    const { text } = this.state;
    const { addModuleToForm } = this.props;
    if (e.key === 'Enter') {
      if (isValidCommand(text)) {
        addModuleToForm(text);
        this.setState({ text: '' });
      } else if (text !== '') {
        // TODO: Show an error message to user
        console.log(`Not valid. Valid commands: ${validCommandsString}`);
      }
    }
  };

  render() {
    const { text } = this.state;
    const { focus } = this.props;
    return (
      <div className="command-input">
        <InputField
          type="text"
          value={text}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
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
