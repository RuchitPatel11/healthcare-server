const router = require("express").Router();
const prescriptionController = require("../controllers/prescription.controller");

//Add Prescription
router.post("/", prescriptionController.addPrescription);

// Get All Prescriptions
router.get("/", prescriptionController.getPrescription);

//Get Prescription By ID
router.get("/:id", prescriptionController.getPrescriptionById);

// Update Prescription By ID
router.put("/:id", prescriptionController.updatePrescriptionById);

// Delete Prescription By ID
router.delete("/:id", prescriptionController.deletePrescriptionById);

module.exports = router;