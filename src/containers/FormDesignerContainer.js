import React from 'react';
import DocumentContainer from './DocumentContainer';
import OverviewPanelContainer from './OverviewPanelContainer';

const FormDesignerContainer = () => (
  <div className="form-designer-container">
    <OverviewPanelContainer />
    <DocumentContainer designing />
  </div>
);

export default FormDesignerContainer;
