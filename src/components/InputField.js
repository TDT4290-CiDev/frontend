import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFocus } from '../actions/documentActions';

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { id, activeField } = this.props;
    if (prevProps.activeField !== activeField && activeField === id) {
      this.inputRef.current.focus();
    }
  }

  handleOnFocus = () => {
    const { id, activeField, setActiveField } = this.props;
    if (activeField !== id) {
      setActiveField(id);
    }
  };

  render() {
    const {
      id,
      activeField,
      onFocus,
      dispatch,
      disableAutoFocus,
      disableOnFocus,
      setActiveField,
      ...inputProps
    } = this.props;
    /* eslint-disable jsx-a11y/no-autofocus */
    return (
      <input
        id={id}
        ref={this.inputRef}
        onFocus={!disableOnFocus && this.handleOnFocus}
        autoFocus={!disableAutoFocus && activeField === id}
        {...inputProps}
      />
    );
  }
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onKeyPress: PropTypes.func,
  activeField: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disableAutoFocus: PropTypes.bool,
  disableOnFocus: PropTypes.bool,
};

InputField.defaultProps = {
  className: '',
  onChange: null,
  value: null,
  onKeyPress: null,
  placeholder: null,
  disableAutoFocus: false,
  disableOnFocus: false,
};

const mapStateToProps = state => ({
  activeField: state.document.activeField,
});

const mapDispatchToProps = dispatch => ({
  setActiveField: id => dispatch(setFocus(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputField);
