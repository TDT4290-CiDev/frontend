import { JSDOM } from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configuring enzyme
configure({ adapter: new Adapter() });

// Creating a JavaScript DOM
const dom = new JSDOM('<body></body>');

// Setting global window and document variables
global.window = dom.window;
global.document = dom.window.document;
