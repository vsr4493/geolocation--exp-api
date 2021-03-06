const router = require("express").Router();
const R = require("ramda");
const { asyncWrapper } = require("../../utils");
const locationService = require("../../services/locations");
const deliveryOutletDAO = require("./deliveryOutlet.dao");

const getDeliveryOutlet = asyncWrapper(async (req, res) => {
  const { address } = req.query;
  console.log(address);
  if (!address || address.length === 0)
    throw new Error("Do provide an address to search for!");
  const matchedCoordinates = await locationService.getCoordinates(address);
  const outlets = await deliveryOutletDAO.findByCoordinates(
    R.flatten(
      matchedCoordinates.map(({ lng, lat }) => [lng, lat])
    ),
  );
  const formattedOutlets = outlets.map(outlet => {
    return {
      identifier: outlet.name,
      coordinates: R.path(['location', 'coordinates'], outlet),
      type: R.path(['location', 'type'], outlet),
      city: outlet.parent_feature_name,
    };
  });
  return res.status(200).json({ data: {
    outlets: formattedOutlets,
  } });
});

// Route config
router.get("/", getDeliveryOutlet);

module.exports = router;
