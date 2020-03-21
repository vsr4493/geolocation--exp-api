const geoData = require('./geoData.json');
const R = require('ramda');
const deliveryOutletModel = require('../src/api/deliveryOutlet/deliveryOutlet.model');
const config = require('../src/config/config');
const mongoose = require('mongoose');

const connectDatabase = () => (
  new Promise((resolve, reject) => {
    // TODO: add production checks
    mongoose.connect(config.db, { useNewUrlParser: true });
    mongoose.set('debug', true);
    mongoose.connection.on('connected', resolve);
    mongoose.connection.on('error', reject);
  })
);

(async () => {
  await connectDatabase();
  const commonData = R.pick(['type', 'name', 'crs'], geoData);
  const features = R.path(['features'], geoData);
  const featureInserts = features.map((feature) => {
    return {
      parent_feature_type: commonData.type,
      parent_feature_name: commonData.name,
      parent_feature_crs: commonData.crs,
      feature_type: commonData.type,
      name: R.path(['properties', 'Name'], feature),
      // Expand the polygon data
      location: R.path(['geometry'], feature),
    };
  });
  await deliveryOutletModel.insertMany(featureInserts);
  console.log("DONE");
  process.exit(0);
})();