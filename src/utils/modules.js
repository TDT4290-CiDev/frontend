// When you have created a new from module, there are three things you have to do:

// 1. Import your module container
import TestComponent from '../components/TestComponent'; // Remove this later
import BulletPointListContainer from '../containers/BulletPointListContainer';

// 2. Create a shortcut to the container
const availableModules = {
  '[]': TestComponent,
  _: TestComponent,
  __: TestComponent,
  '*': BulletPointListContainer,
};

// 3. Add a description to the container
const commandTranslation = {
  '[]': 'flervalgsspørsmål',
  _: 'textsvar',
  __: 'langsvar',
  '*': 'punktliste',
};

// Helper methods
const validCommands = Object.keys(availableModules);

const validCommandsString = validCommands.map(command => `${command} ${commandTranslation[command]}`).join(', ');

const isValidCommand = command => validCommands.includes(command);

const getModule = moduleShortcut => availableModules[moduleShortcut];

export { getModule, isValidCommand, validCommandsString };
