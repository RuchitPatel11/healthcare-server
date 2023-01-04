const router = require("express").Router();
const diseaseController = require("../controllers/disease.controller");

//Add Disease
router.post("/", diseaseController.addDisease);

// Get All Diseases
router.get("/", diseaseController.getDisease);

//Get Disease By ID
router.get("/:id", diseaseController.getDiseaseById);

// Update Disease By ID
router.put("/:id", diseaseController.updateDiseaseById);

// Delete Disease By ID
router.delete("/:id", diseaseController.deleteDiseaseById);

module.exports = router;