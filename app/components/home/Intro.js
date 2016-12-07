import React from 'react';

function Intro(props, context) {
  return (
    <div className="l-upper row">
      <div className="column small-12">
        <h2 className="header inv -intro -center">{context.t('toolUse')}</h2>
      </div>
      <ul className="column small-12 c-use-cases">
        <li className="column small-12 medium-4 use">
          <svg>
            <use xlinkHref="#illustration-1"></use>
          </svg>
          <h3 className="header -intro">{context.t('searchForCountry')}<br />{context.t('seeOccurringSpecies')}</h3>
        </li>
        <li className="column small-12 medium-4 use">
          <svg>
            <use xlinkHref="#illustration-2"></use>
          </svg>
          <h3 className="header -intro">{context.t('seeTheData')}<br />{context.t('forParticularSite')}</h3>
        </li>
        <li className="column small-12 medium-4 use">
          <svg>
            <use xlinkHref="#illustration-3"></use>
          </svg>
          <h3 className="header -intro">{context.t('searchForSpecies')}<br />{context.t('seeCriticalSites')}</h3>
        </li>
      </ul>
      <div className="column small-12 medium-6 medium-offset-3">
        <p className="text -intro">{context.t('introText1')}</p>
        <p className="text -intro">{context.t('introText2')}</p>
      </div>
    </div>
  );
}

Intro.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

export default Intro;
