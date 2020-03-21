const { maps: mapConfig } = require("../config/config");
const { fetch } = require("../utils");
const R = require("ramda");
const qs = require("qs");

const addressServiceUrl = `${mapConfig.baseUrl}/${mapConfig.address}`;

const parseMapResponse = R.compose(
  R.map(R.prop("latLng")),
  R.flatten,
  R.map(R.prop("locations")),
  R.prop("results")
);
exports.getCoordinates = async address => {
  const mappedLocation = await fetch(
    `${addressServiceUrl}?${qs.stringify({
      location: address,
      key: mapConfig.key
    })}`
  );
  return parseMapResponse(mappedLocation);
};
