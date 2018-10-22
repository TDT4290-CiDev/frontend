import uuidv1 from 'uuid/v1';
// When you have created a new from module, there are some things you have to do:

// 1. Import your module container
import TestComponent from '../components/TestComponent'; // Remove this later
import BulletPointListContainer from '../containers/BulletPointListContainer';

// 2. Create a shortcut to the container
const availableModules = {
  flervalgsspørsmål: TestComponent,
  textsvar: TestComponent,
  langsvar: TestComponent,
  punktliste: BulletPointListContainer,
};

// 3. Add a description to the container
const commandTranslation = {
  '[]': 'flervalgsspørsmål',
  _: 'textsvar',
  __: 'langsvar',
  '*': 'punktliste',
};

// 4. Add unique state attributes to new modules of that type
const uniqueStateAttributes = {
  '[]': {},
  _: {},
  __: {},
  '*': { bulletPoints: [{ id: uuidv1(), text: '' }] },
};

// 5. Create actions and reducer(s) for your module

// Helper methods
const validCommands = Object.keys(commandTranslation);

const validCommandsString = validCommands.map(command => `${command} ${commandTranslation[command]}`).join(', ');

const isValidCommand = command => validCommands.includes(command);

const getModule = moduleType => availableModules[moduleType];

const getCommandTranslation = command => commandTranslation[command];

const getUniqueStateAttributes = moduleShortcut => uniqueStateAttributes[moduleShortcut];

export { getModule, isValidCommand, validCommandsString, getCommandTranslation, getUniqueStateAttributes };
