const Model = require("./deliveryOutlet.model");

// Get location by latitude and longitude
/**
  coordinates is an array of lat-long values
**/
exports.findByCoordinates = coordinates => {
  return Model.find({
    location: {
      $geoIntersects: {
        $geometry: {
          type: "Point",
          coordinates: coordinates,
        },
      },
    },
  });
};
