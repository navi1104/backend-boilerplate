const express = require("express");
const router = express.Router();
const vaccinationCentreController = require("../controllers/vaccinationCentreController");
const ROLES = require("../config/roles");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/")
  .get(vaccinationCentreController.getAllVaccinationCentres)
  .post(
    verifyRoles(ROLES.Admin),
    vaccinationCentreController.createNewVaccinationCentre
  )
  .put(
    verifyRoles(ROLES.Admin),
    vaccinationCentreController.updateVaccinationCentre
  )
  .delete(
    verifyRoles(ROLES.Admin),
    vaccinationCentreController.deleteVaccinationCentre
  );

router.get("/:id", vaccinationCentreController.getVaccinationCentre);

// New route for booking a slot
router.post(
  "/book/:id",
  verifyRoles(ROLES.User),
  vaccinationCentreController.bookSlot
);

module.exports = router;
