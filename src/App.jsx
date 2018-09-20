import React from 'react';
import './styles/base.scss';
import Logo from './assets/react.svg';

const App = () => (
  <div className="App">
    <div className="App-heading App-flex">
      <h2>
        Welcome to
        <span className="App-react">React</span>
      </h2>
    </div>
    <div className="App-instructions App-flex">
      <img className="App-logo" src={Logo} alt="logo" />
      <p>
        Edit
        <code>src/App.js</code>
        and save to hot reload your changes.
      </p>
    </div>
  </div>
);

export default App;
