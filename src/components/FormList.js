/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FormList = ({ forms }) => (
  <div className="form-list">
    {forms.map(form => (
      <div key={form._id}>
        <h2>{form.document.title}</h2>
        <Link to={`/preview-form/${form._id}`} className="form-list__button">
          Forhåndsvis
        </Link>
        <Link to={`/edit-form/${form._id}`} className="form-list__button">
          Rediger
        </Link>
      </div>
    ))}
  </div>
);

FormList.propTypes = {
  forms: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FormList;
