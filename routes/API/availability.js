const router = require("express").Router();
const listControl = require("../../controllers/listControl");

router
  .route("/")
  .get(listControl.findAllAvailable)
  .post(listControl.createAvailability);

router.route("/")
.put(listControl.updateAvailabilityUser);

router
  .route("/:id")
  .get(listControl.getAvailabilityByListingId)
  .delete(listControl.deleteAvailability);

module.exports = router;