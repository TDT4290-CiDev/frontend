import React from 'react';
import uuidv1 from 'uuid/v1';
import CommandInputFieldContainer from './CommandInputFieldContainer';
import InputField from '../components/InputField';
import { availableModules } from '../utils/modules';

class DocumentContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      activeModules: [],
      commandInputFieldFocus: false,
    };
  }

  onTitleChange = e => this.setState({ title: e.target.value });

  changeFocusToCommandInputField = () => {
    this.setState({ commandInputFieldFocus: true });
    setTimeout(() => this.setState({ commandInputFieldFocus: false }), 1);
  };

  addModuleToForm = (module) => {
    const { activeModules } = this.state;
    this.setState({ activeModules: [...activeModules, availableModules[module]] });
  };

  render() {
    const { title, activeModules, commandInputFieldFocus } = this.state;
    return (
      <div className="document-container">
        <InputField
          className="document-container__title"
          type="text"
          placeholder="Skriv inn dokumenttittel..."
          value={title}
          onChange={this.onTitleChange}
        />
        <div className="document-container__active-modules">
          {activeModules.map(Component => (
            <Component key={uuidv1()} changeFocusToCommandInputField={this.changeFocusToCommandInputField} />
          ))}
        </div>
        <CommandInputFieldContainer addModuleToForm={this.addModuleToForm} focus={commandInputFieldFocus} />
      </div>
    );
  }
}

export default DocumentContainer;
