import React from 'react';

function StayUpdate(props, context) {
  return (
    <div className="c-stay-update">
      <div className="row">
        <div className="column small-12 align-self-middle">
          <h3 className="inv">{context.t('stay-update')}</h3>
        </div>
      </div>
      <div className="row">
        <div className="column small-12 medium-10">
          <div className="input-wrapper">
            <input type="text" placeholder="Subscribe to newsletter"></input>
            <span className="arrow"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

StayUpdate.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

StayUpdate.propTypes = {
  // Define the language selected
  lang: React.PropTypes.string.isRequired
};

export default StayUpdate;
