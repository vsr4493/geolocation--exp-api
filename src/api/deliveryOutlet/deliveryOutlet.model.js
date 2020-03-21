const GeoJSON = require('mongoose-geojson-schema');
const mongoose = require('mongoose');

const DeliveryLocationFeatureSchema = new mongoose.Schema({ 
  // TODO: Normalize later
  parent_feature_type: String,
  parent_feature_name: String,
  parent_feature_crs: Object,
  feature_type: String,
  name: String,
  location: {
    type: { type: String, enum: ['Polygon', 'Point']},
    coordinates: [],
  },
});

// Apparently this improves performance of geolocation-queries
DeliveryLocationFeatureSchema.index( { "location": "2dsphere"} );

module.exports = mongoose.model("DeliveryLocationFeature", DeliveryLocationFeatureSchema);