const Express = require('express');
const CountriesCtrl = require('./controllers/countries');
const SitesCtrl = require('./controllers/sites');
const SpeciesCtrl = require('./controllers/species');
const ThresholdCtrl = require('./controllers/threshold');
const SearchCtrl = require('./controllers/search');

const router = Express.Router(); // eslint-disable-line new-cap

// Countries
router.route('/countries').get(CountriesCtrl.getCountries);
router.route('/countries/:iso').get(CountriesCtrl.getCountryDetails);
router.route('/countries/:iso/sites').get(CountriesCtrl.getCountrySites);
router.route('/countries/:iso/criticalSites').get(CountriesCtrl.getCountryCriticalSites);
router.route('/countries/:iso/species').get(CountriesCtrl.getCountrySpecies);
router.route('/countries/:iso/populations').get(CountriesCtrl.getCountryPopulations);
router.route('/countries/:iso/look-alike-species').get(CountriesCtrl.getCountryPopsWithLookAlikeCounts);
router.route('/countries/:iso/look-alike-species/:populationId').get(CountriesCtrl.getCountryLookAlikeSpecies);

// Sites
router.route('/sites').get(SitesCtrl.getSites);
router.route('/sites/locations/:type').get(SitesCtrl.getSitesLocations);
router.route('/sites/:type/:id').get(SitesCtrl.getSitesDetails);
router.route('/sites/:type/:id/species').get(SitesCtrl.getSitesSpecies);

// Species
router.route('/species').get(SpeciesCtrl.getSpeciesList);
router.route('/species/:id').get(SpeciesCtrl.getSpeciesDetails);
router.route('/species/:id/sites').get(SpeciesCtrl.getSpeciesSites);
router.route('/species/:id/criticalSites').get(SpeciesCtrl.getSpeciesCriticalSites);
router.route('/species/:id/population').get(SpeciesCtrl.getSpeciesPopulation);
router.route('/species/:id/look-alike-species').get(SpeciesCtrl.getSpeciesLookAlikeSpecies);
router.route('/species/:id/look-alike-species/:populationId').get(SpeciesCtrl.getPopulationsLookAlikeSpecies);
router.route('/species/:id/suitability').get(SpeciesCtrl.getSpeciesSuitability);

// Threshold
router.route('/threshold/:lat/:lng/:zoom?').get(ThresholdCtrl.getSpeciesByPosition);

// Advanced search
router.route('/search/options').get(SearchCtrl.getOptions);
router.route('/search/ibas').get(SearchCtrl.getIBAsResults);
router.route('/search/criticalSites').get(SearchCtrl.getCriticalSitesResults);
router.route('/search/species').get(SearchCtrl.getSpeciesResults);
router.route('/search/populations').get(SearchCtrl.getPopulationsResults);


module.exports = router;
