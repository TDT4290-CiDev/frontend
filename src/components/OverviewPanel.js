import React from 'react';
import PropTypes from 'prop-types';

const OverviewPanel = ({ document, sectionData, open, onClick, activeField, onMouseEnter, onMouseLeave }) => (
  <div className={`overview-panel ${open ? 'open' : ''}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    {open ? (
      <button type="button" onClick={() => onClick(document.id)} disabled={activeField === document.id}>
        {document.title !== '' ? document.title : 'Skriv inn dokumenttittel'}
      </button>
    ) : (
      <p>--------------------</p>
    )}
    {sectionData.map((section, index) => (
      <div
        key={section.id}
        className={`overview-panel__section ${activeField === `${section.id}-title` ? 'active' : ''}`}
      >
        {!section.isHidden && (
          <React.Fragment>
            {open ? (
              <button
                type="button"
                onClick={() => onClick(`${section.id}-title`)}
                disabled={activeField === `${section.id}-title`}
              >
                {section.title === '' ? `Seksjonstittel ${index + 1}` : section.title}
              </button>
            ) : (
              <p>----------------</p>
            )}
          </React.Fragment>
        )}
        {section.questions.map(({ id, title }) => (
          <React.Fragment key={id}>
            {title !== '' && (
              <div className={`overview-panel__question ${activeField === id ? 'active' : ''}`}>
                {open ? (
                  <button type="button" onClick={() => onClick(id)} disabled={activeField === id}>
                    {title}
                  </button>
                ) : (
                  <p>------------</p>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    ))}
  </div>
);

OverviewPanel.propTypes = {
  document: PropTypes.shape({ id: PropTypes.string, title: PropTypes.string }).isRequired,
  sectionData: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  activeField: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default OverviewPanel;
