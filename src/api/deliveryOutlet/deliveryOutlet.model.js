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

/*const DeliveryLocationSchema = new mongoose.Schema({
  point: mongoose.Schema.Types.Point,
  multipoint: mongoose.Schema.Types.MultiPoint,
  linestring: mongoose.Schema.Types.LineString,
  multilinestring: mongoose.Schema.Types.MultiLineString,
  polygon: mongoose.Schema.Types.Polygon,
  multipolygon: mongoose.Schema.Types.MultiPolygon,
  geometry: mongoose.Schema.Types.Geometry,
  geometrycollection: mongoose.Schema.Types.GeometryCollection,
  feature: mongoose.Schema.Types.Feature,
  featurecollection: mongoose.Schema.Types.FeatureCollection
});*/


// Apparently this improves performance of queries
DeliveryLocationFeatureSchema.index( { "location": "2dsphere"} );

module.exports = mongoose.model("DeliveryLocationFeature", DeliveryLocationFeatureSchema);