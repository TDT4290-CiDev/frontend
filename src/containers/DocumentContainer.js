import React from 'react';
import BulletPointListContainer from './BulletPointListContainer';

const DocumentContainer = () => (
  <div className="document-container">
    <input className="document-title" placeholder="Skriv inn dokumenttittel..." />
    <BulletPointListContainer />
  </div>
);

export default DocumentContainer;
