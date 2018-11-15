import React from 'react';
import { Link } from 'react-router-dom';

class FormLandingPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="form-landing-page">
        <h1>Cidev</h1>
        <h2>Skjemadesigner</h2>
        <Link className="form-landing-page__link" to="/new-form">
          Nytt skjema
        </Link>
        <Link className="form-landing-page__link" to="/existing-forms">
          Eksisterende skjema
        </Link>
      </div>
    );
  }
}

export default FormLandingPage;
