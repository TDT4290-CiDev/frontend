import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentContainer from './DocumentContainer';
import OverviewPanelContainer from './OverviewPanelContainer';
import { fetchExistingForm, clearState } from '../actions/documentActions';
import { post, put } from '../utils/api';

class FormDesignerContainer extends React.Component {
  state = {
    isLoadingForm: true,
    isSaving: false,
  };

  async componentDidMount() {
    const { match, getForm } = this.props;
    if (Object.keys(match.params).length !== 0) {
      await getForm(match.params.id);
    }
    this.setState({ isLoadingForm: false });
  }

  componentWillUnmount() {
    const { clearState } = this.props;
    clearState();
  }

  saveForm = async () => {
    const { form, history } = this.props;
    const { id, existingForm } = form.document;

    this.setState({ isSaving: true });

    // Create a deep copy of our form
    const objectToSave = JSON.parse(JSON.stringify(form));
    // Delete fields that is unnecessary to save
    delete objectToSave.document.id;
    delete objectToSave.document.activeField;
    delete objectToSave.document.existingForm;

    if (existingForm) {
      await put(`/forms/${id}`, objectToSave)
        .then(res => console.log(res))
        .catch(err => console.log(err));
      this.setState({ isSaving: false });
    } else {
      await post('/forms/', objectToSave)
        .then(res => {
          history.push(`/edit-form/${res.data}`);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { isLoadingForm, isSaving } = this.state;

    // TODO: Use loader here
    if (isLoadingForm) return null;

    return (
      <div className="form-designer-container">
        <OverviewPanelContainer />
        <DocumentContainer designing />
        <button
          type="button"
          className="form-designer-container__save-button"
          onClick={this.saveForm}
          disabled={isSaving}
        >
          Lagre
        </button>
      </div>
    );
  }
}

FormDesignerContainer.propTypes = {
  getForm: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  form: PropTypes.shape({
    document: PropTypes.object,
    sections: PropTypes.array,
    questions: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = state => ({
  form: state,
});

const mapDispatchToProps = dispatch => ({
  getForm: id => dispatch(fetchExistingForm(id)),
  clearState: () => dispatch(clearState()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormDesignerContainer);
