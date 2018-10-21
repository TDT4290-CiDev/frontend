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
  '[] {option}': 'flervalgsspørsmål',
  _: 'textsvar',
  __: 'langsvar',
  '* {item}': 'punktliste',
};

// Helper methods
const validCommands = Object.keys(availableModules);

const validCommandsString = validCommands.map(command => `${command} ${commandTranslation[command]}`).join(', ');

const isValidCommand = command => validCommands.includes(command);

const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getModuleShortcutMatch = moduleShortcut => {
  for(const key of Object.keys(availableModules)) {
    const patternElements = key.split(/{[a-zA-Z_-]+}/);
    const pattern = new RegExp(`^${  patternElements.map(x => x.trim()).map(escapeRegExp).join('.*')  }$`);
    if(moduleShortcut.match(pattern)) {
      return key;
    }
  }
  return null;
};

const getModule = moduleShortcut => {
  const key = getModuleShortcutMatch(moduleShortcut);
  if(!key) return null;
  return availableModules[key];
};

const getProps = moduleShortcut => {
  const key = getModuleShortcutMatch(moduleShortcut);
  const propNames = key.match(/{[a-zA-Z_-]+}/g).map(x => x.substring(1, x.length - 1));
  const delimiters = key.split(/{[a-zA-Z_-]+}/).filter(x=>x);
  const propValues = moduleShortcut.split(new RegExp(delimiters.map(escapeRegExp).join('|'))).filter(x=>x);

  const props = Object();
  for(let i = 0; i < propNames.length; i+=1) {
    props[propNames[i]] = propValues[i];
  }

  return props;
};

export { getModule, getProps, isValidCommand, validCommandsString };
