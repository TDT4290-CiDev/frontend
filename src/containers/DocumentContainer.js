import React from 'react';
import uuidv1 from 'uuid/v1';
import CommandInputFieldContainer from './CommandInputFieldContainer';
import InputField from '../components/InputField';
import { getModule } from '../utils/modules';

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

  addModule = (moduleShortcut) => {
    const { activeModules } = this.state;
    const NewModule = getModule(moduleShortcut);
    const moduleId = uuidv1();
    this.setState({
      activeModules: [
        ...activeModules,
        {
          id: moduleId,
          module: (
            <NewModule
              key={moduleId}
              id={moduleId}
              changeFocusToCommandInputField={this.changeFocusToCommandInputField}
              removeModule={this.removeModule}
            />
          ),
        },
      ],
    });
  };

  removeModule = (moduleId) => {
    const { activeModules } = this.state;
    this.setState({ activeModules: activeModules.filter(activeModule => activeModule.id !== moduleId) });
    this.changeFocusToCommandInputField();
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
          {activeModules.map(activeModule => activeModule.module)}
        </div>
        <CommandInputFieldContainer addModuleToForm={this.addModule} focus={commandInputFieldFocus} />
      </div>
    );
  }
}

export default DocumentContainer;
