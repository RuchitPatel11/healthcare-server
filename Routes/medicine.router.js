const router = require("express").Router();
const medicineController = require("../controllers/medicine.controller");
const authentication = require("../middlewares/authentication");
const authorizeRole = require("../middlewares/authorization");

router.use(authentication);
router.use(authorizeRole(["Admin"]));

//Add Medicine
router.post("/", medicineController.addMedicine);

// Get All Medicines
router.get("/", medicineController.getMedicines);

//Get Medicine By ID
router.get("/:id", medicineController.getMedicineById);

// Update Medicine By ID
router.put("/:id", medicineController.updateMedicineById);

// Delete Medicine By ID
router.delete("/:id", medicineController.deleteMedicineById);

module.exports = router;
