const Express = require('express');
const CountriesCtrl = require('./controllers/countries');
const SitesCtrl = require('./controllers/sites');
const SpeciesCtrl = require('./controllers/species');

const router = Express.Router(); // eslint-disable-line new-cap

router.route('/countries').get(CountriesCtrl.getCountries);
router.route('/sites').get(SitesCtrl.getSites);
router.route('/species').get(SpeciesCtrl.getSpecies);

module.exports = router;
