import uuidv1 from 'uuid/v1';
// When you have created a new from module, there are some things you have to do:

// 1. Export your module container in src/containers/modules/index.js and import it here
import {
  BulletPointListContainer,
  RadioButtonListContainer,
  CheckboxContainer,
  LongAnswerContainer,
  ShortAnswerContainer,
} from '../containers/modules';

// 2. Create a shortcut to the container
const availableModules = {
  checkbox: CheckboxContainer,
  kortsvar: ShortAnswerContainer,
  langsvar: LongAnswerContainer,
  punktliste: BulletPointListContainer,
  radiobutton: RadioButtonListContainer,
};

// 3. Add a description to the container
const commandTranslation = {
  '[]': 'checkbox',
  _: 'kortsvar',
  __: 'langsvar',
  '*': 'punktliste',
  '()': 'radiobutton',
};

// 4. Add unique state attributes to new modules of that type, if any
const uniqueStateAttributes = (shortcut, newId) => {
  switch (shortcut) {
    case '[]':
      return { checked: false };
    case '*':
      return { listItems: [{ id: newId, text: '' }] };
    case '()':
      return { listItems: [{ id: newId, text: '' }], checkedItem: '' };
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
