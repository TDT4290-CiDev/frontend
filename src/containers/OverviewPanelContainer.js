import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFocus } from '../actions/documentActions';
import OverviewPanel from '../components/OverviewPanel';

export class OverviewPanelContainer extends React.Component {
  state = {
    open: false,
  };

  handleClick = id => {
    const { setFocusTo } = this.props;
    setFocusTo(id);
  };

  handleMouseEnter = () => {
    this.setState({ open: true });
  };

  handleMouseLeave = () => {
    this.setState({ open: false });
  };

  render() {
    const { document, sections, questions, activeField } = this.props;
    const { open } = this.state;
    const overviewData = sections.map(section => ({
      id: section.id,
      title: section.title.text,
      isHidden: section.title.isHidden,
      questions: questions.map(question => {
        if (section.questions.includes(question.id)) {
          // Necessary to keep question as active in the overview panel when activeField is one of its children
          if ('listItems' in question) {
            return { ids: [question.id, ...question.listItems.map(({ id }) => id)], title: question.title };
          }
          return { ids: [question.id], title: question.title };
        }
        return null;
      }),
    }));
    return (
      <OverviewPanel
        document={document}
        sectionData={overviewData}
        open={open}
        onClick={this.handleClick}
        activeField={activeField}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
}

OverviewPanelContainer.propTypes = {
  document: PropTypes.shape({ id: PropTypes.string, title: PropTypes.string }).isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFocusTo: PropTypes.func.isRequired,
  activeField: PropTypes.string.isRequired,
};

export const mapStateToProps = state => ({
  document: { id: state.document.id, title: state.document.title },
  sections: state.sections,
  questions: state.questions,
  activeField: state.document.activeField,
});

export const mapDispatchToProps = dispatch => ({
  setFocusTo: id => dispatch(setFocus(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewPanelContainer);
