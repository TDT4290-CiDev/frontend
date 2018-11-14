import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentContainer from './DocumentContainer';
import { fetchExistingForm, clearState } from '../actions/documentActions';

class FormPreviewContainer extends React.Component {
  state = {
    isLoadingForm: true,
  };

  async componentDidMount() {
    const { match, getForm } = this.props;
    await getForm(match.params.id);
    this.setState({ isLoadingForm: false });
  }

  componentWillUnmount() {
    const { clearState } = this.props;
    clearState();
  }

  render() {
    const { isLoadingForm } = this.state;

    // TODO: Use loader here
    if (isLoadingForm) return null;

    return (
      <div className="form-designer-container">
        <DocumentContainer designing={false} />
      </div>
    );
  }
}

FormPreviewContainer.propTypes = {
  getForm: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getForm: id => dispatch(fetchExistingForm(id)),
  clearState: () => dispatch(clearState()),
});

export default connect(
  null,
  mapDispatchToProps
)(FormPreviewContainer);
