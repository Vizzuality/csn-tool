const Express = require('express');
const CountriesCtrl = require('./controllers/countries');
const SitesCtrl = require('./controllers/sites');
const SpeciesCtrl = require('./controllers/species');
const ThresholdCtrl = require('./controllers/threshold');

const router = Express.Router(); // eslint-disable-line new-cap

// Countries
router.route('/countries').get(CountriesCtrl.getCountries);
router.route('/countries/:iso').get(CountriesCtrl.getCountryDetails);
router.route('/countries/:iso/sites').get(CountriesCtrl.getCountrySites);
router.route('/countries/:iso/sitesOld').get(CountriesCtrl.getCountrySitesOld);
router.route('/countries/:iso/species').get(CountriesCtrl.getCountrySpecies);
router.route('/countries/:iso/populations').get(CountriesCtrl.getCountryPopulations);
router.route('/countries/:iso/look-alike-species').get(CountriesCtrl.getCountryPopsWithLookAlikeCounts);
router.route('/countries/:iso/look-alike-species/:populationId').get(CountriesCtrl.getCountryLookAlikeSpecies);

// Sites
router.route('/sites').get(SitesCtrl.getSites);
router.route('/sites/locations/:type').get(SitesCtrl.getSitesLocations);
router.route('/sites/:id').get(SitesCtrl.getSitesSpecies);
router.route('/sites/:id/details').get(SitesCtrl.getSitesDetails);

// Species
router.route('/species').get(SpeciesCtrl.getSpeciesList);
router.route('/species/:id').get(SpeciesCtrl.getSpeciesDetails);
router.route('/species/:id/sites').get(SpeciesCtrl.getSpeciesSites);
router.route('/species/:id/population').get(SpeciesCtrl.getSpeciesPopulation);
router.route('/species/:id/threats').get(SpeciesCtrl.getSpeciesThreats);
router.route('/species/:id/habitats').get(SpeciesCtrl.getSpeciesHabitats);
router.route('/species/:id/look-alike-species').get(SpeciesCtrl.getSpeciesLookAlikeSpecies);

// Threshold
router.route('/threshold/:lat/:lng/:zoom?').get(ThresholdCtrl.getSpeciesByPosition);

module.exports = router;
