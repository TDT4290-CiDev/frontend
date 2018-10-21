// When you have created a new from module, there are three things you have to do:

// 1. Import your module container
import TestComponent from '../components/TestComponent'; // Remove this later
import BulletPointListContainer from '../containers/BulletPointListContainer';

// 2. Create a shortcut to the container
const availableModules = {
  '[] {option}': TestComponent,
  _: TestComponent,
  __: TestComponent,
  '* {item}': BulletPointListContainer,
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

const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getModule = moduleShortcut => {
  for(const key of Object.keys(availableModules)) {
    const patternElements = key.split(/{[a-zA-Z_-]+}/);
    const pattern = new RegExp(`^${  patternElements.map(x => x.trim()).map(escapeRegExp).join('.*')  }$`);
    if(moduleShortcut.match(pattern)) {
      return availableModules[key];
    }
  }
  return null;
}

export { getModule, isValidCommand, validCommandsString };
