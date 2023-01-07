const router = require("express").Router();
const prescriptionController = require("../controllers/prescription.controller");
const authentication = require("../middlewares/authentication");
const authorizeRole = require("../middlewares/authorization");

router.use(authentication);
//Add Prescription
router.post("/", prescriptionController.addPrescription);

// Get All Prescriptions
router.get("/", prescriptionController.getPrescriptions);

//Get Prescription By ID
router.get("/:id", prescriptionController.getPrescriptionById);

// Update Prescription By ID
router.put("/:id", prescriptionController.updatePrescriptionById);

// Update Prescription Medicine By ID
router.put("/medicine/:id", prescriptionController.updatePrescriptionMedicine);

// Update Prescription Medicine By ID
router.put("/disease/:id", prescriptionController.updatePrescriptionDisease);

// Delete Prescription By ID
router.delete("/:id", prescriptionController.deletePrescriptionById);

module.exports = router;
