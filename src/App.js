import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import './styles/base.scss';
import FormDesignerContainer from './containers/FormDesignerContainer';
import FormPreviewContainer from './containers/FormPreviewContainer';
import FormLandingPage from './containers/FormLandingPage';
import FormListContainer from './containers/FormListContainer';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={FormLandingPage} />
      <Route path="/new-form" component={FormDesignerContainer} />
      <Route path="/edit-form/:id" component={FormDesignerContainer} />
      <Route path="/preview-form/:id" component={FormPreviewContainer} />
      <Route path="/existing-forms" component={FormListContainer} />
    </div>
  </Router>
);

export default hot(module)(App);
