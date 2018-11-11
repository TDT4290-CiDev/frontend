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

  saveForm = () => {
    const { form } = this.props;
    const { id, existingForm } = form.document;
    delete form.document.id;
    delete form.document.activeField;
    delete form.document.existingForm;

    if (existingForm) {
      console.log('put');
      put(`/forms/${id}`, form)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    } else {
      console.log('post');
      post('/forms', form)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  };

  render() {
    const { isLoadingForm } = this.state;

    // TODO: Use loader here
    if (isLoadingForm) return null;

    return (
      <div className="form-designer-container">
        <OverviewPanelContainer />
        <DocumentContainer editable={false} />
        <button type="button" className="form-designer-container__save-button" onClick={this.saveForm}>
          Lagre
        </button>
      </div>
    );
  }
}

FormDesignerContainer.propTypes = {
  match: PropTypes.shape(PropTypes.object).isRequired,
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
