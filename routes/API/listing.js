const router = require("express").Router();
const listControl = require("../../controllers/listControl");

router
  .route("/")
  .get(listControl.findAll)
  .post(listControl.createListing);

router.route("/near").get(listControl.findAllNear);

router
  .route("/dash")
  .get(listControl.findAllProfListing)
  .put(listControl.editListing);

router.route("/dash/:id").delete(listControl.deleteListing);

router.route("/reserved/").get(listControl.findReserved);

router.route("/reserved/:id").get(listControl.findReservedById);

module.exports = router;