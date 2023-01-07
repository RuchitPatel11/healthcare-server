const router = require("express").Router();
const diseaseController = require("../controllers/disease.controller");
const authentication = require("../middlewares/authentication");
const authorizeRole = require("../middlewares/authorization");

router.use(authentication);
router.use(authorizeRole(["Admin"]));

//Add Disease
router.post("/", diseaseController.addDisease);

// Get All Diseases
router.get("/", diseaseController.getDiseases);

//Get Disease By ID
router.get("/:id", diseaseController.getDiseaseById);

// Update Disease By ID
router.put("/:id", diseaseController.updateDiseaseById);

// Delete Disease By ID
router.delete("/:id", diseaseController.deleteDiseaseById);

module.exports = router;
