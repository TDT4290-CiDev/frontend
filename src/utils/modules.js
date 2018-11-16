import uuidv1 from 'uuid/v1';
// When you have created a new from module, there are some things you have to do:

// 1. Export your module container in src/containers/modules/index.js and import it here
import {
  RadioButtonListContainer,
  CheckboxListContainer,
  LongAnswerContainer,
  ShortAnswerContainer,
} from '../containers/modules';

// 2. Create a shortcut to the container
const availableModules = {
  kortsvar: ShortAnswerContainer,
  langsvar: LongAnswerContainer,
  flervalg: RadioButtonListContainer,
  checkboxliste: CheckboxListContainer,
};

// 3. Add a description to the container
const commandTranslation = {
  _: 'kortsvar',
  __: 'langsvar',
  '*': 'flervalg',
  '[]': 'checkboxliste',
};

// 4. Add unique state attributes to new modules of that type, if any
const uniqueStateAttributes = (shortcut, newId) => {
  switch (shortcut) {
    case '[]':
      return { listItems: [{ id: newId, text: '', checked: false }] };
    case '*':
      return { listItems: [{ id: newId, text: '' }], checkedItem: '' };
    case '_':
    case '__':
      return { inputValue: '' };
    default:
      return {};
  }
};
// 5. Create actions and reducer(s) for your module

// Helper methods
const validCommands = Object.keys(commandTranslation);

const validCommandsString = validCommands.map(command => `${command} ${commandTranslation[command]}`).join(', ');

const isValidCommand = command => validCommands.includes(command);

const getModule = moduleType => availableModules[moduleType];

const getCommandTranslation = command => commandTranslation[command];

const getNewId = () => uuidv1();

const getUniqueStateAttributes = moduleShortcut => uniqueStateAttributes(moduleShortcut, getNewId());

export { getModule, isValidCommand, validCommandsString, getCommandTranslation, getUniqueStateAttributes };
