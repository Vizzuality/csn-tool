const Express = require('express');
const Countries = require('./controllers/countries');

const router = Express.Router();

router.route('/countries').get(Countries.getCountries);

module.exports = router;
