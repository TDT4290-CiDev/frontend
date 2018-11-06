import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import './styles/base.scss';
import FormDesignerContainer from './containers/FormDesignerContainer';
import FormLandingPage from './containers/FormLandingPage';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={FormLandingPage} />
      <Route path="/form-designer" component={FormDesignerContainer} />
    </div>
  </Router>
);

export default hot(module)(App);
