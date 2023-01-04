const router = require("express").Router();
const medicineController = require("../controllers/medicine.controller");

//Add Medicine
router.post("/", medicineController.addMedicine);

// Get All Medicines
router.get("/", medicineController.getMedicine);

//Get Medicine By ID
router.get("/:id", medicineController.getMedicineById);

// Update Medicine By ID
router.put("/:id", medicineController.updateMedicineById);

// Delete Medicine By ID
router.delete("/:id", medicineController.deleteMedicineById);

module.exports = router;