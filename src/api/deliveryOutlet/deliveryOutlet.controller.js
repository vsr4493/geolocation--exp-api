const router = require("express").Router();
const R = require("ramda");
const { asyncWrapper } = require("../../utils");
const locationService = require("../../services/locations");
const deliveryOutletDAO = require("./deliveryOutlet.dao");

const getDeliveryOutlet = asyncWrapper(async (req, res) => {
  const { location } = req.query;
  if (!location || location.length === 0)
    throw new Error("Do provide a location to search for!");
  const matchedCoordinates = await locationService.getCoordinates(location);
  const result = await deliveryOutletDAO.findByCoordinates(
    R.flatten(
      matchedCoordinates.map(({ lng, lat }) => [lng, lat])
    ),
  );
  return res.status(200).json({ data: result });
});

// Route config
router.get("/", getDeliveryOutlet);

module.exports = router;
