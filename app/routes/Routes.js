import React from 'react';
import { connect } from 'react-redux';
import { useScroll } from 'react-router-scroll';
import { IndexRoute, Router, Route, applyRouterMiddleware, Redirect } from 'react-router';
import { updateLanguage, setCountriesPage, updateCountriesPage, setSitesPage,
        updateSitesPage, updateSitesDetailPage, updateSpeciesDetailPage } from './RoutesActions';
import ReactGA from 'react-ga';

import ContainerPage from 'components/pages/ContainerPage';
import HomePage from 'components/pages/HomePage';
import CountriesPage from 'containers/pages/CountriesPage';
import SitesPage from 'containers/pages/SitesPage';
import SitesDetailPage from 'containers/pages/SitesDetailPage';
import SpeciesPage from 'containers/pages/SpeciesPage';
import SpeciesDetailPage from 'containers/pages/SpeciesDetailPage';

function shouldUpdateScroll(prevRouterProps, { location }) {
  /**
   * Return whether the two pages match the regex and have the same matching
   * regex parameters
   * @param  {regex}  regex
   * @return {Boolean}
   */
  function isSamePage(regex) {
    const pathname = (prevRouterProps && prevRouterProps.location.pathname) || '';
    const nextPathname = location.pathname;

    /* We first check if the pages are concerned by the regex. If not, the route
     * isn't matching */
    const isPathnameConcerned = regex.test(pathname);
    const isNextPathnameConcerned = regex.test(nextPathname);

    if (!isPathnameConcerned || !isNextPathnameConcerned) {
      return false;
    }

    /* We then get the matching regex params and return false if there isn't
     * any */
    const routeParams = pathname.match(regex);
    const nextRouteParams = nextPathname.match(regex);

    if (!routeParams || !nextRouteParams) {
      return false;
    }

    /* We remove the first element of the arrays as it is the whole matched
     * string (i.e. the route) */
    if (routeParams.length) {
      routeParams.splice(0, 1);
    }
    if (nextRouteParams.length) {
      nextRouteParams.splice(0, 1);
    }

    const paramsCount = Math.min(routeParams.length, nextRouteParams.length);

    let doesParamsMatch = true;
    for (let i = 0, j = paramsCount; i < j; i++) {
      if (routeParams[i] !== nextRouteParams[i]) {
        doesParamsMatch = false;
        break;
      }
    }

    return doesParamsMatch;
  }

  /* Here we define all the routes for which we don't want to scroll to top if
   * both the old path and the new one match (i.e. if the global regex and the
   * regex params match the two paths) */
  const regexes = [
    /\/(countries|species|sites)\/((?:[A-z]|[1-9]|-)+)(?:\/(?:.*))?/
  ];

  for (let i = 0, j = regexes.length; i < j; i++) {
    if (isSamePage(regexes[i])) {
      return false;
    }
  }

  return true;
}

function trackPageView() {
  let currentUrl = window.location.pathname;

  if (window.location.search) {
    currentUrl += window.location.search;
  }

  ReactGA.set({ page: currentUrl });
  ReactGA.pageview(currentUrl);
}

const Routes = ({ history }) => (
  <Router
    history={history}
    render={applyRouterMiddleware(useScroll(shouldUpdateScroll))}
    onUpdate={trackPageView}
  >
    <Route path=":lang" component={ContainerPage} onEnter={updateLanguage} >
      <IndexRoute component={HomePage} />
      <Route path="countries">
        <IndexRoute component={CountriesPage} onEnter={setCountriesPage} onChange={updateCountriesPage} />
        <Route path=":iso(/:cat)" component={CountriesPage} onEnter={setCountriesPage} />
      </Route>
      <Route path="sites">
        <IndexRoute component={SitesPage} onEnter={setSitesPage} onChange={updateSitesPage} />
        <Route path=":site(/:cat)" component={SitesDetailPage} onEnter={updateSitesDetailPage} />
      </Route>
      <Route path="species">
        <IndexRoute component={SpeciesPage} />
        <Route path=":id(/:cat)" component={SpeciesDetailPage} onEnter={updateSpeciesDetailPage} />
      </Route>
    </Route>
    <Redirect from="*" to="en" />
  </Router>
);

Routes.propTypes = {
  history: React.PropTypes.object
};

export default connect()(Routes);
