const router = require("express").Router();
const patientController = require("../controllers/patient.controller");

//Add Patient
router.post("/", patientController.addPatient);

// Get All Patients
router.get("/", patientController.getPatient);

//Get Patient By ID
router.get("/:id", patientController.getPatientById);

// Update Patient By ID
router.put("/:id", patientController.updatePatientById);

// Delete Patient By ID
router.delete("/:id", patientController.deletePatientById);

module.exports = router;
