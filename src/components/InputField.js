import React from 'react';
import PropTypes from 'prop-types';

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { autoFocus } = this.props;
    if (prevProps.autoFocus !== autoFocus && autoFocus) {
      this.inputRef.current.focus();
    }
  }

  render() {
    return <input ref={this.inputRef} {...this.props} />;
  }
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  onKeyPress: PropTypes.func,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
};

InputField.defaultProps = {
  className: '',
  onChange: null,
  onFocus: null,
  value: '',
  onKeyPress: null,
  autoFocus: false,
  placeholder: '',
};

export default InputField;
