// When you have created a new from module, there are three things you have to do:

// 1. Import your module container
import TestComponent from '../components/TestComponent'; // Remove this later
import BulletPointListContainer from '../containers/BulletPointListContainer';

// 2. Create a shortcut to the container
const availableModules = {
  '[] {options[]} - {options[]}': TestComponent,
  _: TestComponent,
  __: TestComponent,
  '* {items[]}': BulletPointListContainer,
};

// 3. Add a description to the container
const commandTranslation = {
  '[] {option[]}': 'flervalgsspørsmål',
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
    const patternElements = key.split(/{[a-zA-Z_\[\]\-]+}/);
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
  const propNames = key.match(/{[a-zA-Z_\[\]\-]+}/g).map(x => x.substring(1, x.length - 1));
  const delimiters = key.split(/{[a-zA-Z_\[\]\-]+}/).map(x => x.trim()).filter(x=>x);
  const propValues = moduleShortcut.split(new RegExp(delimiters.map(escapeRegExp)
                                    .join('|'))).map(x => x.trim()).filter(x=>x);

  const props = Object();
  for(let i = 0; i < propValues.length; i+=1) {
    if(propNames[i].endsWith("[]")) {
      const propName = propNames[i].substring(0, propNames[i].length - 2);
      if(props[propName]) {
        props[propName].push(propValues[i]);
      } else {
        props[propName] = [propValues[i]];
      }
    } else {
      props[propNames[i]] = propValues[i];
    }
  }

  return props;
};

export { getModule, getProps, isValidCommand, validCommandsString };
