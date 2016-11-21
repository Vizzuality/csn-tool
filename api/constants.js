const CARTODB_ACCOUNT = process.env.CARTODB_ACCOUNT;

module.exports = {
  CARTODB_ACCOUNT,
  CARTO_SQL: `https://${CARTODB_ACCOUNT}.carto.com/api/v2/sql?q=`
};
