const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeesContoller");
const ROLES = require("../config/roles");
const verifyRoles = require("../middleware/verifyRoles");
router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(
    verifyRoles(ROLES.Admin, ROLES.Editor),
    employeeController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES.Admin, ROLES.Editor),
    employeeController.updateEmployee
  )
  .delete(verifyRoles(ROLES.Admin), employeeController.deleteEmployee);

router.get("/:id", employeeController.getEmployee);

module.exports = router;
