import React from 'react';
import PropTypes from 'prop-types';

function Feedback(props, context) {
  return (
    <a
      className="typeform-share"
      href="https://simaobelchior.typeform.com/to/qOLcRu"
      data-mode="popup"
      target="_blank"
    >
      {context.t('feedback')}
    </a>
  );
}

Feedback.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Feedback;
