import React from 'react';
import { hot } from 'react-hot-loader';
import './styles/base.scss';
import FormDesignerContainer from './containers/FormDesignerContainer';

const App = () => <FormDesignerContainer />;

export default hot(module)(App);
