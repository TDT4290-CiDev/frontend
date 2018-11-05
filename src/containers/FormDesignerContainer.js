import React from 'react';
import DocumentContainer from './DocumentContainer';
import OverviewPanelContainer from './OverviewPanelContainer';

const FormDesignerContainer = () => (
  <div className="form-designer-container">
    <OverviewPanelContainer />
    <DocumentContainer editable />
  </div>
);

export default FormDesignerContainer;
