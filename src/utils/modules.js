// Import all available module components
import BulletPointListContainer from '../containers/BulletPointListContainer';

// Create shortcut to all modules
const availableModules = {
  '[]': 'flervalgsspørsmål',
  _: 'textsvar',
  __: 'langsvar',
  '*': BulletPointListContainer,
};

// Add a description to each shortcut
const commandTranslation = {
  '[]': 'flervalgsspørsmål',
  _: 'textsvar',
  __: 'langsvar',
  '*': 'punktliste',
};

// Add available shortcuts to valid commands
const validCommands = Object.keys(availableModules);

const validCommandsString = validCommands.map(command => `${command} ${commandTranslation[command]}`).join(', ');

const isValidCommand = command => validCommands.includes(command);

export { availableModules, isValidCommand, validCommandsString };
