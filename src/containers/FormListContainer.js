import React from 'react';
import { Link } from 'react-router-dom';
import { get } from '../utils/api';
import FormList from '../components/FormList';

class FormListContainer extends React.Component {
  state = {
    forms: [],
    loadingData: true,
    apiError: false,
  };

  async componentDidMount() {
    try {
      const { data } = await get('forms/');
      this.setState({ forms: data.data, loadingData: false });
    } catch (e) {
      console.error('Error: ', e);
      this.setState({ apiError: true });
    }
  }

  render() {
    const { forms, loadingData, apiError } = this.state;

    // TODO: Add error page
    if (apiError) return <h1>Det har skjedd en feil her..</h1>;

    // TODO: Add loader when loadingData===true
    if (loadingData) return false;

    return (
      <div className="existing-forms-container">
        {forms.length !== 0 ? (
          <FormList forms={forms} />
        ) : (
          <h2>
            Det er ikke laget noen forms enda. Du kan lage et nytt <Link to="/new-form">her</Link>
          </h2>
        )}
      </div>
    );
  }
}

export default FormListContainer;
