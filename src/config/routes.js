const deliveryOutletAPI = require('../api/deliveryOutlet/deliveryOutlet.controller');

const API_V1 = '/api/v1';

module.exports = app => {
  app.use((req, res, next) => {
    console.log(req.url);
    next();
  })
  app.use(API_V1 + '/location', deliveryOutletAPI);
};
