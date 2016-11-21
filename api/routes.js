const Express = require('express');
const CountriesCtrl = require('./controllers/countries');
const SitesCtrl = require('./controllers/sites');
const SpeciesCtrl = require('./controllers/species');

const router = Express.Router(); // eslint-disable-line new-cap

router.route('/countries').get(CountriesCtrl.getCountries);
router.route('/countries/:iso').get(CountriesCtrl.getCountry);
router.route('/countries/:iso/sites').get(CountriesCtrl.getCountrySites);
router.route('/countries/:iso/species').get(CountriesCtrl.getCountrySpecies);
router.route('/countries/:iso/populations').get(CountriesCtrl.getCountryPopulations);
router.route('/sites').get(SitesCtrl.getSites);
router.route('/sites/:slug').get(SitesCtrl.getSitesDetail);
router.route('/species').get(SpeciesCtrl.getSpeciesList);
router.route('/species/:slug').get(SpeciesCtrl.getSpecies);

module.exports = router;
