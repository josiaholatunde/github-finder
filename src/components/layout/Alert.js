
import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({alert}) => {
  return (
    alert && (
      <div className={`alert alert-${alert.cssType}`}>
      <i className="fa fa-info-circle"></i>
        {alert.msg}
      </div>
    )
  )
}


export default Alert;
